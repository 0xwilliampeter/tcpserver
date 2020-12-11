const net = require("net");

const client = net.createConnection({
  host: "localhost",
  port: 6002,
});

client.on("connect", () => {
  console.log("CONNECTED");
  client.write("From Client: This is my IMEI" + "\r\n");
});

client.on("data", (data) => {
  console.log(`Message received from server: ${data.toString()}`);
});

client.on("error", (error) => {
  console.error(error.message);
});
