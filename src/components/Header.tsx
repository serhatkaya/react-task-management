import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hook';
import { cn } from '../utils/tw.util';
import viteLogo from '/vite.svg';

const Header = () => {
  // For demonstration purposes, assume the user is logged in
  const { isAuthenticated } = useAuth();
  return (
    <header className="bg-accent">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={viteLogo}
            className={cn('logo', 'w-10', 'h-10', 'mr-2')}
            alt="Vite logo"
          />
          <span className="text-white font-bold text-lg">Taskify</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-white">
                Home
              </Link>
            </li>
            {isAuthenticated() ? (
              <>
                <li>
                  <Link to="/tasks" className="text-white hover:text-white">
                    Tasks
                  </Link>
                </li>
                <li>
                  <button
                    className="text-white hover:text-white"
                    onClick={() => console.log('Logout')}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register" className="text-white hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-white hover:text-white">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
