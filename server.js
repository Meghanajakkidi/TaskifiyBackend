const express = require("express");
const app = express()
app.use(express.json())
const fileupload = require("express-fileupload")
const mongoose = require("mongoose")
const cors = require("cors");
app.use(cors())
app.use(fileupload())

const taskRoutes = require("./routes/task")
 const authRoutes =require("./routes/Auth")
 const UsertaskRoutes = require("./routes/Usertask")
//mongoose.connect("mongodb://localhost:27017/task-app");
require('dotenv').config();

// Check the MongoDB URI
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/task-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    ssl: true,
    // sslValidate: false, // only if you're using self-signed certificates
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.use("/uploads",express.static('uploads'))
app.use("/task",taskRoutes)
app.use("/auth",authRoutes)
app.use("/user/task",UsertaskRoutes)

//here we saying  then /todo go to todo routes file


app.listen(7000, () => {
    console.log("server is running on port 7000")})