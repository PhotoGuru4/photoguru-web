import { Outlet } from 'react-router-dom';
import Header from '@shared/components/Header';
import Sidebar from '@shared/components/Sidebar';

const MainLayout = () => {
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
