import { Workout } from "@prisma/client";
import { useState } from "react";
import Card from "../Card";
import { ExpandIcon } from "../Icon";

interface SetProps {
    workout: Workout;
}

export function WorkoutCard({ workout }: SetProps) {
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