import { Exercise } from "@prisma/client";
import { Router, useRouter } from "next/router";
import { MouseEvent } from "react";
import Bin from "~/components/Bin";
import Button from "~/components/Button";
import Card from "~/components/Card";
import HLink from "~/components/Link";
import Navbar, { ActivePage } from "~/components/Navbar";
import { PageTitle, SecondTitle } from "~/components/Title";
import { api } from "~/utils/api";

function ExercisePage() {
    const { data } = api.exercises.getAll.useQuery();
    const router = useRouter();
    const ctx = api.useContext();

    const { mutate } = api.exercises.delete.useMutation({
        onSuccess: () => {
            void ctx.exercises.getAll.invalidate();
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                console.log(errorMessage[0]);
            } else {
                console.log("Failed to delete! Please try again later.");
            }
        },
    })

    async function handleDelClick(e: MouseEvent, exercise: Exercise) {
        e.stopPropagation();
        mutate({ id: exercise.id });
    }

    return (
        <div>
            <Navbar activePage={ActivePage.Admin} />
            <PageTitle>Admin</PageTitle>
            <div className="flex">
                <div className="flex mx-2">
                    <HLink to="exercises">Exercises</HLink>
                </div>
                <div className="flex mx-2">
                    <HLink to="muscles">Muscles</HLink>
                </div>
            </div>
            <SecondTitle>Exercise List</SecondTitle>
            <Button onCLick={() => router.push("exercises/new")}>New Exercise</Button>
            {data?.map((exercise) => (
                <Card key={exercise.id} onClick={() => router.push("" + exercise.id)}>
                    <p className="flex select-none">{exercise.name}</p>
                    <div onClick={(e) => handleDelClick(e, exercise)} className="flex mr-0 ml-auto pt-1 cursor-pointer">
                        <Bin />
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ExercisePage;