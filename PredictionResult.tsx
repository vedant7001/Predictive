import type { Prediction } from '~/types';

interface Props {
  prediction: Prediction;
}

export default function PredictionResult({ prediction }: Props) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Predicted Condition</h3>
          <p className="text-2xl font-bold text-blue-600">{prediction.diagnosis}</p>
          <p className="text-sm text-gray-500">
            Confidence: {(prediction.probability * 100).toFixed(1)}%
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Recommended Actions</h3>
          <ul className="mt-2 space-y-2">
            {prediction.recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-green-500">
                  ✓
                </span>
                <span className="ml-2">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Analyzed Symptoms</h3>
          <ul className="mt-2 space-y-2">
            {prediction.symptoms.map((symptom) => (
              <li key={symptom.id} className="bg-gray-50 p-3 rounded">
                <strong>{symptom.name}</strong>
                <br />
                Severity: {symptom.severity}/10
                <br />
                Duration: {symptom.duration}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
