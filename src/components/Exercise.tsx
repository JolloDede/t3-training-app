import { Exercise } from "@prisma/client";
import Card from "./Card";
import Bin from "./Bin";
import { MouseEvent } from "react";

interface ExerciseReps {
    exercise: Exercise;
    exerciseId: string;
    repetitions: number;
    workoutId: string;
}

interface Props {
    exerciseRep: ExerciseReps;
}

function ExerciseRep({ exerciseRep }: Props) {

    return (
        <Card>
            <p>{exerciseRep.exercise.name}</p>
            <p className="justify-center mx-auto font-bold">Repetitions: {exerciseRep.repetitions}</p>
        </Card>
    );
}

export default ExerciseRep;