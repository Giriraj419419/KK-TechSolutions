import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Paperclip, Smile, Mic, ChevronDown, Minus } from 'lucide-react';

type Msg = { 
  id: string; 
  role: 'user' | 'bot'; 
  text: string; 
  suggestions?: string[];
};

const INITIAL_SUGGESTIONS = [
  "What AWS services do you offer?",
  "Tell me about Microsoft 365.",
  "Which cloud solution is best for my business?",
  "Book a free consultation."
];

const KNOWLEDGE: { keywords: string[]; reply: string; followUps: string[] }[] = [
  {
    keywords: ['aws', 'amazon'],
    reply: "We offer comprehensive AWS Cloud Services including Cloud Migration, Security & Compliance, Performance Optimization, Compute & Storage (EC2, S3), and Infrastructure management.",
    followUps: ["AWS Migration", "Compare AWS vs Azure", "Schedule an AWS Consultation"]
  },
  {
    keywords: ['azure', 'microsoft cloud'],
    reply: "We provide end-to-end Microsoft Azure solutions. From initial cloud migration to managing complex hybrid environments, our Azure experts ensure your infrastructure is secure and optimized.",
    followUps: ["Azure Migration Strategy", "Compare AWS vs Azure", "Book a free consultation"]
  },
  {
    keywords: ['microsoft 365', 'office 365', 'm365'],
    reply: "We are Microsoft experts, deploying and managing Microsoft 365 to boost enterprise productivity with Business Premium, Teams integration, and advanced security.",
    followUps: ["Microsoft Licensing", "Email Migration", "Microsoft Business Premium"]
  },
  {
    keywords: ['adobe'],
    reply: "As an authorized partner for Adobe Licensing, we streamline procurement, manage Creative Cloud deployments, and optimize software spending.",
    followUps: ["Adobe Licensing Pricing", "Volume Licensing", "Book a free consultation"]
  },
  {
    keywords: ['autodesk', 'cad', '3d'],
    reply: "We provide Autodesk Solutions and licensing for architecture, engineering, and manufacturing, ensuring your team has the right tools and support.",
    followUps: ["Autodesk Licensing Options", "Contact Sales"]
  },
  {
    keywords: ['cloud', 'migration', 'platform'],
    reply: "Our Cloud Migration services ensure a zero-downtime transition to platforms like AWS or Azure, including infrastructure assessment and secure execution.",
    followUps: ["Which cloud platform is best?", "Cloud Security", "Migration Timeline"]
  },
  {
    keywords: ['managed', 'it services', 'support'],
    reply: "Our Managed IT Services offer 24/7 proactive monitoring, helpdesk support, and continuous infrastructure maintenance.",
    followUps: ["Helpdesk SLA", "Infrastructure Modernization", "Pricing Details"]
  },
  {
    keywords: ['security', 'backup', 'disaster'],
    reply: "Enterprise security is our priority. We deploy robust cybersecurity protocols and automated Backup & Disaster Recovery (BDR) systems.",
    followUps: ["Disaster Recovery Plan", "Ransomware Protection"]
  },
  {
    keywords: ['contact', 'book', 'consultation', 'location', 'phone', 'email'],
    reply: "Let's connect! You can reach us at info@kktechsolutions.in or call +91 70482 14373. We're located at 715, Shilp Arista, Sindhu Bhawan Road, Ahmedabad.",
    followUps: ["Email the team", "Call now", "Services overview"]
  }
];

function getBotResponse(input: string) {
  const q = input.toLowerCase();
  for (const item of KNOWLEDGE) {
    if (item.keywords.some(k => q.includes(k))) {
      return { reply: item.reply, followUps: item.followUps };
    }
  }
  return { 
    reply: "Thank you for reaching out. We specialize in Enterprise IT, Cloud Migration (AWS/Azure), Microsoft 365, and Managed Services. Could you provide a bit more detail, or would you like to book a consultation?", 
    followUps: ["Book a free consultation", "List all services", "Contact details"] 
  };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  
  const [messages, setMessages] = useState<Msg[]>([
    { 
      id: 'welcome', 
      role: 'bot', 
      text: "Hi! I'm KK Tech Solutions' AI Assistant. How can I help?",
      suggestions: INITIAL_SUGGESTIONS
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const handleSend = (text: string) => {
    const t = text.trim();
    if (!t) return;
    
    // Remove suggestions from previous bot message to keep chat clean
    setMessages(prev => prev.map(m => ({ ...m, suggestions: [] })));
    
    // eslint-disable-next-line react-hooks/purity
    const userMsg: Msg = { id: Date.now().toString(), role: 'user', text: t };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    
    setTimeout(() => {
      const response = getBotResponse(t);
      const botMsg: Msg = { 
        id: (Date.now() + 1).toString(), 
        role: 'bot', 
        text: response.reply,
        suggestions: response.followUps 
      };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      // eslint-disable-next-line react-hooks/purity
    }, 1000 + Math.random() * 600);
  };

  return (
    <>
      {/* Premium Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all cursor-pointer group"
        style={{
          background: 'linear-gradient(135deg, #2563EB, #0ea5e9)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
        aria-label={open ? "Close AI Chat" : "Open AI Chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <ChevronDown className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <Bot className="w-7 h-7 text-white group-hover:animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-[#0B121F] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col rounded-3xl premium-glass border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(37,99,235,0.15)] overflow-hidden bg-[#0B121F]/95 backdrop-blur-xl"
          >
            {/* Header Section */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-transparent relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="flex items-center justify-center shrink-0">
                  <img loading="lazy" decoding="async" src="/kk-logo-transparent.png" alt="KK Tech Solutions" className="h-7 w-auto object-contain drop-shadow-md" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[13px] font-bold text-white tracking-wide leading-tight">KK Tech AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium leading-none">Usually replies instantly</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10 shrink-0">
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((m) => (
                <div key={m.id} className="flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {m.role === 'user' ? (
                      <div className="max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-[13px] leading-relaxed bg-blue-600 text-white shadow-md">
                        {m.text}
                      </div>
                    ) : (
                      <div className="max-w-[90%] rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] leading-relaxed text-gray-200 bg-white/5 border border-white/10 shadow-sm">
                        {m.text.split('\n').map((line, j) => (
                          <React.Fragment key={j}>
                            <span className="block min-h-[14px]">{line}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Dynamic Suggestions rendered immediately below the AI message */}
                  {m.role === 'bot' && m.suggestions && m.suggestions.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex flex-wrap gap-2 mt-3 pl-1"
                    >
                      {m.suggestions.map((s, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleSend(s)}
                          className="text-[12px] rounded-full px-3.5 py-1.5 text-left font-medium border border-blue-500/30 bg-blue-500/10 text-blue-300 transition-all hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-white cursor-pointer hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 leading-tight"
                        >
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start">
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3.5 bg-white/5 border border-white/10 shadow-sm flex gap-1.5 h-10 items-center">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#0B121F]/90 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative flex items-end gap-2">
                
                <div className="relative flex-1 bg-white/[0.03] border border-white/10 rounded-2xl transition-all focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about AWS, Microsoft, Azure, Adobe, Autodesk, or our IT solutions..."
                    className="w-full bg-transparent px-4 py-3.5 pr-24 text-[13px] focus:outline-none text-white placeholder-gray-500"
                  />
                  
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                    <button type="button" className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/10">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/10">
                      <Smile className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/10">
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className={`w-[46px] h-[46px] rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${input.trim() ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer hover:bg-blue-500 hover:scale-105' : 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'}`}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

