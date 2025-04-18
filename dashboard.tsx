import { useState, useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import Layout from '~/components/Layout';
import SymptomForm from '~/components/SymptomForm';
import PredictionResult from '~/components/PredictionResult';
import Chatbot from '~/components/Chatbot';
import { analyzeSymptomsAndPredict } from '~/utils/predictions';
import { isAuthenticated, isDoctor, getStoredUser } from '~/utils/auth';
import type { Symptom, Prediction, User } from '~/types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    const authed = isAuthenticated();
    setIsAuthed(authed);
    if (!authed) {
      navigate('/login');
      return;
    }
    setIsDoc(isDoctor());
    setUser(getStoredUser());
  }, [navigate]);

  const handleSymptomSubmit = (symptoms: Symptom[]) => {
    const result = analyzeSymptomsAndPredict(symptoms);
    setPrediction(result);
  };

  if (!isAuthed || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600">
          {isDoc ? 'Doctor Dashboard' : 'Patient Dashboard'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <SymptomForm onSubmit={handleSymptomSubmit} />
          {prediction && <PredictionResult prediction={prediction} />}
        </div>
        
        <div>
          <Chatbot />
        </div>
      </div>
    </Layout>
  );
}
