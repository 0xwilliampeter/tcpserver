const net = require("net");

const server = net.createServer();
const connectedClients = [];

server.listen(
  {
    hostname: "localhost",
    port: 6002,
  },
  () => {
    console.log("listening on *:6002 ...");
  }
);

server.on("connection", (client) => {
  console.log(`CONNECTED: ` + client.remoteAddress + ":" + client.remotePort);
  // client.write("Welcome to the server");
  connectedClients.push(client);

  client.on("data", (data) => {
    console.log(`${data}`);
    // Respond back to client sending the data
    client.write(data + "\r\n");
  });

  // client disconnect
  // client.on("end", () => {
  //   console.log("client left");
  //   delete connectedClients[client];
  //   console.log(connectedClients);
  // });

  client.on("close", () => {
    console.log("client left:close");
    let index = connectedClients.findIndex((o) => {
      return (
        o.remoteAddress === client.remoteAddress &&
        o.remotePort === client.remotePort
      );
    });
    if (index !== -1) connectedClients.splice(index, 1);
    console.log("CLOSED: " + client.remoteAddress + " " + client.remotePort);
    // delete connectedClients[client];
    console.log(connectedClients);
  });

  client.on("error", (error) => {
    console.error(error.message);
  });
});

// setInterval(() => {
//   const now = new Date().toISOString();

//   if (connectedClients.length > 0) {
//     connectedClients.forEach((client) => {
//       client.write(now);
//     });
//   }
// }, 2000);
