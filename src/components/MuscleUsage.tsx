import { MuscleUsage } from "~/server/api/routers/exercises";
import Dropdown, { DropdownOption } from "./Dropdown";
import { ChangeEvent } from "react";
import { api } from "~/utils/api";
import { Muscle } from "@prisma/client";

interface Props {
    muscleUsage: MuscleUsage;
    dropOptions: () => DropdownOption[];
    update: (index: number, newMuscleUsage: MuscleUsage) => void;
    id: number;
    muscles: Muscle[];
}

function MuscleUsageComp({ muscleUsage, dropOptions, update, id, muscles }: Props) {

    function handleDropdownChange(option: DropdownOption) {
        const muscle = muscles?.find(muscle => muscle.name == option.value);
        if (muscle)
            update(id, { id: muscle.id, name: muscle.name, usage: muscleUsage.usage });

        console.log("error cant handle dropdownchange");
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        update(id, { id: muscleUsage.id, name: muscleUsage.name, usage: e.target.valueAsNumber })
    }

    return (
        <div>
            <Dropdown placeholder={muscleUsage.name || "Select Muscle..."} onChange={(option: DropdownOption) => { handleDropdownChange(option) }} options={dropOptions()} />
            <div className="mt-1">
                <label>Usage Percent: </label><input type="number" value={muscleUsage.usage} onChange={e => handleChange(e)} />
            </div>
        </div>
    );
}

export default MuscleUsageComp;