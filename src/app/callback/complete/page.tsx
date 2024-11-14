import { onSignUpUser } from "@/action/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CallbackComplete = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const complete = await onSignUpUser({
    firstname: user.firstName as string,
    lastname: user.lastName as string,
    image: user.imageUrl,
    clerkId: user.id,
    userType: undefined,
  });

  if (complete.status == 200) {
    redirect(`/group/create`);
  }

  if (complete.status !== 200) {
    redirect("/sign-in");
  }
};

export default CallbackComplete;
