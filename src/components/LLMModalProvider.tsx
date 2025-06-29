"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import React from "react";

interface ModalState {
  open: boolean;
  title: string;
  prompt: string;
  loading: boolean;
  content: string;
}

interface LLMModalContextType {
  openModal: ({ title, prompt }: { title: string; prompt: string }) => Promise<void>;
}

const LLMModalContext = createContext<LLMModalContextType | undefined>(undefined);

export function useLLMModal() {
  const context = useContext(LLMModalContext);
  if (!context) throw new Error('useLLMModal must be used within an LLMModalProvider');
  return context;
}

// Enhanced markdown-like parser for headings, bold, italics, and links
function formatLLMContent(text: string) {
  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n{2,}/).filter(Boolean);
  return paragraphs.map((para: string, i: number) => {
    // Headings
    if (/^### /.test(para)) return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{para.replace(/^### /, "")}</h3>;
    if (/^## /.test(para)) return <h2 key={i} className="text-xl font-bold mt-6 mb-2">{para.replace(/^## /, "")}</h2>;
    if (/^# /.test(para)) return <h1 key={i} className="text-2xl font-bold mt-8 mb-3">{para.replace(/^# /, "")}</h1>;
    // Inline formatting: bold (**text**), italics (*text*), links
    const formatted = para
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-purple-700 underline">$1</a>');
    return <div key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
}

export default function LLMModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ open: false, title: "", prompt: "", loading: false, content: "" });

  const openModal = async ({ title, prompt }: { title: string; prompt: string }) => {
    setModal({ open: true, title, prompt, loading: true, content: "" });
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      let text = "";
      if (
        data.candidates &&
        data.candidates[0]?.content?.parts &&
        data.candidates[0].content.parts[0]?.text
      ) {
        text = data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        text = `Error: ${data.error.message || data.error}`;
      } else {
        text = "Error: Could not get a response from the AI. Please try again.";
      }
      setModal((m) => ({ ...m, loading: false, content: text }));
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
        message = (error as { message: string }).message;
      }
      setModal((m) => ({ ...m, loading: false, content: `Error: ${message}` }));
    }
  };

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  return (
    <LLMModalContext.Provider value={{ openModal }}>
      {children}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-3xl w-full relative">
            <button className="absolute top-4 right-4 text-purple-700 text-2xl" onClick={closeModal}>&times;</button>
            <h3 className="text-2xl font-bold text-purple-700 mb-4">{modal.title}</h3>
            <div className="text-stone-700 min-h-[120px] max-h-[60vh] overflow-y-auto pr-2">
              {modal.loading ? (
                <div className="flex justify-center items-center h-20">
                  <span className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin"></span>
                </div>
              ) : (
                <div>{formatLLMContent(modal.content)}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </LLMModalContext.Provider>
  );
}
