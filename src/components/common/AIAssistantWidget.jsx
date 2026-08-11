import React, { useState } from 'react';
import { Sparkles, MessageCircle, X, Send, Bot, User } from 'lucide-react';

/**
 * AIAssistantWidget Component
 * Floating AI Assistant widget ("Samarth AI Assistant") providing instant guidance for course fees & required documents.
 */
export default function AIAssistantWidget({ lang = 'mr' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const isMarathi = lang === 'mr';

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: isMarathi 
        ? 'नमस्कार! मी समर्थ AI असिस्टंट आहे. तुम्हाला MS-CIT, टॅली किंवा शासकीय दाखल्यांबाबत काय माहिती हवी आहे?' 
        : 'Hello! I am Samarth AI Assistant. How can I help you with MS-CIT, Tally, or Govt Documents today?'
    }
  ]);

  const timerRef = React.useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    const cleanInput = input.trim().replace(/<[^>]*>/g, '');
    if (!cleanInput) return;

    const userMsg = cleanInput;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Instant Bot Response
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      let botReply = isMarathi
        ? 'धन्यवाद! अधिक सविस्तर माहितीसाठी आमच्या टीमशी थेट व्हाट्सॲपवर संपर्क साधा.'
        : 'Thank you! For complete details, connect directly with our center counselor via WhatsApp.';

      const lower = userMsg.toLowerCase();
      if (lower.includes('fee') || lower.includes('फी')) {
        botReply = isMarathi
          ? 'MS-CIT फी: ₹४,५००, टॅली प्राइम: ₹५,५००. २ ते ३ हप्त्यांमध्ये भरता येते.'
          : 'MS-CIT Fee: ₹4,500. Tally Prime: ₹5,500. Instalment options available!';
      } else if (lower.includes('pan') || lower.includes('पॅन')) {
        botReply = isMarathi
          ? 'पॅन कार्डसाठी आधार कार्ड, २ फोटो व मोबाईल नंबर आवश्यक आहे. २ तासात ई-पॅन मिळते.'
          : 'Instant PAN requires Aadhaar Card, 2 Photos & Mobile Number. E-PAN ready in 2 hours!';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-primary to-primary-dark text-white p-3.5 rounded-full shadow-2xl border border-primary-light/40 flex items-center gap-2 transform hover:scale-105 transition-all"
          title="Samarth AI Assistant"
        >
          <Sparkles className="w-5 h-5 text-accent-gold" />
          <span className="hidden sm:inline font-bold text-xs">
            {isMarathi ? 'AI मदत घ्या' : 'AI Assistant'}
          </span>
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-dark to-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm">Samarth AI Assistant</div>
                <div className="text-[10px] text-slate-300">Instant Course & Service Guide</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'bot' && <Bot className="w-4 h-4 text-primary shrink-0 mt-1" />}
                <div 
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    m.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isMarathi ? 'प्रॉब्लेम किंवा प्रश्न टाईप करा...' : 'Type your question...'}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="bg-primary text-white p-2 rounded-xl hover:bg-primary-dark">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
