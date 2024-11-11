import { onGetAuthenticatedUser } from "@/action/auth";
import { Logo } from "@/components/common/logo";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await onGetAuthenticatedUser();
  if (user.status === 200) redirect("/callback/sign-in");
  return (
    <div className="px-6 py-10 space-y-2">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
