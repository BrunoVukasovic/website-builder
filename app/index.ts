import express, { Application } from "express";

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}...`);
});
