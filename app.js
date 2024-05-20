require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const debug = require("debug")('personasproductos:app');

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files
app.use(express.static("public"));

//Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//Routes
app.use("/", require("./server/routes/customer"));
app.use("/person", require("./server/routes/person"));
app.use("/product", require("./server/routes/product"));

//Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  debug(`App listening on port ${port}`);
});

module.exports = app;