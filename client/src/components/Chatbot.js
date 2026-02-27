import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/chat', { // ✅ Fixed: Added /api
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages([...newMessages, { from: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { from: 'bot', text: 'Error: Could not reach server.' }]);
    }

    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Icon Button */}
      <button
        onClick={toggleChat}
        className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="chat-window fixed bottom-20 right-5 bg-white shadow-2xl rounded-lg flex flex-col"
          style={{
            width: '420px',
            height: '540px',
          }}
        >
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">BloomWatch Chatbot</span>
            <button onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.from === 'user'
                    ? 'bg-green-600 text-white self-end ml-auto'
                    : 'bg-gray-200 text-gray-800 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t">
            <input
              type="text"
              className="flex-1 p-2 outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;