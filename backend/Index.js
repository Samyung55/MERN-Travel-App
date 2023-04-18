require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const authRouter = require("./controls/auth")
const uploadRouter = require("./controls/upload")
const roomRouter = require("./controls/room");

const app = express();

mongoose.connect(process.env.MONGO_URL, () => console.log("Mongo connected!"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('public/images'));

app.use("/auth", authRouter);
app.use("/room", roomRouter)
app.use("/upload", uploadRouter)

app.listen(5500, () => console.log("Server is listening"))
