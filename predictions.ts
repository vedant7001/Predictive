import { Symptom, Prediction } from '~/types';

// Mock ML model prediction logic
export const analyzeSymptomsAndPredict = (symptoms: Symptom[]): Prediction => {
  // In a real app, this would call an ML model API
  const severity = symptoms.reduce((acc, s) => acc + s.severity, 0) / symptoms.length;
  
  let diagnosis = 'Common Cold';
  let probability = 0.7;
  let actions = ['Rest', 'Stay hydrated'];
  
  if (severity > 7) {
    diagnosis = 'Severe Condition';
    probability = 0.85;
    actions = ['Seek immediate medical attention', 'Contact your doctor'];
  } else if (severity > 4) {
    diagnosis = 'Moderate Condition';
    probability = 0.75;
    actions = ['Schedule doctor appointment', 'Monitor symptoms'];
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    patientId: 'current-user',
    symptoms,
    diagnosis,
    probability,
    recommendedActions: actions,
    createdAt: new Date().toISOString()
  };
};
