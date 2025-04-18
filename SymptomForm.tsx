import { useState } from 'react';
import type { Symptom } from '~/types';

interface Props {
  onSubmit: (symptoms: Symptom[]) => void;
}

export default function SymptomForm({ onSubmit }: Props) {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    name: '',
    severity: 5,
    duration: '',
    description: ''
  });

  const handleAddSymptom = () => {
    const newSymptom = {
      ...currentSymptom,
      id: Math.random().toString(36).substr(2, 9)
    };
    setSymptoms([...symptoms, newSymptom]);
    setCurrentSymptom({
      name: '',
      severity: 5,
      duration: '',
      description: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(symptoms);
    setSymptoms([]);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Enter Your Symptoms</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Symptom Name
          </label>
          <input
            type="text"
            value={currentSymptom.name}
            onChange={(e) => setCurrentSymptom({...currentSymptom, name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={currentSymptom.severity}
            onChange={(e) => setCurrentSymptom({...currentSymptom, severity: parseInt(e.target.value)})}
            className="mt-1 block w-full"
          />
          <span className="text-sm text-gray-500">{currentSymptom.severity}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            value={currentSymptom.duration}
            onChange={(e) => setCurrentSymptom({...currentSymptom, duration: e.target.value})}
            placeholder="e.g. 2 days"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={currentSymptom.description}
            onChange={(e) => setCurrentSymptom({...currentSymptom, description: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <button
          type="button"
          onClick={handleAddSymptom}
          disabled={!currentSymptom.name}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Add Symptom
        </button>
      </div>

      {symptoms.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Added Symptoms:</h3>
          <ul className="space-y-2">
            {symptoms.map((symptom) => (
              <li key={symptom.id} className="bg-gray-50 p-3 rounded">
                <strong>{symptom.name}</strong> - Severity: {symptom.severity}
                <br />
                Duration: {symptom.duration}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={symptoms.length === 0}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
      >
        Analyze Symptoms
      </button>
    </div>
  );
}
