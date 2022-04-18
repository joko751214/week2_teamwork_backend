const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With", // headers 允許哪些資訊
  "Access-Control-Allow-Origin": "*", // 允許其他IP造訪
  "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE", // 支援的方法
  "Content-Type": "application/json",
};

module.exports = headers;