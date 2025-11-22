import React, { useState, useRef, useEffect } from 'react';
import { chatWithBot } from '../services/geminiService';
import { ChatMessage } from '../types/types';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Bonjour ! Je suis l'assistant virtuel de Laforêt Saint-Avertin. Comment puis-je vous aider ?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (userInput.trim() === '' || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const botResponse = await chatWithBot(newMessages);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Désolé, une erreur est survenue. Veuillez réessayer." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-laforet-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-50 transform hover:scale-110 transition-transform"
        aria-label="Ouvrir le chatbot"
      >
        {isOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.455.09-.934.09-1.425v-2.134c0-2.639 3.132-4.75 7-4.75 3.68 0 6.68 1.82 6.68 4.067v.334z" /></svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 w-80 h-[28rem] bg-white rounded-lg shadow-2xl flex flex-col z-50 animate-fade-in-up">
          <header className="bg-laforet-primary text-white p-3 rounded-t-lg">
            <h3 className="font-bold text-center">Laforêt Saint-Avertin</h3>
          </header>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-3 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-laforet-accent text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start"><div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2">...</div></div>
            )}
             <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t">
            <div className="flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-laforet-accent"
              />
              <button onClick={handleSend} className="bg-laforet-accent text-white px-4 rounded-r-md hover:bg-opacity-90 disabled:opacity-50" disabled={isLoading}>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;