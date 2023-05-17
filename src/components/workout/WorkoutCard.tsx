import { Workout } from "@prisma/client";
import { useState } from "react";
import Card from "../Card";
import { ExpandIcon } from "../Icon";
import { api } from "~/utils/api";
import ExerciseRepSet from "../ExerciseRepSet";

interface SetProps {
    workout: Workout;
}

export function WorkoutCard({ workout }: SetProps) {
    const [displayExercises, setDisplayExercises] = useState(false);
    const { data } = api.exercises.getConToWorkout.useQuery({ workoutId: workout.id });

    return (
        <Card classname="flex-col border rounded-lg p-4">
            <div className="flex flex-row">
                <div onClick={() => setDisplayExercises(!displayExercises)}><ExpandIcon classname={!displayExercises ? "-rotate-90" : ""} /></div>
                <p className="flex">{workout.name}</p>
            </div>
            <div className={displayExercises ? "flex flex-col ml-8" : "hidden"}>
                {data?.map((exerciseRep, index) => (
                    <ExerciseRepSet key={workout.id+index.toString()} exerciseRep={exerciseRep} />
                ))}
            </div>
        </Card>
    );
}