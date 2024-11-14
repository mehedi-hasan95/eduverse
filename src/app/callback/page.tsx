import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CallbackPage = async () => {
  const user = await currentUser();
  if (user) redirect("/");
  return <AuthenticateWithRedirectCallback />;
};

export default CallbackPage;
