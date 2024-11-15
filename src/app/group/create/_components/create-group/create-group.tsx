"use client";
import { StripeElements } from "@/components/common/stripe";

import dynamic from "next/dynamic";
const PaymentForm = dynamic(
  () => import("./payment-form").then((component) => component.PaymentForm),
  { ssr: false }
);
type Props = {
  userId: string;
  affiliate: boolean;
  stripeId?: string;
};
export const CreateGroup = ({ affiliate, stripeId, userId }: Props) => {
  return (
    <StripeElements>
      <PaymentForm affiliate={affiliate} stripeId={stripeId} userId={userId} />
    </StripeElements>
  );
};
