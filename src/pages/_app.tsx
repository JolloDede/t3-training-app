import { type AppType } from "next/app";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import LoginPage from "./login";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <LoginPage />
      </SignedOut>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);