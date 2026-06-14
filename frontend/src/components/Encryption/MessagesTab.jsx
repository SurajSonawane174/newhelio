import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, MessageCircle, RefreshCw } from "lucide-react";

const API_BASE = "http://localhost:5000/api/v1";

const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  let data = null;
  try {
    data = await res.json();
  } catch (_) {}
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
};

const inputClass =
  "w-full p-2.5 text-sm rounded bg-[#2a2a3d] text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all";

const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

const MessagesTab = () => {
  const [contact, setContact] = useState("");
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  const loadMessages = async (number) => {
    if (!number) return;
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch(`/whatsapp/messages?contact=${encodeURIComponent(number)}`);
      setMessages(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openChat = (e) => {
    e.preventDefault();
    if (!contact) return;
    setActiveContact(contact);
  };

  useEffect(() => {
    if (!activeContact) return;
    loadMessages(activeContact);

    // poll every 5s for new replies
    pollRef.current = setInterval(() => loadMessages(activeContact), 5000);
    return () => clearInterval(pollRef.current);
  }, [activeContact]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !activeContact) return;
    setSending(true);
    setError("");
    try {
      await apiFetch("/whatsapp/send", {
        method: "POST",
        body: JSON.stringify({ to: activeContact, message: text }),
      });
      setText("");
      loadMessages(activeContact);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-cyan-400" />
        WhatsApp
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Sent via Helicoder — your personal number stays private.
      </p>

      {/* Contact selector */}
      <form onSubmit={openChat} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="+919876543210"
          className={inputClass}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-[0_0_15px_rgba(112,66,248,0.5)] transition-all active:scale-95"
        >
          Open Chat
        </button>
      </form>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 text-sm">
          {error}
        </div>
      )}

      {activeContact && (
        <div className="bg-[#1e1e2f]/80 border border-[#7042f83b] rounded-xl backdrop-blur-sm flex flex-col h-[480px]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#7042f83b]">
            <div>
              <p className="text-sm font-semibold text-white">{activeContact}</p>
              <p className="text-xs text-gray-500">Sandbox conversation</p>
            </div>
            <button
              onClick={() => loadMessages(activeContact)}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
            {messages.length === 0 && !loading && (
              <p className="text-center text-gray-500 text-sm mt-8">
                No messages yet. Remember: the recipient must first send your sandbox
                join phrase via WhatsApp before they can chat with you.
              </p>
            )}
            {messages.map((msg) => {
              const isOutbound = msg.direction === "outbound";
              return (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                    isOutbound
                      ? "self-end bg-gradient-to-r from-purple-500/80 to-cyan-500/80 text-white"
                      : "self-start bg-[#2a2a3d] text-gray-200 border border-gray-700"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.body}</p>
                  <p className={`text-[10px] mt-1 ${isOutbound ? "text-white/70" : "text-gray-500"}`}>
                    {formatTime(msg.createdAt)}
                  </p>
                </motion.div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-[#7042f83b]">
            <input
              type="text"
              placeholder="Type a message..."
              className={inputClass}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              disabled={sending || !text.trim()}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-[0_0_15px_rgba(112,66,248,0.5)] transition-all active:scale-95 disabled:opacity-50 shrink-0"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MessagesTab;