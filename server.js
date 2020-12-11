const net = require("net");

const server = net.createServer();
const connectedClients = [];

server.listen(
  {
    hostname: "0.0.0.0",
    port: 6002,
  },
  () => {
    console.log("listening on *:6002 ...");
  }
);

server.on("connection", (client) => {
  console.log(`CONNECTED: ` + client.remoteAddress + ":" + client.remotePort);
  /** register lock on new connection or reconnect */
  connectedClients.push(client);

  client.on("data", (data) => {
    console.log(`${data}`);
    /** handle request from IoT: handles the commands from IoT to server */
    // TODO

    /** handle request from client: handles the commands that triggers at first from server to IoT */
    // TODO

    // respond back to client sending the data
    client.write(data + "\r\n");
  });

  // client disconnect
  client.once("close", () => {
    let index = connectedClients.findIndex((o) => {
      return (
        o.remoteAddress === client.remoteAddress &&
        o.remotePort === client.remotePort
      );
    });
    if (index !== -1) connectedClients.splice(index, 1);
    console.log("CLOSED: " + client.remoteAddress + " " + client.remotePort);
  });

  client.on("error", (error) => {
    console.error(error.message);
  });
});

setInterval(() => {
  /** In every 10 seconds, reguest lock status and save information in DB */
  // TODO
}, 10000);
