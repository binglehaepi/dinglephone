import React from 'react';
import { motion } from 'framer-motion';
import {
  Camera, CalendarDays, Music, FileText,
  Globe, MapPin, ShoppingBag, Wallet,
  MessageCircle, Heart, Settings, Store, Search
} from 'lucide-react';
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
  selectedItemId?: string | null;
  onSelectItem?: (itemId: string) => void;
}

export const HomeGrid: React.FC<HomeGridProps> = ({ items, phone, onAppOpen, themeObj, selectedItemId, onSelectItem }) => {
  const isEditMode = !!onSelectItem;

  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-4 px-4 py-2 auto-rows-auto">
      {items.map((item) => {
        const isWidget = item.type === 'widget';
        const appId = isWidget ? (item.appId || item.id) : item.id;
        const isSelected = selectedItemId === item.id;

        const handleClick = () => {
          if (isEditMode) {
            onSelectItem(item.id);
          } else {
            onAppOpen(isWidget ? appId : item.id);
          }
        };

        // 선택 하이라이트 스타일
        const selectionRing = isSelected
          ? { outline: '2px solid var(--accent)', outlineOffset: 2, borderRadius: 12 }
          : {};

        if (isWidget && item.widgetFrame) {
          const span = item.widgetSpan || { cols: 2, rows: 2 };
          return (
            <div
              key={item.id}
              className={`flex items-center justify-center transition-all ${isEditMode ? 'cursor-pointer' : ''}`}
              style={{
                gridColumn: `span ${Math.min(span.cols, 4)}`,
                gridRow: `span ${span.rows}`,
                ...selectionRing,
              }}
            >
              <WidgetRenderer
                frame={item.widgetFrame}
                label={item.widgetLabel}
                appId={appId}
                phone={phone}
                onClick={handleClick}
              />
            </div>
          );
        }

        // 아이콘 모드
        const IconComponent = iconComponentMap[item.id];
        const themeIcon = themeObj.iconColors[item.id];
        const bg = themeIcon?.bg ?? item.iconBg;
        const color = themeIcon?.color ?? 'var(--text-primary)';

        return (
          <motion.button
            key={item.id}
            onClick={handleClick}
            className={`flex flex-col items-center gap-1.5 ${isEditMode ? 'cursor-pointer' : ''}`}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={selectionRing}
          >
            <div className="relative">
              <div
                className="w-14 h-14 flex items-center justify-center overflow-hidden"
                style={{
                  background: bg,
                  border: `1.5px solid ${bg}`,
                  boxShadow: '0 1px 3px rgba(61,47,47,0.05)',
                  ...getIconShapeStyle(item.iconShape),
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
      })}
    </div>
  );
};
