const fs = require("fs");
var express = require("express");
var app = express();
var bounce = require("./routes/bounce")

app.use("/", bounce);

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})






   



