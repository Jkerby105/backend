const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const oppRoutes = require("./routes/opp");
const emergencyRoutes = require("./routes/emergency");
const loginRoutes = require("./routes/login");

const checkAuth = require("./util/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
  );

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });

  app.use(cookieParser());
//------------------ Various Action  -------------------\\

app.use("/login",loginRoutes);

app.use(checkAuth);

app.use("/volunteer", adminRoutes);

app.use("/opportunities", oppRoutes);

app.use("/emergency", emergencyRoutes);

app.listen(3001);
