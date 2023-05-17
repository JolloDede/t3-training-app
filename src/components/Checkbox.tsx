import { useState } from "react";
import Tick from "./Tick";

interface Props {
    label: string;
}

function Checkbox({ label }: Props) {
    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked);
    }

    return (
        <div className="flex flex-wrap justify-end mx-2">
            <label htmlFor={label+"-chbox"} className="text-center">{label}</label>
            <div className="basis-full h-0"></div>
            {/* <input type="checkbox" id={label+"-chbox"} className="w-6 h-6 accent-pink-500 text-green-600 bg-red-700" /> */}
            <button onClick={handleClick} id={label+"-chbox"} className="w-6 h-6 border rounded-md border-gray-800">{checked ? <Tick /> : ""}</button>
        </div>
    );
}

export default Checkbox;