import { onGetAuthenticatedUser } from "@/action/auth";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const LoginLogout = async () => {
  const user = await onGetAuthenticatedUser();
  return (
    <div>
      {user.status === 200 ? (
        <SignOutButton>
          <Button>
            <LogOut /> Log Out
          </Button>
        </SignOutButton>
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}
    </div>
  );
};
