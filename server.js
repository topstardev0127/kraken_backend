const express = require("express");
const app = express();
const router = require("./routes/route");
const webhook = require("./routes/webhook");

app.use("/webhook", webhook);

app.use(express.json());
app.use("/", router);

app.listen(4242, () => console.log("Running on port 4242"));
