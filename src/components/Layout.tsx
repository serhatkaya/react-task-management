import { Outlet } from 'react-router-dom';
import useLoader from '../hooks/useLoader.hook';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  const { isLoading, Loader } = useLoader();
  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 mt-4 py-4 rounded-lg bg-main ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
