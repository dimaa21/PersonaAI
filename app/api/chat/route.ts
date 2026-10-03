import { creators } from "@/data/creators";
import { creatorSystemPrompt, replyInCharacter } from "@/lib/creator-prompt";

type IncomingMessage = {
  role?: unknown;
  content?: unknown;
};

const maxTurns = 16;
const maxLength = 1000;

function cleanMessages(value: unknown) {
  if (!Array.isArray(value)) return null;
  const messages: { role: "user" | "assistant"; content: string }[] = [];

  for (const item of value.slice(-maxTurns)) {
    const message = item as IncomingMessage;
    const role = message.role === "assistant" ? "assistant" : message.role === "user" ? "user" : null;
    const content = typeof message.content === "string" ? message.content.trim() : "";
    if (!role || !content || content.length > maxLength) return null;
    messages.push({ role, content });
  }

  if (messages.length === 0 || messages.at(-1)?.role !== "user") return null;
  return messages;
}

async function modelReply(system: string, messages: { role: "user" | "assistant"; content: string }[]) {
  const key = process.env.AI_API_KEY;
  if (!key) return null;

  const base = (process.env.AI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.AI_MODEL ?? "gpt-4o-mini";
  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      max_tokens: 280,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });

  if (!response.ok) {
    throw new Error(`Model request failed (${response.status})`);
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = payload.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Model returned an empty reply");
  return reply;
}

export async function POST(request: Request) {
  let body: { creatorId?: unknown; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const creator = creators.find((item) => item.id === body.creatorId);
  const messages = cleanMessages(body.messages);
  if (!creator || !messages) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const modeled = await modelReply(creatorSystemPrompt(creator), messages);
    return Response.json({
      reply: modeled ?? replyInCharacter(creator, messages),
    });
  } catch {
    return Response.json({ error: "The creator could not reply." }, { status: 502 });
  }
}
