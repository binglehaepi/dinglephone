import React from 'react';
import { motion } from 'framer-motion';
import {
  Camera, CalendarDays, Music, FileText,
  Globe, MapPin, ShoppingBag, Wallet,
  MessageCircle, Heart, Settings, Store, Search
} from 'lucide-react';
import { SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HomeItem, PhoneData } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { getIconShapeStyle } from '../../lib/iconShapes';
import { WidgetRenderer } from './WidgetRenderer';

const iconComponentMap: Record<string, React.ComponentType<any>> = {
  photos: Camera,
  calendar: CalendarDays,
  music: Music,
  notes: FileText,
  social: Globe,
  map: MapPin,
  wishlist: ShoppingBag,
  expenses: Wallet,
  messages: MessageCircle,
  guestbook: Heart,
  settings: Settings,
  appstore: Store,
  search: Search,
};

interface HomeGridProps {
  items: HomeItem[];
  phone: PhoneData;
  onAppOpen: (appId: string) => void;
  themeObj: ReturnType<typeof useTheme>['theme'];
  isEditMode?: boolean;
  selectedItemId?: string | null;
  onSelectItem?: (itemId: string) => void;
  onSpacerClick?: (spacerId: string) => void;
}

// 아이템별 jiggle 딜레이 — id 기반 해시로 안정적
function getJiggleDelay(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return `${(Math.abs(hash) % 200) / 1000}s`;
}

// ── Sortable 아이템 래퍼 (위젯용) ──
interface SortableWidgetItemProps {
  item: HomeItem;
  phone: PhoneData;
  isEditMode: boolean;
  isSelected: boolean;
  hasSelection: boolean;
  onClick: () => void;
}

const SortableWidgetItem: React.FC<SortableWidgetItemProps> = ({
  item,
  phone,
  isEditMode,
  isSelected,
  hasSelection,
  onClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: !isEditMode,
  });

  const span = item.widgetSpan || { cols: 2, rows: 2 };
  const appId = item.appId || item.id;

  const sortableStyle: React.CSSProperties = {
    gridColumn: `span ${Math.min(span.cols, 4)}`,
    gridRow: `span ${span.rows}`,
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : hasSelection && !isSelected ? 0.65 : 1,
  };

  const editStyle: React.CSSProperties = isEditMode
    ? {
        animation: isSelected || isDragging
          ? 'none'
          : `jiggle 0.3s ease-in-out infinite alternate`,
        animationDelay: getJiggleDelay(item.id),
        outline: isSelected ? '2.5px solid var(--accent)' : 'none',
        outlineOffset: isSelected ? 3 : 0,
        borderRadius: 14,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-center ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
      style={{ ...sortableStyle, ...editStyle }}
      {...attributes}
      {...(isEditMode ? listeners : {})}
    >
      <WidgetRenderer
        frame={item.widgetFrame!}
        label={item.widgetLabel}
        appId={appId}
        phone={phone}
        onClick={onClick}
      />
    </div>
  );
};

// ── Sortable 스페이서 (빈 셀) 래퍼 ──
interface SortableSpacerItemProps {
  item: HomeItem;
  isEditMode: boolean;
  hasSelectedItem?: boolean;
  onClick?: () => void;
}

const SortableSpacerItem: React.FC<SortableSpacerItemProps> = ({ item, isEditMode, hasSelectedItem = false, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: isEditMode ? { draggable: true } : true, // 드래그 불가, 드롭 타겟만 활성
  });

  const sortableStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={isEditMode && hasSelectedItem ? onClick : undefined}
      className={`rounded-xl transition-all ${
        isEditMode
          ? hasSelectedItem
            ? 'border-2 border-dashed opacity-50 cursor-pointer active:opacity-80'
            : 'border-2 border-dashed opacity-30'
          : ''
      }`}
      style={{
        ...sortableStyle,
        borderColor: isEditMode
          ? hasSelectedItem ? 'var(--accent)' : 'var(--text-tertiary)'
          : 'transparent',
        background: isEditMode && hasSelectedItem ? 'color-mix(in srgb, var(--accent) 8%, transparent 92%)' : undefined,
      }}
    />
  );
};

// ── Sortable 아이콘 아이템 래퍼 ──
interface SortableIconItemProps {
  item: HomeItem;
  themeObj: ReturnType<typeof useTheme>['theme'];
  isEditMode: boolean;
  isSelected: boolean;
  hasSelection: boolean;
  onClick: () => void;
  globalIconShape?: import('../../types').IconShape;
}

const SortableIconItem: React.FC<SortableIconItemProps> = ({
  item,
  themeObj,
  isEditMode,
  isSelected,
  hasSelection,
  onClick,
  globalIconShape,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: !isEditMode,
  });

  const IconComponent = iconComponentMap[item.id];
  const themeIcon = themeObj.iconColors[item.id];
  const bg = themeIcon?.bg ?? item.iconBg;
  const color = themeIcon?.color ?? 'var(--text-primary)';

  const sortableStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : hasSelection && !isSelected ? 0.65 : 1,
  };

  const editStyle: React.CSSProperties = isEditMode
    ? {
        animation: isSelected || isDragging
          ? 'none'
          : `jiggle 0.3s ease-in-out infinite alternate`,
        animationDelay: getJiggleDelay(item.id),
        outline: isSelected ? '2.5px solid var(--accent)' : 'none',
        outlineOffset: isSelected ? 3 : 0,
        borderRadius: 14,
      }
    : {};

  return (
    <motion.button
      ref={setNodeRef}
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
      whileTap={isEditMode ? undefined : { scale: 0.9 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{ ...sortableStyle, ...editStyle }}
      {...attributes}
      {...(isEditMode ? listeners : {})}
    >
      <div className="relative">
        <div
          className="w-14 h-14 flex items-center justify-center overflow-hidden"
          style={{
            background: bg,
            border: `1.5px solid ${bg}`,
            boxShadow: '0 1px 3px rgba(61,47,47,0.05)',
            ...getIconShapeStyle(item.iconShape || globalIconShape),
          }}
        >
          {item.customIconUrl ? (
            <img src={item.customIconUrl} alt={item.name} className="w-full h-full object-cover" draggable={false} />
          ) : IconComponent ? (
            <IconComponent size={24} color={color} strokeWidth={1.8} />
          ) : (
            <span className="text-[22px]">{item.icon}</span>
          )}
        </div>

        {item.badge && item.badge > 0 && (
          <div
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
            style={{ background: themeObj.badge.bg }}
          >
            <span className="text-[10px] font-bold" style={{ color: themeObj.badge.text }}>
              {item.badge}
            </span>
          </div>
        )}
      </div>
      <span className="text-[11px] text-ink-secondary">{item.name}</span>
    </motion.button>
  );
};

// ── Sortable 폴더 아이템 래퍼 ──
interface SortableFolderItemProps {
  item: HomeItem;
  themeObj: ReturnType<typeof useTheme>['theme'];
  isEditMode: boolean;
  isSelected: boolean;
  hasSelection: boolean;
  onClick: () => void;
}

const SortableFolderItem: React.FC<SortableFolderItemProps> = ({
  item,
  themeObj,
  isEditMode,
  isSelected,
  hasSelection,
  onClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: !isEditMode,
  });

  const sortableStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : hasSelection && !isSelected ? 0.65 : 1,
  };

  const editStyle: React.CSSProperties = isEditMode
    ? {
        animation: isSelected || isDragging
          ? 'none'
          : `jiggle 0.3s ease-in-out infinite alternate`,
        animationDelay: getJiggleDelay(item.id),
        outline: isSelected ? '2.5px solid var(--accent)' : 'none',
        outlineOffset: isSelected ? 3 : 0,
        borderRadius: 14,
      }
    : {};

  const children = item.folderChildren || [];
  const previewItems = children.slice(0, 4); // 미리보기용 최대 4개

  return (
    <motion.button
      ref={setNodeRef}
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
      whileTap={isEditMode ? undefined : { scale: 0.9 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{ ...sortableStyle, ...editStyle }}
      {...attributes}
      {...(isEditMode ? listeners : {})}
    >
      {/* 폴더 아이콘: 2x2 미니 그리드 */}
      <div
        className="w-14 h-14 rounded-[16px] grid grid-cols-2 grid-rows-2 gap-[2px] p-[5px] overflow-hidden"
        style={{
          background: 'var(--bg-elevated)',
          border: '1.5px solid var(--border)',
          boxShadow: '0 1px 4px rgba(61,47,47,0.08)',
        }}
      >
        {previewItems.map((child) => {
          const ChildIcon = iconComponentMap[child.id];
          const themeIcon = themeObj.iconColors[child.id];
          const bg = themeIcon?.bg ?? child.iconBg;
          const color = themeIcon?.color ?? 'var(--text-primary)';
          return (
            <div
              key={child.id}
              className="rounded-[4px] flex items-center justify-center overflow-hidden"
              style={{ background: bg }}
            >
              {child.customIconUrl ? (
                <img src={child.customIconUrl} alt="" className="w-full h-full object-cover" draggable={false} />
              ) : ChildIcon ? (
                <ChildIcon size={10} color={color} strokeWidth={2} />
              ) : (
                <span className="text-[8px]">{child.icon}</span>
              )}
            </div>
          );
        })}
        {/* 비어있는 슬롯 */}
        {Array.from({ length: Math.max(0, 4 - previewItems.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="rounded-[4px]" style={{ background: 'var(--bg-sunken)' }} />
        ))}
      </div>
      <span className="text-[11px] text-ink-secondary">{item.folderName || item.name || '폴더'}</span>
    </motion.button>
  );
};

// ── HomeGrid 메인 컴포넌트 ──
export const HomeGrid: React.FC<HomeGridProps> = ({
  items,
  phone,
  onAppOpen,
  themeObj,
  isEditMode = false,
  selectedItemId,
  onSelectItem,
  onSpacerClick,
}) => {
  const itemIds = items.map((item) => item.id);
  const hasSelectedItem = isEditMode && selectedItemId !== null;

  return (
    <SortableContext items={itemIds} strategy={rectSortingStrategy} disabled={!isEditMode}>
      <div className="grid grid-cols-4 grid-rows-4 gap-x-2 gap-y-2 px-4 py-2 h-full">
        {items.map((item) => {
          // 스페이서(빈 셀) 렌더링
          if (item.type === 'spacer') {
            return (
              <SortableSpacerItem
                key={item.id}
                item={item}
                isEditMode={isEditMode}
                hasSelectedItem={hasSelectedItem}
                onClick={() => onSpacerClick?.(item.id)}
              />
            );
          }

          const isWidget = item.type === 'widget';
          const isFolder = item.type === 'folder';
          const appId = isWidget ? (item.appId || item.id) : item.id;
          const isSelected = isEditMode && selectedItemId === item.id;
          const hasSelection = isEditMode && selectedItemId !== null;

          const handleClick = () => {
            if (isEditMode && onSelectItem) {
              onSelectItem(item.id);
            } else if (isFolder) {
              onAppOpen(`__folder_${item.id}`);
            } else {
              onAppOpen(isWidget ? appId : item.id);
            }
          };

          if (isFolder) {
            return (
              <SortableFolderItem
                key={item.id}
                item={item}
                themeObj={themeObj}
                isEditMode={isEditMode}
                isSelected={isSelected}
                hasSelection={hasSelection}
                onClick={handleClick}
              />
            );
          }

          if (isWidget && item.widgetFrame) {
            return (
              <SortableWidgetItem
                key={item.id}
                item={item}
                phone={phone}
                isEditMode={isEditMode}
                isSelected={isSelected}
                hasSelection={hasSelection}
                onClick={handleClick}
              />
            );
          }

          return (
              <SortableIconItem
              key={item.id}
              item={item}
              themeObj={themeObj}
              isEditMode={isEditMode}
              isSelected={isSelected}
              hasSelection={hasSelection}
              onClick={handleClick}
              globalIconShape={phone.homeScreen.iconShape}
            />
          );
        })}
      </div>
    </SortableContext>
  );
};
