const stripe = require("stripe")(
  "sk_test_51PbRXxRq4JxXSwrHlqbNeZ4xAq8tbMneld3GYtUs8s9UZPjtoP2NBEo2V02StEGiPLv05jyRTL3lUVtfySkv5pjs00UcpWfd0H"
);
const express = require("express");
const router = express.Router();

const endpointSecret =
  "whsec_411ff8838ba84d1d6d534437c2ef2081e10b6bd5ad54ffafee19b007fb6dcda5";

router.post(
  "/",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;
    console.log("111111111111");

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(err);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log(event);

    // Handle the event
    console.log(`Unhandled event type ${event.type}`);

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

router.get("/", (req, res) => {
  console.log("222222222");
  res.send("test");
});

module.exports = router;
