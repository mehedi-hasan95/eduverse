import { onSignInUser, onSignUpUser } from "@/action/auth";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CallbackSignIn = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const hasExisting = await db.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!hasExisting) {
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
  }
  const authenticated = await onSignInUser(user.id);

  if (authenticated.status === 200) return redirect(`/group/create`);

  if (authenticated.status === 207)
    return redirect(
      `/group/${authenticated.groupId}/channel/${authenticated.channelId}`
    );

  if (authenticated.status !== 200) {
    redirect("/sign-in");
  }
};

export default CallbackSignIn;
