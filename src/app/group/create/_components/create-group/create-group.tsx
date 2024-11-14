import { StripeElements } from "@/components/common/stripe";
import { PaymentForm } from "./payment-form";

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
