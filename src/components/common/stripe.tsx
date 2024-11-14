"use client";

import { useStripeElements } from "@/hooks/stripe";
import { Elements } from "@stripe/react-stripe-js";

export const StripeElements = ({ children }: { children: React.ReactNode }) => {
  const { StripePromise } = useStripeElements();
  const promise = StripePromise();
  return promise && <Elements stripe={promise}>{children}</Elements>;
};
