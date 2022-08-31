const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const { Elarian } = require("elarian");

const client = new Elarian({
  apiKey: process.env.API_KEY,
  orgId: process.env.ORG_ID,
  appId: process.env.APP_ID,
});

client
  .on("error", () => {
    console.log("App failed to connect");
  })
  .on("connected", async () => {
    console.log("App connected successfully");

    const customer = new client.Customer({
      number: "+254*********", // my app number
      provider: "cellular",
    });

    await customer.sendMessage(
      {
        number: process.env.SMS_SHORT_CODE, // you can either use the SMS_SHORT_CODE or the ALPHANUMERIC here
        channel: "sms",
      },
      {
        body: {
          text: "Well done Sly!",
        },
      }
    );
  })
  .connect();