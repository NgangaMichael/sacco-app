const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const saccoRoute = require("./routes/saccoRoutes");
const commentRoute = require("./routes/commentRoute");
const { checkUser } = require("./middleware/auth");
const dbSetup = require("./database/dbsetup")
dbSetup()

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.get("*", checkUser);
app.use(commentRoute);
app.use(userRoute);
app.use(saccoRoute);
app.use(express.json());

app.listen(5000, () => {
    console.log("Server has started")
});