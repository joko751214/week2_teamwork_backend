const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
// 連線資料庫
mongoose
  .connect(DB)
  .then(() => console.log("資料庫連線成功"))
  .catch((err) => console.log(err));

const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With", // headers 允許哪些資訊
  "Access-Control-Allow-Origin": "*", // 允許其他IP造訪
  "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE", // 支援的方法
  "Content-Type": "application/json",
};

const requestListener = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  if (req.url === "/posts" && req.method === "GET") {
    res.writeHead(200, headers);
    res.end();
  } else if (req.method === "OPTION") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(400, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "路由錯誤",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);

server.listen(3005);
