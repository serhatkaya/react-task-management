import { Outlet } from 'react-router-dom';
import Header from './Header';
function Layout() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
