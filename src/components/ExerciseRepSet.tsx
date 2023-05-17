import { ExerciseReps } from "~/server/api/routers/workouts";
import Card from "./Card";
import { Exercise, ExercisesInWorkouts } from "@prisma/client";
import Checkbox from "./Checkbox";

interface Props {
    exerciseRep: ExercisesInWorkouts & { exercise: Exercise };
}

function ExerciseRepSet({ exerciseRep }: Props) {

    return (
        <Card>
            <p>{exerciseRep.exercise.name}</p>
            <p className="justify-center mx-auto font-bold">Repetitions: {exerciseRep.repetitions}</p>
            <div className="flex mt-2">
                <Checkbox label={"Set 1"} />
                <Checkbox label={"Set 2"} />
                <Checkbox label={"Set 3"} />
                <Checkbox label={"Set 4"} />
                <Checkbox label={"Set 5"} />
            </div>
        </Card>
    );
}

export default ExerciseRepSet;