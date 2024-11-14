"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateGroupSchema } from "@/schemas/group.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { onGetStripeClientSecret, onTransferCommission } from "@/action/stripe";
import { StripeCardElement } from "@stripe/stripe-js";
import { toast } from "sonner";
import { onCreateNewGroup } from "@/action/group";
import { useEffect, useState } from "react";
import { Loader } from "@/components/common/loader";
import Link from "next/link";

type Props = {
  userId: string;
  affiliate: boolean;
  stripeId?: string;
};
export const PaymentForm = ({ affiliate, userId, stripeId }: Props) => {
  const [isCategory, setIsCategory] = useState<string | undefined>(undefined);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateGroupSchema>>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  useEffect(() => {
    const category = form.watch(({ category }) => {
      if (category) {
        setIsCategory(category);
      }
    });
    return () => category.unsubscribe();
  }, [form]);

  const { data: Intent, isPending: creatingIntent } = useQuery({
    queryKey: ["payment-intent"],
    queryFn: () => onGetStripeClientSecret(),
  });

  const { mutateAsync: createGroup, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof CreateGroupSchema>) => {
      if (!stripe || !elements || !Intent) {
        return null;
      }
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        Intent.secret!,
        {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        }
      );
      if (error) {
        return toast("Error", {
          description: "Oops! something went wrong, try again later",
        });
      }
      if (paymentIntent?.status === "succeeded") {
        if (affiliate) {
          await onTransferCommission(stripeId!);
        }
        const created = await onCreateNewGroup(userId, data);
        if (created && created.status === 200) {
          toast("Success", { description: created.message });
          router.push(
            `/group/${created.data?.group[0].id}/channel/${created.data?.group[0].channel[0].id}`
          );
        }
        if (created && created.status !== 200) {
          form.reset();
          return toast("Error", { description: created.message });
        }
      }
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateGroupSchema>) {
    createGroup(values);
  }
  return (
    <div>
      <Loader loading={creatingIntent}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#B4B0AE",
                    "::placeholder": {
                      color: "#B4B0AE",
                    },
                  },
                },
              }}
              className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
            />
            <div className="px-7 flex flex-col gap-5">
              <p className="text-sm text-themeTextGray">
                Cancel anytime with 1-click. By clicking below, you accept
                our terms.
              </p>
              <Link className="text-sm text-themeTextGray" href={"/explore"}>
                Skip for now
              </Link>
              <Button
                variant="outline"
                type="submit"
                className="bg-themeBlack border-themeGray rounded-xl"
              >
                <Loader loading={isPending}>Get Started</Loader>
              </Button>
            </div>
          </form>
        </Form>
      </Loader>
    </div>
  );
};
