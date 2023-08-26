import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";
// const openai = new OpenAI({
//   apiKey: "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",
// });

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // @ts-ignore
  const reqJson = await req.json();
  const { messages, api_key } = reqJson;

  const openai = new OpenAI({
    apiKey: api_key,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages,
    // messages: [{ role: "user", content: "What is love?" }],
  });
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
