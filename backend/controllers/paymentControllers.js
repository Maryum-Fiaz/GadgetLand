import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

import Stripe from "stripe";

// Create stripe checkout session   =>  /api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

    const line_items = body?.orderItems?.map((item) => {
      return {
        price_data: {
          currency: "pkr",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product },
          },
          unit_amount: item?.price * 100,
        },
        tax_rates: ["txr_1TjO67IX7S2MNZE09JPtjhVk"], // automatically handle tax rates for us
        quantity: item?.quantity,
      };
    });

    const shippingInfo = body?.shippingInfo;

    const shipping_rate =
      body?.itemsPrice >= 200
        ? "shr_1TjeyeIX7S2MNZE05epumHJT"
        : "shr_1TjKOeIX7S2MNZE0sy8AKBkc";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders?order_success=true`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items,
    });

    console.log("---------------------session : ", session);
    

    res.status(200).json({
      url: session.url,
    });
  }
);