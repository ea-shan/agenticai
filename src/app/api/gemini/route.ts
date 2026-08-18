import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_MODELS = [
  'nvidia/nemotron-3.5-lightning:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
];

function modelList() {
  const preferred = [
    process.env.OPENROUTER_MODEL,
    process.env.OPENROUTER_FAST_MODEL,
    ...DEFAULT_MODELS,
  ].filter((id): id is string => Boolean(id));
  return [...new Set(preferred)];
}

function messageText(message: unknown): string {
  if (!message || typeof message !== 'object') return '';
  const content = (message as { content?: unknown }).content;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === 'string' ? part : (part as { text?: string })?.text ?? ''))
      .join('');
  }
  return '';
}

function cleanText(raw: string) {
  const text = raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  if (/^(?:here's a thinking process:|thinking process:|reasoning:)/i.test(text)) {
    const labeled = text.match(/(?:\*\*(?:Positioning|The ask|Strength|Gap)\*\*|(?:^|\n)(?:Positioning|The ask|Strength|Gap)\s*[:—-])[\s\S]+$/i);
    if (labeled) return labeled[0].trim();
    const parts = text.split(/\n(?:final answer|answer)\s*:?\s*\n/i);
    if (parts.length > 1) return parts[parts.length - 1].trim();
  }
  return text;
}

function errorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== 'object') return fallback;
  const error = (data as { error?: unknown }).error;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }
  return fallback;
}

async function complete(apiKey: string, model: string, prompt: string) {
  const base = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://expressanalytics.com',
      'X-OpenRouter-Title': 'Agentic AI Pitch',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a concise strategy analyst writing investor-ready copy for Express Analytics\' agentic AI marketing pitch. Be specific. No fluff. Use short labeled lines, not long essays.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 2500,
      reasoning: { effort: 'low', exclude: true },
    }),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const prompt = body?.prompt;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenRouter API key' }, { status: 500 });
  }
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  let lastError = 'OpenRouter request failed';
  for (const model of modelList()) {
    const { ok, status, data } = await complete(apiKey, model, prompt.trim());
    if (!ok) {
      lastError = errorMessage(data, lastError);
      if (status === 401 || status === 403) break;
      continue;
    }
    const text = cleanText(messageText(data?.choices?.[0]?.message));
    if (!text) {
      lastError = 'Empty model response';
      continue;
    }
    return NextResponse.json({ text });
  }

  return NextResponse.json({ error: lastError }, { status: 502 });
}
