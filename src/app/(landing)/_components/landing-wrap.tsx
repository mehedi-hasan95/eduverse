import { Logo } from "@/components/common/logo";
import { LandingMenus } from "./landing-menus";
import { LoginLogout } from "@/components/common/login-logout";

export const LandingWrap = () => {
  return (
    <div className="flex justify-between items-center container mx-auto px-2 pt-4 md:pt-6">
      <Logo />
      <LandingMenus oriantation="Desktop" />
      <div className="flex gap-2 items-center">
        <LoginLogout />
        <LandingMenus oriantation="Mobile" />
      </div>
    </div>
  );
};
