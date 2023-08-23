import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";
const apiKey = "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";

const openai = new OpenAI({
  apiKey,
});

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // @ts-ignore
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages,
    // messages: [{ role: "user", content: "What is love?" }],
  });
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
