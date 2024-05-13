import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hook';
import { cn } from '../utils/tw.util';
import viteLogo from '/vite.svg';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={viteLogo}
            className={cn('logo', 'w-12', 'h-12', 'mr-2')}
            alt="Vite logo"
          />
          <span className="text-white font-bold text-xl">Taskify</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    'text-white hover:text-gray-200 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-200 py-2 px-3 rounded-md shadow-md',
                    isActive && 'border-white'
                  )
                }
              >
                Home
              </NavLink>
            </li>
            {isAuthenticated() ? (
              <>
                <li>
                  <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                      cn(
                        'text-white hover:text-gray-200 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-200 py-2 px-3 rounded-md shadow-md',
                        isActive && 'border-white'
                      )
                    }
                  >
                    Tasks
                  </NavLink>
                </li>
                <li>
                  <button
                    className="text-white hover:text-gray-200 transition-colors duration-300"
                    onClick={() => logout().then(() => navigate('/'))}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      cn(
                        'text-white hover:text-gray-200 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-200 py-2 px-3 rounded-md shadow-md',
                        isActive && 'border-white'
                      )
                    }
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      cn(
                        'text-white hover:text-gray-200 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-200 py-2 px-3 rounded-md shadow-md',
                        isActive && 'border-white'
                      )
                    }
                  >
                    Login
                  </NavLink>
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
