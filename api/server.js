const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/scrims", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const ScrimRouter = require("./routes/scrims");
app.use("/scrims", ScrimRouter);

const port = 5000;
app.listen(port, () => console.log(`Server Started on port: ${port}`));
