import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  X,
  ExternalLink,
  RotateCcw,
  Globe
} from 'lucide-react';
import { BusinessIdentity, TaxProfile } from '../types';
import { askLex } from '../ai.functions';
interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  business: BusinessIdentity;
  taxProfile: TaxProfile;
}

interface MessageSource {
  title: string;
  uri: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'lex';
  text: string;
  timestamp: string;
  sources?: MessageSource[];
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  business,
  taxProfile
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: 'msg-init-lex',
    sender: 'lex',
    text: "Hi. Ask me about GST, a job, or what you can claim. I'll keep it short.",
    timestamp: 'Just now'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'Do I need to register for GST?',
    'What can I claim?',
    'How does super work?',
  ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const saveMessage = async (_msg: ChatMessage) => {
    // Chat history stays in the current session until its Neon table is added.
  };

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Save user message to cloud if logged in
    saveMessage(userMsg);

    try {
      // Build conversation history payload
      const historyPayload = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text
      }));
      historyPayload.push({
        role: 'user',
        content: queryText
      });

      const data = await askLex({
        data: {
          messages: historyPayload.map((m) => ({
            role: m.role === 'user' ? 'user' as const : 'assistant' as const,
            content: m.content,
          })),
          context: {
            legalName: business.legalName,
            abn: business.abn,
            entityType: business.entityType,
            gstRegistered: taxProfile.gstRegistered,
          },
        },
      });
      const lexReply: ChatMessage = {
        id: `lex-${Date.now()}`,
        sender: 'lex',
        text: data.reply || 'I am processing your query under Australian regulatory frameworks.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || []
      };

      setMessages(prev => [...prev, lexReply]);
      saveMessage(lexReply);
    } catch (error) {
      console.error('[v0] Lex AI assistant error:', error instanceof Error ? error.message : 'unknown error');
      const unavailableMsg: ChatMessage = {
        id: `lex-${Date.now()}`,
        sender: 'lex',
        text: 'Lex is temporarily unavailable. Please try again later or consult your registered tax agent.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: []
      };
      setMessages(prev => [...prev, unavailableMsg]);
      saveMessage(unavailableMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 top-[env(safe-area-inset-top)] z-50 flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-neutral-900 shadow-2xl antialiased sm:inset-y-0 sm:left-auto sm:top-0 sm:w-[min(500px,calc(100vw-2rem))] sm:border-l sm:border-neutral-800">
      {/* Drawer Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-800 bg-neutral-950 p-3 sm:p-4">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 shadow-sm shadow-emerald-500/10">
            <Sparkles className="h-5 w-5" />
          </div>
          <img
            src="/talentos-logo.png"
            alt="Talentos"
            className="h-6 w-auto max-w-[96px] object-contain object-left sm:h-7 sm:max-w-[120px]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-sm">Lex</h3>
            </div>
            <span className="text-[11px] text-neutral-400">
              Ask when you need to
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            title="Start new conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-3 text-xs sm:p-4">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'lex' && (
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] space-y-2`}>
              <div
                className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-[#fff] rounded-tr-sm shadow-md shadow-emerald-600/10'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-tl-sm shadow-sm'
                }`}
              >
                {m.text}

                {/* Grounding Web Sources */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-neutral-800/80 space-y-1">
                    <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 uppercase">
                      <Globe className="w-3 h-3 text-emerald-400" />
                      <span>Sources</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {m.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 bg-neutral-900 border border-neutral-800 hover:border-emerald-500/40 px-2 py-0.5 rounded-md transition-colors"
                        >
                          <span className="truncate max-w-[200px]">{src.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`text-[10px] font-mono text-neutral-500 px-1 ${
                  m.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {m.timestamp}
              </div>
            </div>

            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2.5 text-neutral-400 text-xs italic py-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <span className="text-[11px]">Thinking…</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Queries */}
      {messages.length === 1 && (
      <div className="shrink-0 space-y-2 border-t border-neutral-800/80 bg-neutral-950/40 px-3 py-3">
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              disabled={isTyping}
              className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-left text-[11px] text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Input Field */}
      <div className="shrink-0 border-t border-neutral-800 bg-neutral-950 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask a question"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isTyping}
            className="flex-1 px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#fff] disabled:opacity-50 transition-colors cursor-pointer"
            title="Send to Lex"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
