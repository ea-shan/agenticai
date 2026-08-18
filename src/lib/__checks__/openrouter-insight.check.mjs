// ponytail: fails if OpenRouter/Nemotron is misconfigured or the text contract breaks
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

function loadEnv(path) {
  const out = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    out[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return out;
}

function messageText(message) {
  if (!message || typeof message !== 'object') return '';
  const content = message.content;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((part) => (typeof part === 'string' ? part : part?.text ?? '')).join('');
  }
  return '';
}

function cleanText(raw) {
  let text = raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  if (/^(?:here's a thinking process:|thinking process:|reasoning:)/i.test(text)) {
    const labeled = text.match(/(?:\*\*(?:Positioning|The ask|Strength|Gap)\*\*|(?:^|\n)(?:Positioning|The ask|Strength|Gap)\s*[:—-])[\s\S]+$/i);
    if (labeled) return labeled[0].trim();
    const parts = text.split(/\n(?:final answer|answer)\s*:?\s*\n/i);
    if (parts.length > 1) return parts[parts.length - 1].trim();
  }
  return text;
}

assert.equal(cleanText('<think>hide</think>\nVisible'), 'Visible');
assert.equal(
  cleanText("Here's a thinking process:\nnotes\n\n**Positioning** — HubSpot is a suite."),
  '**Positioning** — HubSpot is a suite.',
);
assert.equal(messageText({ content: 'ok' }), 'ok');
assert.equal(messageText({ content: [{ text: 'a' }, { text: 'b' }] }), 'ab');

const env = loadEnv(resolve(process.cwd(), '.env'));
const apiKey = env.OPENROUTER_API_KEY;
const model = env.OPENROUTER_MODEL || 'nvidia/nemotron-3.5-lightning:free';
const base = env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
assert.ok(apiKey, 'OPENROUTER_API_KEY missing');

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
    messages: [{ role: 'user', content: 'Write exactly one line starting with Positioning: about HubSpot.' }],
    max_tokens: 2500,
    temperature: 0,
    reasoning: { effort: 'low', exclude: true },
  }),
});

const data = await res.json();
assert.ok(res.ok, data?.error?.message || `HTTP ${res.status}`);
const text = cleanText(messageText(data?.choices?.[0]?.message));
assert.ok(text.length > 20, 'empty model response');
assert.ok(!/^here's a thinking process/i.test(text), 'thinking leaked into insight');
console.log('ok', model, text.slice(0, 80));
