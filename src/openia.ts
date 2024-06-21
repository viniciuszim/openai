// Reference: https://platform.openai.com/docs/api-reference/introduction
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "ADD_API_KEY_HERE", // You can get here: https://platform.openai.com/api-keys
});
const MODEL = "gpt-3.5-turbo";

const ASSISTANT_ID = "asst_M2H6kw3L0NMH8NkqaB21Rg4r";
const THREAD_ID = "thread_kHvPF4yFnaIRoqMf9gZ6BSJr";
const MESSAGE_ID = "msg_IuteDdaI8SEXTMUVvDZthkQU";
const RUN_ID = "run_EOQle2OsJqIk8iYjmMNifT41";

export async function createAssistant() {
  const myAssistant = await openai.beta.assistants.create({
    instructions:
      "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
    name: "Math Tutor",
    tools: [{ type: "code_interpreter" }],
    model: MODEL,
  });

  console.log(myAssistant);
}

export async function createThread() {
  const emptyThread = await openai.beta.threads.create();

  console.log(emptyThread);
}

export async function createMessage() {
  const threadMessages = await openai.beta.threads.messages.create(THREAD_ID, {
    role: "user",
    content: "How does AI work? Explain it in simple terms.",
  });

  console.log(threadMessages);
}

export async function listMessages() {
  const threadMessages = await openai.beta.threads.messages.list(THREAD_ID, {
    limit: 1,
    // after: "msg_0Mc2usFgG6m7xkiYHeRQexsU",
  });

  console.log(threadMessages.data);
}

export async function runThread() {
  const run = await openai.beta.threads.runs.create(THREAD_ID, {
    assistant_id: ASSISTANT_ID,
  });

  console.log(run);
}

export async function retrieveRun() {
  const run = await openai.beta.threads.runs.retrieve(THREAD_ID, RUN_ID);

  console.log(run);
}

export async function getRunAnswer() {
  const threadMessages = await openai.beta.threads.messages.list(THREAD_ID, {
    run_id: RUN_ID,
  });

  console.log(threadMessages.data[0].content);
}

export async function retrieveMessage() {
  const message = await openai.beta.threads.messages.retrieve(
    THREAD_ID,
    MESSAGE_ID
  );

  // @ts-ignore
  console.log(message.content[0].text);
}
