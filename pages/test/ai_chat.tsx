import { nanoid } from "@/src/utils/nanoid";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SendIcon } from "lucide-react";
import { useChat } from "ai/react";
import { useState } from "react";

const Test = () => {
  const { messages, append } = useChat();
  const [prompts, setPrompts] = useState("");

  const [list, setList] = useState<{ id: string; question: string }[]>([]);
  const prefix = "hello,";

  console.log("messages:", messages);

  const sendPrompts = () => {
    const id = nanoid();
    const item = {
      id,
      question: prompts,
    };
    setList([...list, item]);
    append(
      {
        id,
        content: prefix + item.question,
        role: "user",
      },
      {
        options: {
          body: {
            api_key: "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",
          },
        },
      }
    );
    setPrompts("");
  };

  return (
    <Card
      className="relative"
      sx={{
        m: 2,
        p: 3,
        height: "78vh",
      }}
    >
      <Stack
        position={"absolute"}
        zIndex={1}
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          paddingBottom: "108px",
        }}
        spacing={2}
      >
        {messages.map(m => {
          const find = list.find(item => item.id === m.id);
          const { role, content, id } = m;
          return (
            <Stack key={id}>
              {role === "user" && (
                <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
                  <Stack
                    color={"primary"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                      height: 28,
                      width: 28,
                      bgcolor: "primary.main",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color={"primary.contrastText"}
                    >
                      Q
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">{find?.question}</Typography>
                </Stack>
              )}
              {role === "assistant" && (
                <Stack flexDirection={"row"} gap={2} alignItems={"flex-start"}>
                  <Stack
                    color={"primary"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                      height: 28,
                      width: 28,
                      border: "1px solid",
                      borderColor: "primary.main",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography variant="subtitle1" color={"primary.main"}>
                      A
                    </Typography>
                  </Stack>
                  <Stack sx={{ flex: 1 }}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Stack>
                </Stack>
              )}
            </Stack>
          );
        })}
      </Stack>
      <Card
        sx={{
          width: "calc(100% - 48px)",
          position: "absolute",
          zIndex: 10,
          bottom: "16px",
        }}
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={2}
          sx={{ height: 56, p: 2 }}
        >
          <Typography variant="body1">Prompts</Typography>
          <Divider orientation="vertical" />
          <TextField
            size="small"
            sx={{ flex: 1 }}
            value={prompts}
            onKeyDown={e => {
              if (e.key === "Enter") {
                sendPrompts();
              }
            }}
            onChange={e => setPrompts(e.target.value)}
          />
          <IconButton onClick={sendPrompts}>
            <SendIcon size={20} />
          </IconButton>
        </Stack>
      </Card>
    </Card>
  );
};

export default Test;
