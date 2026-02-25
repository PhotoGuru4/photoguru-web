import {
  Home,
  Briefcase,
  MessageCircle,
  LogOut,
  FolderPlus,
} from 'lucide-react';
import clsx from 'clsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Text } from '@shared/components/common';
import { ROUTES } from '@shared/constants/routes';
import { useAuthStore } from '@store/authStore';
import { useEffect, useRef, useState } from 'react';

const menuItems = [
  { label: 'Home', icon: Home, path: ROUTES.HOME },
  { label: 'Booking', icon: Briefcase, path: ROUTES.BOOKING },
  { label: 'Messages', icon: MessageCircle, path: ROUTES.MESSAGES },
  { label: 'Concept', icon: FolderPlus, path: ROUTES.CONCEPT },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [highlightStyle, setHighlightStyle] = useState({
    top: 0,
    height: 0,
  });

  useEffect(() => {
    const index = menuItems.findIndex(
      (item) => item.path === location.pathname,
    );

    if (index >= 0) {
      const el = itemRefs.current[index];
      if (el) {
        setHighlightStyle({
          top: el.offsetTop,
          height: el.offsetHeight,
        });
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <aside className="h-screen bg-pink-500 shadow-sm flex flex-col text-sm w-auto sm:min-w-60 sm:max-w-70">
      <nav className="relative flex-1 space-y-2 pt-17 px-3 sm:px-4">
        <div
          className="absolute left-3 right-3 sm:left-4 sm:right-4 bg-white rounded-md shadow-sm transition-all duration-300 ease-in-out"
          style={{
            top: highlightStyle.top,
            height: highlightStyle.height,
          }}
        />

        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.label}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              className={clsx(
                'relative flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer',
                'justify-center sm:justify-start font-medium transition-colors duration-300',
                isActive
                  ? 'text-pink-500'
                  : 'text-white hover:text-white hover:bg-white/10',
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="px-3 sm:px-4 py-4 border-t border-gray-100/50">
        <Button
          unstyled
          fullWidth
          onClick={handleLogout}
        >
          <LogOut size={20} color="white" />
          <span className="hidden sm:inline">
            <Text variant="body" color="white">
              Log Out
            </Text>
          </span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
