import { MouseEvent, useState } from "react";
import Card from "./Card";
import { api } from "~/utils/api";
import { ExpandIcon } from "./Icon";
import { Workout } from "@prisma/client";
import Bin from "./Bin";
import Button, { RedButton } from "./Button";
import Dropdown, { DropdownOption } from "./Dropdown";
import EditPen from "./EditPen";
import { useRouter } from "next/router";
import ExerciseRep from "./Exercise";

export function WorkoutList() {
    const { data } = api.workouts.getAll.useQuery();

    return (
        <div>
            {data?.map((workout) => (
                <WorkoutCardSets key={workout.id} workout={workout} />
            ))}
        </div>
    );
}

interface SetProps {
    workout: Workout;
}

export function WorkoutCardSets({ workout }: SetProps) {
    const [displayExercises, setDisplayExercises] = useState(false);

    return (
        <Card classname="flex-col border rounded-lg p-4">
            <div className="flex flex-row">
                <div onClick={() => setDisplayExercises(!displayExercises)}><ExpandIcon classname={!displayExercises ? "-rotate-90" : ""} /></div>
                <p className="flex">{workout.name}</p>
            </div>
            <div className={displayExercises ? "flex flex-col ml-8" : "hidden"}>
                {/* {workout.exercises.map((exerciseRep, index) => (
                    <ExerciseRepSet key={workout._id+index} exerciseRep={exerciseRep} />
                ))} */}
            </div>
        </Card>
    );
}

interface CardProps {
    id: string;
}

function WorkoutCard({ id }: CardProps) {
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

export default WorkoutCard;