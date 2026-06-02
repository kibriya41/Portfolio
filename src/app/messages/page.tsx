"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      } else {
        setError(data.error || "Failed to load messages.");
      }
    } catch (err) {
      setError("Failed to fetch messages. Make sure your server/database is connected.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      } else {
        alert(data.error || "Failed to delete message.");
      }
    } catch (err) {
      alert("Error deleting message.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-headline-xl text-3xl md:text-4xl text-on-surface font-bold">
              Contact Submissions
            </h1>
            <p className="font-body-md text-on-surface-variant mt-1">
              Read and manage messages received from your portfolio.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full hover:bg-primary/95 transition-all font-label-md font-semibold text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Portfolio
          </Link>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-on-surface-variant font-body-md">Loading messages from server...</p>
          </div>
        ) : error ? (
          <div className="glass-card rounded-xl p-8 border border-red-500/20 text-center">
            <span className="material-symbols-outlined text-5xl text-red-500 mb-2">error</span>
            <h3 className="font-headline-md text-red-500">Error Loading Messages</h3>
            <p className="text-on-surface-variant mt-2 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchMessages}
              className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-label-md font-semibold cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center border border-primary/10">
            <span className="material-symbols-outlined text-6xl text-primary/40 mb-3">mail_outline</span>
            <h3 className="font-headline-md text-on-surface">No Messages Found</h3>
            <p className="text-on-surface-variant mt-2 max-w-sm mx-auto">
              Any messages submitted via the contact form on your portfolio will show up here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="glass-card rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-headline-md text-[18px] text-on-surface font-bold">
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                      {msg.email}
                    </a>
                    <span className="text-[12px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-outline-variant/30">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {msg.subject && (
                    <div className="text-sm font-bold text-on-surface/80 flex items-center gap-1.5">
                      <span className="text-primary">Subject:</span> {msg.subject}
                    </div>
                  )}

                  <p className="text-on-surface-variant text-body-md whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </p>
                </div>

                <div className="flex md:flex-col justify-end items-end shrink-0">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    disabled={deleteId === msg._id}
                    className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition-all font-label-sm text-sm font-semibold cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {deleteId === msg._id ? "progress_activity" : "delete"}
                    </span>
                    {deleteId === msg._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
