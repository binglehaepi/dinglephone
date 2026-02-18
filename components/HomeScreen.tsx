import React, { useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, CalendarDays, Music, FileText,
  Globe, MapPin, ShoppingBag, Wallet,
  MessageCircle, Heart, Settings, Store, Search, Home,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { DinglePhoneData, HomeItem, PhoneData, WidgetFrameType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePhone } from '../context/PhoneContext';
import { getIconShapeStyle } from '../lib/iconShapes';
import { HomeGrid } from './widgets/HomeGrid';
import { WIDGET_FRAME_LIST } from './widgets/WidgetRenderer';

// ── 아이콘 컴포넌트 매핑 ──
const iconComponentMap: Record<string, React.ComponentType<any>> = {
  photos:    Camera,
  calendar:  CalendarDays,
  music:     Music,
  notes:     FileText,
  social:    Globe,
  map:       MapPin,
  wishlist:  ShoppingBag,
  expenses:  Wallet,
  messages:  MessageCircle,
  guestbook: Heart,
  settings:  Settings,
  appstore:  Store,
  search:    Search,
};

// ── 페이지 분할 상수 ──
const MAX_CELLS_PER_PAGE = 16; // 4열 × 4행

// 아이템이 차지하는 그리드 셀 수 계산
function getItemCellCount(item: HomeItem): number {
  if (item.type === 'widget' && item.widgetSpan) {
    return item.widgetSpan.cols * item.widgetSpan.rows;
  }
  return 1; // icon 또는 spacer = 1셀
}

// 아이템들을 페이지로 분할 (스페이서 포함)
function paginateItems(items: HomeItem[], maxCellsPerPage: number): HomeItem[][] {
  const pages: HomeItem[][] = [];
  let currentPage: HomeItem[] = [];
  let currentCells = 0;

  for (const item of items) {
    const cellCount = getItemCellCount(item);

    if (currentCells + cellCount > maxCellsPerPage && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [];
      currentCells = 0;
    }

    currentPage.push(item);
    currentCells += cellCount;
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages.length > 0 ? pages : [[]];
}

// 선택된 아이템이 몇 번째 페이지에 있는지 찾기
function findItemPage(pages: HomeItem[][], itemId: string): number {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].some((item) => item.id === itemId)) return i;
  }
  return -1;
}

// ── 스페이서 헬퍼 함수 ──

// 고유한 스페이서 생성
function createSpacer(idx: number): HomeItem {
  return {
    id: `__spacer_${idx}`,
    type: 'spacer',
    icon: '',
    name: '',
    iconBg: 'transparent',
  };
}

// 기존 스페이서 ID에서 최대 인덱스 추출
function getMaxSpacerIdx(items: HomeItem[]): number {
  let max = -1;
  for (const item of items) {
    if (item.type === 'spacer') {
      const match = item.id.match(/__spacer_(\d+)/);
      if (match) max = Math.max(max, parseInt(match[1]));
    }
  }
  return max;
}

// 스페이서를 제거하고, 각 페이지 끝에 스페이서를 채워 MAX_CELLS_PER_PAGE로 맞춤
function normalizeLayout(items: HomeItem[], maxCellsPerPage: number): HomeItem[] {
  // 실제 아이템만 추출 (스페이서 제거)
  const realItems = items.filter(item => item.type !== 'spacer');

  // 실제 아이템을 페이지별로 분할
  const pages = paginateItems(realItems, maxCellsPerPage);

  // 각 페이지 끝에 스페이서 채우기
  let spacerIdx = 0;
  const result: HomeItem[] = [];

  for (const page of pages) {
    const pageCells = page.reduce((sum, item) => sum + getItemCellCount(item), 0);
    result.push(...page);
    for (let i = pageCells; i < maxCellsPerPage; i++) {
      result.push(createSpacer(spacerIdx++));
    }
  }

  // 빈 레이아웃이면 빈 페이지 하나 생성
  if (result.length === 0) {
    for (let i = 0; i < maxCellsPerPage; i++) {
      result.push(createSpacer(spacerIdx++));
    }
  }

  return result;
}

// 레이아웃에 스페이서 보충 (기존 위치 유지, 마지막 페이지만 채움)
function topUpSpacers(items: HomeItem[], maxCellsPerPage: number): HomeItem[] {
  const pages = paginateItems(items, maxCellsPerPage);
  const lastPage = pages[pages.length - 1];
  const lastPageCells = lastPage.reduce((sum, item) => sum + getItemCellCount(item), 0);

  if (lastPageCells >= maxCellsPerPage) return items;

  let nextIdx = getMaxSpacerIdx(items) + 1;
  const result = [...items];
  for (let i = lastPageCells; i < maxCellsPerPage; i++) {
    result.push(createSpacer(nextIdx++));
  }
  return result;
}

interface HomeScreenProps {
  data: DinglePhoneData;
  phone: PhoneData;
  onOpenApp: (appId: string) => void;
}

const LONG_PRESS_MS = 500;

export const HomeScreen: React.FC<HomeScreenProps> = ({ data, phone, onOpenApp }) => {
  const { theme } = useTheme();
  const { goToList, isEditable, updateCurrentPhone } = usePhone();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── 실제 레이아웃 소스: phone (편집 가능한 데이터) ──
  const appLayout = (phone.homeScreen.appLayout as HomeItem[]);

  // ── 편집 모드 상태 ──
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // ── 길게 누르기 감지 ──
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLongPressStart = useCallback(() => {
    if (!isEditable) return;
    if (isEditMode) return;

    longPressTimer.current = setTimeout(() => {
      try { navigator.vibrate?.(30); } catch { /* ignore */ }

      // 스페이서가 없으면 정규화하여 빈 셀 채우기
      const hasSpacer = appLayout.some(item => item.type === 'spacer');
      if (!hasSpacer) {
        const normalized = normalizeLayout(appLayout, MAX_CELLS_PER_PAGE);
        updateCurrentPhone({
          homeScreen: { ...phone.homeScreen, appLayout: normalized },
        });
      } else {
        // 마지막 페이지 보충
        const topped = topUpSpacers(appLayout, MAX_CELLS_PER_PAGE);
        if (topped.length !== appLayout.length) {
          updateCurrentPhone({
            homeScreen: { ...phone.homeScreen, appLayout: topped },
          });
        }
      }

      setIsEditMode(true);
      setSelectedItemId(null);
    }, LONG_PRESS_MS);
  }, [isEditable, isEditMode, appLayout, phone.homeScreen, updateCurrentPhone]);

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleLongPressMove = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  // ── @dnd-kit 센서 ──
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 8 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 8 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // ── 드래그 완료 핸들러 ──
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = appLayout.findIndex((item) => item.id === active.id);
      const newIndex = appLayout.findIndex((item) => item.id === over.id);

      if (oldIndex >= 0 && newIndex >= 0) {
        const newLayout = arrayMove(appLayout, oldIndex, newIndex);
        updateCurrentPhone({
          homeScreen: { ...phone.homeScreen, appLayout: newLayout },
        });
      }
    },
    [appLayout, phone.homeScreen, updateCurrentPhone],
  );

  // ── 아이템 탭 선택 (교환 없음, 선택만 변경) ──
  const handleSelectItem = useCallback((itemId: string) => {
    if (!isEditMode) return;

    if (selectedItemId === itemId) {
      // 같은 아이템 다시 탭 → 선택 해제
      setSelectedItemId(null);
    } else {
      // 다른 아이템 탭 → 선택 대상 변경
      setSelectedItemId(itemId);
    }
  }, [isEditMode, selectedItemId]);

  // ── 스페이서(빈 칸) 클릭 → 선택된 아이템을 해당 위치로 이동 ──
  const handleSpacerClick = useCallback((spacerId: string) => {
    if (!isEditMode || !selectedItemId) return;

    const selectedIdx = appLayout.findIndex((item) => item.id === selectedItemId);
    const spacerIdx = appLayout.findIndex((item) => item.id === spacerId);
    if (selectedIdx < 0 || spacerIdx < 0) return;

    const selectedItem = appLayout[selectedIdx];
    const spacerItem = appLayout[spacerIdx];

    // 위치 교환: 선택된 아이템 → 스페이서 위치, 원래 위치 → 스페이서
    const newLayout = [...appLayout];
    newLayout[spacerIdx] = selectedItem;
    newLayout[selectedIdx] = spacerItem;

    updateCurrentPhone({
      homeScreen: { ...phone.homeScreen, appLayout: newLayout },
    });

    // 이동 후 선택 유지
  }, [isEditMode, selectedItemId, appLayout, phone.homeScreen, updateCurrentPhone]);

  // ── 편집 모드 종료 ──
  const handleDoneEditing = useCallback(() => {
    // 빈 페이지(전부 스페이서) 제거
    const pages = paginateItems(appLayout, MAX_CELLS_PER_PAGE);
    while (pages.length > 1) {
      const lastPage = pages[pages.length - 1];
      if (lastPage.every(item => item.type === 'spacer')) {
        pages.pop();
      } else {
        break;
      }
    }
    const cleaned = pages.flat();
    if (cleaned.length !== appLayout.length) {
      updateCurrentPhone({
        homeScreen: { ...phone.homeScreen, appLayout: cleaned },
      });
    }

    setIsEditMode(false);
    setSelectedItemId(null);
  }, [appLayout, phone.homeScreen, updateCurrentPhone]);

  // ── 페이지 분할 (phone 데이터 기준!) ──
  const pages = useMemo(
    () => paginateItems(appLayout, MAX_CELLS_PER_PAGE),
    [appLayout],
  );
  const totalPages = pages.length;

  // ── 선택된 아이템의 페이지 위치 ──
  const selectedItemPage = useMemo(() => {
    if (!selectedItemId) return -1;
    return findItemPage(pages, selectedItemId);
  }, [pages, selectedItemId]);

  const canMovePrev = selectedItemId !== null && selectedItemPage > 0;
  const canMoveNext = selectedItemId !== null;

  // ── 페이지 이동 로직 (페이지 기반) ──
  const handleMoveToPage = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedItemId) return;

      // 현재 페이지 구조
      const currentPages = paginateItems(appLayout, MAX_CELLS_PER_PAGE);
      const sourcePageIdx = findItemPage(currentPages, selectedItemId);
      if (sourcePageIdx < 0) return;

      const targetPageIdx = direction === 'prev' ? sourcePageIdx - 1 : sourcePageIdx + 1;
      if (direction === 'prev' && targetPageIdx < 0) return;

      // 이동할 아이템 찾기
      const movedItem = appLayout.find(item => item.id === selectedItemId);
      if (!movedItem) return;
      const movedCells = getItemCellCount(movedItem);

      // 소스 페이지: 아이템 제거 → 나머지 아이템이 자연스럽게 밀림 → 끝에 스페이서 추가
      let nextSpacerIdx = getMaxSpacerIdx(appLayout) + 1;
      const sourcePage = currentPages[sourcePageIdx].filter(item => item.id !== selectedItemId);
      let sourcePageCells = sourcePage.reduce((sum, item) => sum + getItemCellCount(item), 0);
      while (sourcePageCells < MAX_CELLS_PER_PAGE) {
        sourcePage.push(createSpacer(nextSpacerIdx++));
        sourcePageCells++;
      }

      // 타겟 페이지: 스페이서 자리에 아이템 삽입
      let targetPage: HomeItem[];
      if (targetPageIdx >= currentPages.length) {
        // 새 페이지 생성
        targetPage = [movedItem];
        let targetCells = movedCells;
        while (targetCells < MAX_CELLS_PER_PAGE) {
          targetPage.push(createSpacer(nextSpacerIdx++));
          targetCells++;
        }
      } else {
        targetPage = [...currentPages[targetPageIdx]];
        // 첫 번째 스페이서를 찾아 아이템으로 대체
        let spacersRemoved = 0;
        const newTarget: HomeItem[] = [];
        let inserted = false;
        for (const item of targetPage) {
          if (item.type === 'spacer' && spacersRemoved < movedCells) {
            if (!inserted) {
              newTarget.push(movedItem);
              inserted = true;
            }
            spacersRemoved++;
            continue;
          }
          newTarget.push(item);
        }
        if (!inserted) {
          // 스페이서 없음 → 끝에 추가 (오버플로우 가능)
          newTarget.push(movedItem);
        }
        targetPage = newTarget;
      }

      // 전체 레이아웃 재구성
      const maxPageIdx = Math.max(currentPages.length - 1, targetPageIdx);
      const newLayout: HomeItem[] = [];
      for (let i = 0; i <= maxPageIdx; i++) {
        if (i === sourcePageIdx) {
          newLayout.push(...sourcePage);
        } else if (i === targetPageIdx) {
          newLayout.push(...targetPage);
        } else if (i < currentPages.length) {
          newLayout.push(...currentPages[i]);
        }
      }

      updateCurrentPhone({
        homeScreen: { ...phone.homeScreen, appLayout: newLayout },
      });

      // 이동된 페이지로 스크롤
      setTimeout(() => {
        const el = scrollRef.current;
        if (el) {
          const actualTarget = Math.min(targetPageIdx, maxPageIdx);
          const pageWidth = el.clientWidth;
          el.scrollTo({ left: pageWidth * actualTarget, behavior: 'smooth' });
        }
      }, 50);
    },
    [selectedItemId, appLayout, phone.homeScreen, updateCurrentPhone],
  );

  // ── 선택된 아이템 정보 ──
  const selectedItem = useMemo(() => {
    if (!selectedItemId) return null;
    return appLayout.find(item => item.id === selectedItemId && item.type !== 'spacer') || null;
  }, [selectedItemId, appLayout]);

  // ── 위젯 변환 핸들러 ──
  const handleSetToWidget = useCallback((itemId: string, frameType: WidgetFrameType) => {
    const frameInfo = WIDGET_FRAME_LIST.find((f) => f.type === frameType);
    const newLayout = appLayout.map((item) => {
      if (item.id !== itemId) return item;
      if (item.type === 'widget') {
        return { ...item, widgetFrame: frameType, widgetSpan: frameInfo?.defaultSpan || { cols: 2, rows: 2 } };
      }
      return {
        ...item,
        type: 'widget' as const,
        appId: item.id,
        widgetFrame: frameType,
        widgetSpan: frameInfo?.defaultSpan || { cols: 2, rows: 2 },
      };
    });
    updateCurrentPhone({ homeScreen: { ...phone.homeScreen, appLayout: newLayout } });
  }, [appLayout, phone.homeScreen, updateCurrentPhone]);

  const handleSetToIcon = useCallback((itemId: string) => {
    const newLayout = appLayout.map((item) => {
      if (item.id !== itemId) return item;
      const { type: _t, widgetFrame: _f, widgetColor: _c, widgetLabel: _l, widgetSpan: _s, appId: _a, widgetShowIcon: _si, ...rest } = item;
      return rest as HomeItem;
    });
    updateCurrentPhone({ homeScreen: { ...phone.homeScreen, appLayout: newLayout } });
  }, [appLayout, phone.homeScreen, updateCurrentPhone]);


  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pageWidth = el.clientWidth;
    if (pageWidth === 0) return;
    const newPage = Math.round(el.scrollLeft / pageWidth);
    setCurrentPage(Math.min(newPage, totalPages - 1));
  }, [totalPages]);

  // 길게 누르기 이벤트
  const longPressHandlers = {
    onTouchStart: handleLongPressStart,
    onTouchEnd: handleLongPressEnd,
    onTouchMove: handleLongPressMove,
    onMouseDown: handleLongPressStart,
    onMouseUp: handleLongPressEnd,
    onMouseLeave: handleLongPressEnd,
  };

  return (
    <div className="flex flex-col h-full pt-6 pb-2 px-6">
      {/* Marquee Ticker Widget */}
      <div className="mb-4">
        <div
          className="h-[36px] rounded-full overflow-hidden flex items-center relative"
          style={{
            background: theme.widget.bg,
            border: theme.widget.border,
            boxShadow: theme.shadow,
          }}
        >
          <div className="marquee-track flex items-center whitespace-nowrap">
            {[0, 1].map((copy) => (
              <span key={copy} className="marquee-content inline-flex items-center gap-6 px-6 text-[12px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                {data.homeScreen.widgets.flatMap(w => w.lines).map((line, i) => (
                  <span key={`${copy}-${i}`} className="inline-flex items-center gap-1.5">
                    <span className="text-[10px] opacity-40" style={{ color: 'var(--accent)' }}>✦</span>
                    {line}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          .marquee-track {
            animation: marquee-scroll 18s linear infinite;
          }
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── App Grid (항상 HomeGrid + DndContext 사용) ── */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex-1 flex flex-col min-h-0" {...longPressHandlers}>
          {/* 페이지 스크롤 컨테이너 */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-x-auto overflow-y-hidden no-scrollbar -mx-6"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div className="flex h-full" style={{ width: `${totalPages * 100}%` }}>
              {pages.map((pageItems, pageIndex) => (
                <div
                  key={pageIndex}
                  className="overflow-hidden"
                  style={{
                    width: `${100 / totalPages}%`,
                    height: '100%',
                    scrollSnapAlign: 'start',
                  }}
                >
                  <HomeGrid
                    items={pageItems}
                    phone={phone}
                    onAppOpen={onOpenApp}
                    themeObj={theme}
                    isEditMode={isEditMode}
                    selectedItemId={selectedItemId}
                    onSelectItem={isEditMode ? handleSelectItem : undefined}
                    onSpacerClick={isEditMode ? handleSpacerClick : undefined}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 페이지 인디케이터 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 py-2">
              {pages.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: currentPage === i ? 16 : 6,
                    height: 6,
                    background: currentPage === i ? 'var(--accent)' : 'var(--text-tertiary)',
                    opacity: currentPage === i ? 0.8 : 0.3,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </DndContext>

      {/* ── 편집 모드 하단 바 ── */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            className="pb-2 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* 선택된 아이템이 있을 때: 위젯 프레임 선택 패널 */}
            {selectedItem && (
              <div
                className="rounded-2xl px-3 py-2.5 mb-2"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}
              >
                {/* 선택된 아이템 정보 */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px]">{selectedItem.icon || '📱'}</span>
                  <span className="text-[12px] font-bold" style={{ color: 'var(--text-primary)' }}>
                    {selectedItem.name}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                    {selectedItem.type === 'widget'
                      ? `위젯 · ${WIDGET_FRAME_LIST.find(f => f.type === selectedItem.widgetFrame)?.name || ''}`
                      : '아이콘'}
                  </span>
                </div>

                {/* 프레임 선택 */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {/* 아이콘 모드 */}
                  <button
                    onClick={() => handleSetToIcon(selectedItem.id)}
                    className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl shrink-0 transition-all active:scale-95"
                    style={{
                      background: selectedItem.type !== 'widget' ? 'var(--accent)' : 'var(--bg-secondary)',
                      color: selectedItem.type !== 'widget' ? '#fff' : 'var(--text-secondary)',
                    }}
                  >
                    <span className="text-[15px]">📱</span>
                    <span className="text-[8px] font-bold whitespace-nowrap">아이콘</span>
                  </button>
                  {/* 위젯 프레임들 */}
                  {WIDGET_FRAME_LIST.map((frame) => {
                    const isActive = selectedItem.type === 'widget' && selectedItem.widgetFrame === frame.type;
                    return (
                      <button
                        key={frame.type}
                        onClick={() => handleSetToWidget(selectedItem.id, frame.type)}
                        className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl shrink-0 transition-all active:scale-95"
                        style={{
                          background: isActive ? 'var(--accent)' : 'var(--bg-secondary)',
                          color: isActive ? '#fff' : 'var(--text-secondary)',
                        }}
                      >
                        <span className="text-[15px]">{frame.emoji}</span>
                        <span className="text-[8px] font-bold whitespace-nowrap">{frame.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 하단 버튼 바: 페이지 이동 + 완료 */}
            <div className="flex items-center justify-center gap-3">
              {/* 이전 페이지로 이동 */}
              {selectedItemId && (
                <button
                  onClick={() => handleMoveToPage('prev')}
                  disabled={!canMovePrev}
                  className="flex items-center gap-1 px-3 py-2 rounded-full text-[12px] font-medium transition-all active:scale-95"
                  style={{
                    background: canMovePrev ? 'var(--bg-elevated)' : 'transparent',
                    color: canMovePrev ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    border: canMovePrev ? '1px solid var(--border)' : '1px solid transparent',
                    opacity: canMovePrev ? 1 : 0.4,
                  }}
                >
                  <ChevronLeft size={14} />
                  이전
                </button>
              )}

              {/* 완료 버튼 */}
              <button
                onClick={handleDoneEditing}
                className="px-6 py-2 rounded-full text-[13px] font-semibold transition-transform active:scale-95"
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                }}
              >
                완료
              </button>

              {/* 다음 페이지로 이동 */}
              {selectedItemId && (
                <button
                  onClick={() => handleMoveToPage('next')}
                  disabled={!canMoveNext}
                  className="flex items-center gap-1 px-3 py-2 rounded-full text-[12px] font-medium transition-all active:scale-95"
                  style={{
                    background: canMoveNext ? 'var(--bg-elevated)' : 'transparent',
                    color: canMoveNext ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    border: canMoveNext ? '1px solid var(--border)' : '1px solid transparent',
                    opacity: canMoveNext ? 1 : 0.4,
                  }}
                >
                  다음
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock — 편집 모드가 아닐 때만 표시 */}
      {!isEditMode && (
        <div className="relative mb-2 mx-2">
          <div
            className="absolute inset-0 backdrop-blur-2xl rounded-[28px]"
            style={{
              background: theme.dock.bg,
              border: theme.dock.border,
              boxShadow: theme.shadow,
            }}
          />
          <div className="relative z-10 grid grid-cols-5 gap-3 px-4 py-3">
            {data.homeScreen.dock.slice(0, 2).map((app) => {
              const IconComponent = iconComponentMap[app.id];
              const themeIcon = theme.iconColors[app.id];
              const bg = themeIcon?.bg ?? app.iconBg;
              const color = themeIcon?.color ?? 'var(--text-primary)';

              return (
                <motion.button
                  key={app.id}
                  className="flex flex-col items-center justify-center"
                  onClick={() => onOpenApp(app.id)}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                  <div
                    className="w-[48px] h-[48px] flex items-center justify-center overflow-hidden"
                    style={{
                      background: bg,
                      border: `1.5px solid ${bg}`,
                      boxShadow: '0 1px 3px rgba(61,47,47,0.05)',
                      ...getIconShapeStyle(app.iconShape),
                    }}
                  >
                    {app.customIconUrl ? (
                      <img src={app.customIconUrl} alt={app.name} className="w-full h-full object-cover" draggable={false} />
                    ) : IconComponent ? (
                      <IconComponent size={22} color={color} strokeWidth={1.8} />
                    ) : (
                      <span className="text-[22px]">{app.icon}</span>
                    )}
                  </div>
                </motion.button>
              );
            })}

            <motion.button
              key="home-button"
              className="flex flex-col items-center justify-center"
              onClick={goToList}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div
                className="w-[48px] h-[48px] rounded-full flex items-center justify-center"
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 2px 8px rgba(61,47,47,0.1)',
                }}
              >
                <Home size={22} color="var(--text-secondary)" strokeWidth={1.8} />
              </div>
            </motion.button>

            {data.homeScreen.dock.slice(2, 4).map((app) => {
              const IconComponent = iconComponentMap[app.id];
              const themeIcon = theme.iconColors[app.id];
              const bg = themeIcon?.bg ?? app.iconBg;
              const color = themeIcon?.color ?? 'var(--text-primary)';

              return (
                <motion.button
                  key={app.id}
                  className="flex flex-col items-center justify-center"
                  onClick={() => onOpenApp(app.id)}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                  <div
                    className="w-[48px] h-[48px] flex items-center justify-center overflow-hidden"
                    style={{
                      background: bg,
                      border: `1.5px solid ${bg}`,
                      boxShadow: '0 1px 3px rgba(61,47,47,0.05)',
                      ...getIconShapeStyle(app.iconShape),
                    }}
                  >
                    {app.customIconUrl ? (
                      <img src={app.customIconUrl} alt={app.name} className="w-full h-full object-cover" draggable={false} />
                    ) : IconComponent ? (
                      <IconComponent size={22} color={color} strokeWidth={1.8} />
                    ) : (
                      <span className="text-[22px]">{app.icon}</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* jiggle 키프레임 */}
      {isEditMode && (
        <style>{`
          @keyframes jiggle {
            0% { transform: rotate(-1.2deg) scale(0.98); }
            100% { transform: rotate(1.2deg) scale(0.98); }
          }
        `}</style>
      )}
    </div>
  );
};
