import { useState } from "react";
import Card from "./Card";
import { api } from "~/utils/api";
import { ExpandIcon } from "./Icon";
import { Workout } from "@prisma/client";

export function WorkoutList() {
    const { data } = api.workouts.getAll.useQuery();

    return (
        <div>
            {/* {data?.map((workout) => (
                <WorkoutCardSets workout={workout} />
            ))} */}
        </div>
    );
}

interface Props {
    workout: Workout;
}

export function WorkoutCardSets({ workout }: Props) {
    const [displayExercises, setDisplayExercises] = useState(false);

    return ( 
        <Card classname="flex-col border rounded-lg p-4">
            <div className="flex flex-row">
                <div onClick={() => setDisplayExercises(!displayExercises)}><ExpandIcon classname={!displayExercises? "-rotate-90" : ""} /></div>
                <p className="flex">{workout.name}</p>
            </div>
            <div className={displayExercises? "flex flex-col ml-8" : "hidden"}>
                {/* {workout.exercises.map((exerciseRep, index) => (
                    <ExerciseRepSet key={workout._id+index} exerciseRep={exerciseRep} />
                ))} */}
            </div>
        </Card>
     );
}

