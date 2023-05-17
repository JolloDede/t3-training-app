import { Workout } from "@prisma/client";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { api } from "~/utils/api";
import Bin from "../Bin";
import Card from "../Card";
import EditPen from "../EditPen";
import ExerciseRep from "../Exercise";
import { ExpandIcon } from "../Icon";

interface CardProps {
    id: string;
}

function WorkoutChangeCard({ id }: CardProps) {
    const [displayExercises, setdisplayExercises] = useState(false);
    const router = useRouter();
    const { data } = api.workouts.getWholeWorkout.useQuery({ id });
    const ctx = api.useContext();

    const { mutate } = api.workouts.delete.useMutation({
        onSuccess: () => {
            void ctx.workouts.getAll.invalidate();
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

    function handleDelClick(e: MouseEvent, workout: Workout) {
        e.stopPropagation();
        if (!data) return;
        mutate({ id: data.id });
    }

    function handleExpandClick() {
        setdisplayExercises(!displayExercises);
    }

    if (!data) return <p>Error</p>;

    return (
        <Card classname="flex-col border rounded-lg p-4">
            <div className="flex flex-row">
                <div onClick={handleExpandClick}><ExpandIcon classname={!displayExercises ? "-rotate-90" : ""} /></div>
                <p className="flex">{data.name}</p>
                <div className="flex ml-auto">
                    <div onClick={() => { void router.push("profile/" + data.id) }} className="cursor-pointer">
                        <EditPen />
                    </div>
                    <div onClick={(e) => { handleDelClick(e, data) }} className="cursor-pointer">
                        <Bin />
                    </div>
                </div>
            </div>
            <div className={displayExercises ? "flex flex-col ml-8" : "hidden"}>
                {data.exercises.map((exerciseRep, index) => (
                    <ExerciseRep key={data.id + index.toString()} exerciseRep={exerciseRep} />
                ))}
            </div>
        </Card>
    );
}

export default WorkoutChangeCard;