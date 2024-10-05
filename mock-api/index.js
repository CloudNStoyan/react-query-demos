import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

const port = 3001;

app.get("/api/test-endpoint", async (_req, res) => {
  // slow down the thing for 2 seconds
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  res.send(Date.now().toString());
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
