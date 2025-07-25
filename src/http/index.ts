import http from "http";

const HOST = "127.0.0.1";
const PORT = 8000;

const server = http.createServer((request, response) => {
  switch (request.method) {
    case "GET":
      switch (request.url) {
        case "/hello": {
          const headers = new Headers({ "Content-Type": "text/html" });
          response.setHeaders(headers);
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.end("Hello!");
          break;
        }
      }
      break;
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен на ${HOST}:${PORT}`);
});
