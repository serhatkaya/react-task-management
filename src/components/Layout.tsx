import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 mt-4 py-4 rounded-[4px] bg-secondary">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
