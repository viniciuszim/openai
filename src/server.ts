import express from "express";

import { Router, Request, Response } from "express";
import {
  // @ts-ignore
  getMessage,
  getRunAnswer,
  listMessages,
  retrieveMessage,
  retrieveRun,
} from "./openia";

async function main() {
  getRunAnswer();
}

const app = express();

const route = Router();

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  main();

  res.json({ message: "hello world with Typescript" });
});

app.use(route);

app.listen(3333, () => "server running on port 3333");
