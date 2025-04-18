export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor';
}

export interface Symptom {
  id: string;
  name: string;
  severity: number;
  duration: string;
  description: string;
}

export interface Prediction {
  id: string;
  patientId: string;
  symptoms: Symptom[];
  diagnosis: string;
  probability: number;
  recommendedActions: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}
