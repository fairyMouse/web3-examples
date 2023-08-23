import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "experimental-edge";
const apiKey = "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";

const configuration = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(configuration);

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // @ts-ignore
  const { messages } = await req.json();

  const result = await openai.createChatCompletion({
    model: "gpt-4",
    messages,
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(result);

  return new StreamingTextResponse(stream);
}
