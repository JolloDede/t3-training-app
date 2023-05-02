import { MouseEvent, useEffect, useRef, useState } from "react";
import { ExpandIcon } from "./Icon";

interface Props {
    placeholder: string;
    options: DropdownOption[];
    onChange: (option: DropdownOption) => void;
}

export interface DropdownOption {
    key: string;
    value: string;
}

function Dropdown({ placeholder, options, onChange }: Props) {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState<DropdownOption | null>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: any) => {
            // Todo chang the type of the function
            // eslint-disable-next-line
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener ("click", handler);

        return () => {
            window.addEventListener("click", handler);
        }
    })

    function getDisplay() {
        if (selectedValue) {
            return selectedValue.value
        }
        return placeholder;
    }

    function itemClickHandle(option: DropdownOption) {
        setSelectedValue(option);
        onChange(option);
    }

    function isSelected(option: DropdownOption): boolean {
        if (!selectedValue) {
            return false;
        }

        return selectedValue.value == option.value;
    }

    function handleClick() {
        setShowMenu(!showMenu);
    }

    return (
        <div className="relative text-left border rounded-lg w-fit cursor-pointer">
            <div ref={inputRef} onClick={handleClick} className="flex p-2">
                <div className="pr-4 font-semibold select-none">{getDisplay()}</div>
                <div>
                    <ExpandIcon />
                </div>
            </div>
            {showMenu && (
                <div className="absolute w-full max-h-[150px] translate-y-1 overflow-y-auto border rounded-lg bg-white z-50">
                    {options.map((option) => (
                        <div key={option.key} onClick={() => itemClickHandle(option)} className={`p-2 hover:bg-blue-300 ${isSelected(option) ? "bg-blue-500" : ""} `}>
                            {option.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;