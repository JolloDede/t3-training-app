import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useState } from "react";
import Bin from "~/components/Bin";
import Button, { RedButton } from "~/components/Button";
import Card from "~/components/Card";
import Dropdown, { DropdownOption } from "~/components/Dropdown";
import MuscleUsageComp from "~/components/MuscleUsage";
import { MuscleUsage } from "~/server/api/routers/exercises";
import { api } from "~/utils/api";

function NewExcercisePage() {
    const [name, setName] = useState("New Exercise");
    const [errorMsg, setErrorMsg] = useState("");
    const [muscleUsageList, setMuscleUsageList] = useState<MuscleUsage[]>([]);
    const router = useRouter();
    const ctx = api.useContext();
    const { data } = api.muscles.getAll.useQuery();

    function addMusclesComp() {
        const newMuscleUsage: MuscleUsage = {
            id: "",
            name: "",
            usage: 50,
        }
        setMuscleUsageList([...muscleUsageList, newMuscleUsage])
    }

    function editMuscleComp(index: number, newMuscleUsage: MuscleUsage) {
            setMuscleUsageList(muscleUsageList.map((muscleUse, id) => {
                if (id == index) {
                    return newMuscleUsage;
                }
                return muscleUse;
            }))
    }

    function dropOptions(): DropdownOption[] {
        const result: DropdownOption[] = [];
        if (!data) return result;
        data.forEach(muscle => {
            result.push({ key: muscle.id, value: muscle.name })
        });
        return result;
    }

    const { mutate } = api.exercises.create.useMutation({
        onSuccess: () => {
            void ctx.exercises.getAll.invalidate();
            router.back();
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                setErrorMsg(errorMessage[0]);
            } else {
                setErrorMsg("Failed to post! Please try again later.");
            }
        },
    });

    function handleSaveClick() {
        mutate({ name, muscles: muscleUsageList.map(muscleUsage => { return { id: muscleUsage.id, usage: muscleUsage.usage } }) });
    }

    return (
        <form onSubmit={e => e.preventDefault()} className="border rounded-lg p-4">
            <p className="flex text-red-600">{errorMsg}</p>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold hover:border rounded-lg" />
            <br />
            <label>Muscles</label>
            <br />
            <button onClick={addMusclesComp} className="p-1 w-8 h-8 border rounded-lg">+</button>
            {muscleUsageList.map((muscleUsage, index) => (
                <MuscleUsageComp key={index} muscles={data!} id={index} muscleUsage={muscleUsage} dropOptions={dropOptions} update={editMuscleComp} />
            ))}
            <div className="mt-4">
                <Button onCLick={handleSaveClick}>Save</Button>
                <RedButton onCLick={() => router.back()}>Cancle</RedButton>
            </div>
        </form>
    );
}

export default NewExcercisePage;