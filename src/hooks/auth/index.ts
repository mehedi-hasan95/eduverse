import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useSignUp } from "@clerk/nextjs";

export const useGoogleAuth = () => {
  const { signIn, isLoaded: LoadedSignIn } = useSignIn();
  const { signUp, isLoaded: LoadedSignUp } = useSignUp();

  const signInWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignIn) return;
    try {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/sign-in",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignUp) return;
    try {
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/complete",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { signUpWith, signInWith };
};
