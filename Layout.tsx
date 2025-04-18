import { Link, useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { isAuthenticated, removeStoredUser } from '~/utils/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(isAuthenticated());
  }, []);

  const handleLogout = () => {
    removeStoredUser();
    setIsAuthed(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-800">
                  Patient Care Analytics
                </span>
              </Link>
            </div>
            
            <div className="flex items-center">
              {isAuthed ? (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
