import { type NextPage } from "next";
import Head from "next/head";
import { SignIn, SignInButton, useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div>{!user.isSignedIn && <SignInButton />}</div>
        {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
      </main>
    </>
  );
};

export default Home;
