const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const authRouter = require("./routes/auth-routes");

// create a database connection
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongodb connected"))
  .catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

//middleware

app.use('/api/auth',authRouter)

app.listen(PORT, () => console.log(`Server is runnin g on port ${PORT}`));
