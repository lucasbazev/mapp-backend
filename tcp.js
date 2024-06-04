const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (connection) => {
  console.log("io: new connection, IP: ", connection.id);

  connection.on("data", (data) => {
    const { latitude, longitude } = data;
    const formattedData = {
      latitude,
      longitude,
      client_id: connection.id,
    };
    // const message = JSON.stringify(formattedData);
    //
    console.log(`io: new data received from ${connection.id}: `, formattedData);
    //
    io.emit("location", formattedData);
  });

  connection.on("disconnect", () =>
    console.log("one connection closed: ", connection.id),
  );
});

server.listen(3000, (e) => {
  if (e) console.error("node server error: ", e);
  console.log("server running");
});
