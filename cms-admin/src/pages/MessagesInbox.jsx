import React, { useEffect, useState } from 'react';
import { Trash2, RefreshCw, Send, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function MessagesInbox({ onRefreshUnread }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await api.getMessages();
      setMessages(data || []);
      if (onRefreshUnread) onRefreshUnread();
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.markMessageRead(id);
      setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg({ ...selectedMsg, is_read: true });
      }
      if (onRefreshUnread) onRefreshUnread();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.deleteMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
      if (selectedMsg?.id === id) setSelectedMsg(null);
      if (onRefreshUnread) onRefreshUnread();
    } catch (err) { alert(err.message || 'Failed to delete'); }
  };

  const handleSelect = (msg) => {
    setSelectedMsg(msg);
    if (!msg.is_read) {
      handleMarkRead(msg.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Contact Submissions & Inbox</h2>
          <p className="text-xs text-slate-400 mt-0.5">Inquiries submitted through the portfolio contact form</p>
        </div>
        <button onClick={loadMessages} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-800 transition">
          <RefreshCw className={"w-3.5 h-3.5 " + (loading ? "animate-spin" : "")} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-2">
          {loading ? (
            <div className="text-xs text-slate-400 py-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading inbox...</div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-500">
              Inbox is empty.
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={
                  "p-4 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 " +
                  (selectedMsg?.id === msg.id
                    ? "bg-sky-500/10 border-sky-500/30"
                    : msg.is_read
                    ? "bg-slate-900/50 border-slate-800/80 hover:bg-slate-900"
                    : "bg-slate-900 border-sky-500/20 hover:border-sky-500/40 shadow-sm")
                }
              >
                <div className="space-y-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />}
                    <h4 className={"text-xs truncate " + (!msg.is_read ? "font-bold text-white" : "font-medium text-slate-300")}>
                      {msg.name}
                    </h4>
                  </div>
                  <p className="text-xs font-medium text-slate-200 truncate">{msg.subject}</p>
                  <p className="text-[11px] text-slate-400 truncate">{msg.message}</p>
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                  {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Recent'}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          {selectedMsg ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">{selectedMsg.subject}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{selectedMsg.name}</span>
                    <span>&lt;{selectedMsg.email}&gt;</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Received: {selectedMsg.created_at ? new Date(selectedMsg.created_at).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(selectedMsg.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl text-xs text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-800">
                {selectedMsg.message}
              </div>

              <div className="flex justify-end pt-2">
                <a
                  href={"mailto:" + selectedMsg.email + "?subject=Re: " + encodeURIComponent(selectedMsg.subject)}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-xs transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 text-xs">
              Select a message from the list to preview details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
