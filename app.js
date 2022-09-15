const express = require("express");
const app = express();
const expHB = require("express-handlebars");
const mongo = require("mongoose")
const conf = require("config");
const Handlebars = require("handlebars");

const index = require("./routes/index");
const about = require("./routes/about");

const hbs = expHB.create({
    defaultLayout: "main",
    extname: "hbs"
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.urlencoded({ extended: true }));

app.use(express.static("views"));

app.use("/", index);
app.use("/about",about);


const port = conf.get("port");
async function connectToMongo(){
try{
    await mongo.connect(conf.get("uri",{urlNewUserParse: true}))
    app.listen(port,()=>{
        console.log(("Ура!"));
    })
}
catch(e){
    console.log(e);
}
}
connectToMongo();