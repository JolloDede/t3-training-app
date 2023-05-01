import { Muscle } from "@prisma/client";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import Bin from "~/components/Bin";
import Button from "~/components/Button";
import Card from "~/components/Card";
import HLink from "~/components/Link";
import Navbar, { ActivePage } from "~/components/Navbar";
import { PageTitle, SecondTitle } from "~/components/Title";
import { api } from "~/utils/api";

function MusclePage() {
    const { data } = api.muscles.getAll.useQuery();
    const router = useRouter();
    const ctx = api.useContext();

    const { mutate } = api.muscles.delete.useMutation({
        onSuccess: () => {
            void ctx.muscles.getAll.invalidate();
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

    async function handleDelClick(e: MouseEvent, muscle: Muscle) {
        e.stopPropagation();
        mutate({ id: muscle.id })
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
            <SecondTitle>Muscle List</SecondTitle>
            <Button onCLick={() => router.push("muscles/new")}>New Muscle</Button>
            {data?.map((muscle) => (
                <Card key={muscle.id}>
                    <p className="flex select-none">{muscle.name}</p>
                    <div onClick={(e) => handleDelClick(e, muscle)} className="flex mr-0 ml-auto pt-1 cursor-pointer">
                        <Bin />
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default MusclePage;