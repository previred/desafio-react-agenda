const jsonServer = require("json-server");
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 9000;

if(process.env.NODE_ENV === 'production') {
  console.log('Serving static files from the "/dist" folder')
  server.use(express.static('dist'));
}

server.use(middlewares);
server.use("/api", router);
server.listen(9000, () => {
  console.log(`JSON Server is running in http://localhost:${PORT}`);
});
