const stripe = require("stripe")(
  "sk_test_51PbRXxRq4JxXSwrHlqbNeZ4xAq8tbMneld3GYtUs8s9UZPjtoP2NBEo2V02StEGiPLv05jyRTL3lUVtfySkv5pjs00UcpWfd0H"
);
const express = require("express");
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_411ff8838ba84d1d6d534437c2ef2081e10b6bd5ad54ffafee19b007fb6dcda5";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
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

app.listen(4242, () => console.log("Running on port 4242"));
