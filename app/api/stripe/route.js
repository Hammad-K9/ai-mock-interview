import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { db } from '@/utils/drizzledb';
import { Subscriptions, Payments } from '@/utils/schema';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const payload = await req.text();

    const sig = req.headers.get('Stripe-Signature');

    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_KEY
    );

    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const data = event.data.object;
        const customerId = data.customer;
        const subscriptionId = data.subscription;
        const paymentId = data.id;
        // Convert amount below from cents to dollars
        const amount = (data.amount_due / 100).toFixed(2);
        const email = data.customer_email;
        const date = data.created * 1000;

        const subscriptionType =
          amount === (10).toFixed(2) ? 'Monthly' : 'Yearly';

        await db.insert(Subscriptions).values({
          customerId,
          subscriptionId,
          subscriptionType,
          email,
          date
        });

        await db.insert(Payments).values({
          customerId,
          paymentId,
          amount,
          email,
          date
        });

        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ status: 'Success' });
  } catch (error) {
    console.log('[STRIPE_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
