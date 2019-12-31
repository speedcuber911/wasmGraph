const path = require("path");
const express = require("express");
const app = express();
app.use(express.static("public"));
express.static.mime.types["wasm"] = "application/wasm";

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
