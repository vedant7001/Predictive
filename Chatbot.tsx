import { useState } from 'react';
import type { ChatMessage } from '~/types';

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      message: 'Hello! I can help answer questions about your symptoms and provide general health information. What would you like to know?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'user',
      message: input,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'bot',
        message: getBotResponse(input),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('fever') || input.includes('temperature')) {
      return 'If you have a fever, make sure to stay hydrated and rest. If your temperature is above 103°F (39.4°C) or lasts more than 3 days, please consult a doctor.';
    }
    
    if (input.includes('headache')) {
      return 'For headaches, try resting in a quiet, dark room and staying hydrated. Over-the-counter pain relievers may help. If the headache is severe or unusual for you, consult a healthcare provider.';
    }
    
    if (input.includes('cough')) {
      return 'For coughs, try staying hydrated and using honey (if over 1 year old). If the cough persists for more than 2 weeks or is accompanied by difficulty breathing, please seek medical attention.';
    }
    
    return 'I understand you may have concerns. While I can provide general information, it\'s best to consult with a healthcare provider for specific medical advice.';
  };

  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-[500px]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Healthcare Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
