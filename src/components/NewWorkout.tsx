import { MouseEvent, useState } from "react";
import Bin from "./Bin";
import Button, { RedButton } from "./Button";
import Card from "./Card";
import Dropdown, { DropdownOption } from "./Dropdown";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ExerciseReps } from "~/server/api/routers/workouts";

interface Props {
    exitNewWorkoutView: () => void;
}

export function NewWorkout({ exitNewWorkoutView }: Props) {
    const [errorMsg, setErrorMsg] = useState("");
    const [name, setName] = useState("");
    const [exerciseRepsList, setExerciseRepsList] = useState<ExerciseReps[]>([]);
    const { data } = api.exercises.getAll.useQuery();
    const ctx = api.useContext();

    const { mutate } = api.workouts.create.useMutation({
        onSuccess: () => {
            void ctx.muscles.getAll.invalidate();
            exitNewWorkoutView();
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                setErrorMsg(errorMessage[0]);
            } else {
                setErrorMsg("Failed to post! Please try again later.");
            }
        },
    })

    function handleSaveClick() {
        mutate({ name, exerciseReps: exerciseRepsList });
    }

    function addExercise() {
        if (data && data.length == 1) {
            setExerciseRepsList([...exerciseRepsList, { exerciseId: data[0]!.id, repetitions: 10 }])
        }
    }

    function handleEditExercise(id: number, exerciseRep: ExerciseReps) {
        setExerciseRepsList(exerciseRepsList.map((exerRep, index) => {
            if (index == id) {
                return exerciseRep;
            }
            return exerRep;
        }))
    }

    function handleRemoveExercise(e: MouseEvent, id: number) {
        e.stopPropagation();
        setExerciseRepsList(exerciseRepsList.filter((exerciseRep, index) => index != id));
    }

    function dropOptions(): DropdownOption[] {
        let result: DropdownOption[] = [];
        if (!data) return result;
        for (let i = 0; i < data.length; i++) {
            result.push({ key: data[i]!.id, value: data[i]!.name })
        }
        return result;
    }

    function handleDropdownChange(id: number, option: DropdownOption, repetitions: number) {
        if (!data) return;
        const exercise = data.find(exercise => exercise.name == option.value)!;
        handleEditExercise(id, { exerciseId: option.key, repetitions: repetitions });
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <p className="flex text-red-600">{errorMsg}</p>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold hover:border rounded-lg" />
            <br />
            <label>Exercises</label>
            <br />
            <button onClick={addExercise} className="p-1 w-8 h-8 border rounded-lg">+</button>
            {exerciseRepsList.map((exerciseReps, index) => (
                <Card key={index}>
                    <Dropdown placeholder={data?.find(exercise => exercise.id == exerciseReps.exerciseId)?.name!} options={dropOptions()} onChange={(option: DropdownOption) => handleDropdownChange(index, option, exerciseReps.repetitions)} />
                    <div className="flex justify-center m-auto font-semibold">
                        <label htmlFor="rep" className="pr-1">Repetitions:</label>
                        <input id="rep" type="number" value={exerciseReps.repetitions} onChange={e => handleEditExercise(index, { exerciseId: exerciseReps.exerciseId, repetitions: parseInt(e.target.value) })} />
                    </div>
                    <div onClick={(e) => handleRemoveExercise(e, index)} className="flex mr-0 ml-auto pt-1 cursor-pointer">
                        <Bin />
                    </div>
                </Card>
            ))}
            <div className="mt-4">
                <Button onCLick={handleSaveClick}>Save</Button>
                <RedButton onCLick={() => exitNewWorkoutView()}>Cancle</RedButton>
            </div>
        </form>
    );
}