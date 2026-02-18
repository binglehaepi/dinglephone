import React, { useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Camera, CalendarDays, Music, FileText,
  Globe, MapPin, ShoppingBag, Wallet,
  MessageCircle, Heart, Settings, Store, Search, Home
} from 'lucide-react';
import { DinglePhoneData, HomeItem, PhoneData } from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePhone } from '../context/PhoneContext';
import { getIconShapeStyle } from '../lib/iconShapes';
import { HomeGrid } from './widgets/HomeGrid';

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

// 아이템이 차지하는 그리드 셀 수 계산
function getItemCellCount(item: HomeItem): number {
  if (item.type === 'widget' && item.widgetSpan) {
    return item.widgetSpan.cols * item.widgetSpan.rows;
  }
  return 1;
}

// 아이템들을 페이지로 분할 (4열 × maxRows행 기준)
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

interface HomeScreenProps {
  data: DinglePhoneData;
  phone: PhoneData;
  onOpenApp: (appId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ data, phone, onOpenApp }) => {
  const { theme } = useTheme();
  const { goToList } = usePhone();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 위젯이 포함된 아이템이 있는지 확인
  const hasWidgets = data.homeScreen.appLayout.some((item) => item.type === 'widget');

  // 페이지 분할 (4열 × 6행 = 24셀)
  const MAX_CELLS_PER_PAGE = 24;
  const pages = useMemo(
    () => paginateItems(data.homeScreen.appLayout as HomeItem[], MAX_CELLS_PER_PAGE),
    [data.homeScreen.appLayout],
  );
  const totalPages = pages.length;

  // 스크롤 이벤트 핸들러 (snap 기반 페이지 감지)
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pageWidth = el.clientWidth;
    if (pageWidth === 0) return;
    const newPage = Math.round(el.scrollLeft / pageWidth);
    setCurrentPage(Math.min(newPage, totalPages - 1));
  }, [totalPages]);

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

      {/* App Grid — 위젯이 있으면 HomeGrid (페이지 지원), 없으면 기존 심플 그리드 */}
      {hasWidgets ? (
        <div className="flex-1 flex flex-col min-h-0">
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
                  className="overflow-y-auto no-scrollbar"
                  style={{
                    width: `${100 / totalPages}%`,
                    scrollSnapAlign: 'start',
                  }}
                >
                  <HomeGrid
                    items={pageItems}
                    phone={phone}
                    onAppOpen={onOpenApp}
                    themeObj={theme}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 페이지 인디케이터 (2페이지 이상일 때만 표시) */}
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
      ) : (
        <div className="grid grid-cols-4 gap-x-5 gap-y-7 px-1 pb-4">
          {data.homeScreen.appLayout.map((app) => {
            const IconComponent = iconComponentMap[app.id];
            const themeIcon = theme.iconColors[app.id];
            const bg = themeIcon?.bg ?? app.iconBg;
            const color = themeIcon?.color ?? 'var(--text-primary)';

            return (
              <motion.button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center gap-1.5"
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <div className="relative">
                  <div
                    className="w-14 h-14 flex items-center justify-center overflow-hidden"
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
                      <IconComponent size={24} color={color} strokeWidth={1.8} />
                    ) : (
                      <span className="text-[22px]">{app.icon}</span>
                    )}
                  </div>

                  {app.badge && app.badge > 0 && (
                    <div
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
                      style={{ background: theme.badge.bg }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: theme.badge.text }}>{app.badge}</span>
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-ink-secondary">{app.name}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {!hasWidgets && <div className="flex-1" />}

      {/* Dock */}
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
          {/* 독 앞쪽 2개 아이콘 */}
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

          {/* 가운데 홈 버튼 */}
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

          {/* 독 뒤쪽 2개 아이콘 */}
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
    </div>
  );
};
