import { useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import Layout from '~/components/Layout';
import { isAuthenticated } from '~/utils/auth';

export default function Index() {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(isAuthenticated());
  }, []);

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Predictive Analytics for Patient Care
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Get instant analysis of your symptoms using advanced machine learning, chat with our
          healthcare assistant, and receive personalized care recommendations.
        </p>

        <div className="space-y-4">
          {isAuthed ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-600"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
