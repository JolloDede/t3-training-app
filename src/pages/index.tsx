import { type NextPage } from "next";
import Head from "next/head";
import Navbar, { ActivePage } from "~/components/Navbar";
import PageTitle from "~/components/PageTitle";
import { WorkoutList } from "~/components/Workout";


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Navbar activePage={ActivePage.Home} />
        <div className="mx-auto w-4/5">
          <PageTitle>Home</PageTitle>
          <WorkoutList />
        </div>
      </main>
    </>
  );
};

export default Home;
