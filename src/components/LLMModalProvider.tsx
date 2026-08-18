"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import React from "react";
import IntrigueLoader from "./IntrigueLoader";

interface ModalState {
  open: boolean;
  title: string;
  prompt: string;
  loading: boolean;
  content: string;
}

interface LLMModalContextType {
  openModal: ({ title, prompt }: { title: string; prompt: string }) => Promise<void>;
  generateText: (prompt: string) => Promise<string>;
}

const LLMModalContext = createContext<LLMModalContextType | undefined>(undefined);

export function useLLMModal() {
  const context = useContext(LLMModalContext);
  if (!context) throw new Error('useLLMModal must be used within an LLMModalProvider');
  return context;
}

export async function generateText(prompt: string): Promise<string> {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  if (data.text) return data.text as string;
  const message = typeof data.error === 'string' ? data.error : data.error?.message || 'Could not get a response from the AI.';
  throw new Error(message);
}

function formatInline(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-purple-700 underline">$1</a>');
}

function formatLLMContent(text: string) {
  const blocks = text.split(/\n{2,}/).filter(Boolean);
  return blocks.map((block: string, i: number) => {
    if (/^### /.test(block)) return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{block.replace(/^### /, "")}</h3>;
    if (/^## /.test(block)) return <h2 key={i} className="text-xl font-bold mt-6 mb-2">{block.replace(/^## /, "")}</h2>;
    if (/^# /.test(block)) return <h1 key={i} className="text-2xl font-bold mt-8 mb-3">{block.replace(/^# /, "")}</h1>;
    const lines = block.split('\n');
    const isList = lines.every((line) => /^\s*(?:[-*]|\d+\.)\s+/.test(line));
    if (isList) {
      return (
        <ul key={i} className="list-disc list-inside space-y-1 mb-3">
          {lines.map((line, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\s*(?:[-*]|\d+\.)\s+/, '')) }} />
          ))}
        </ul>
      );
    }
    return <div key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formatInline(block.replace(/\n/g, '<br />')) }} />;
  });
}

export default function LLMModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ open: false, title: "", prompt: "", loading: false, content: "" });

  const openModal = async ({ title, prompt }: { title: string; prompt: string }) => {
    setModal({ open: true, title, prompt, loading: true, content: "" });
    try {
      const text = await generateText(prompt);
      setModal((m) => ({ ...m, loading: false, content: text }));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setModal((m) => ({ ...m, loading: false, content: `Error: ${message}` }));
    }
  };

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  return (
    <LLMModalContext.Provider value={{ openModal, generateText }}>
      {children}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl max-w-3xl w-full relative">
            <button className="absolute top-4 right-4 text-purple-700 text-2xl" onClick={closeModal} aria-label="Close">&times;</button>
            <h3 className="text-2xl font-bold text-purple-700 mb-4 pr-8">{modal.title}</h3>
            <div className="text-stone-700 min-h-[120px] max-h-[60vh] overflow-y-auto pr-2">
              {modal.loading ? (
                <IntrigueLoader />
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
