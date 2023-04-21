import { MouseEventHandler } from "react";

interface Props {
    children?: React.ReactNode;
    classname?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

function Card({ children, classname, onClick }: Props) {
    return ( 
        <div onClick={onClick} className={"flex flex-row justify-between flex-wrap border rounded-lg p-4 my-1 "+classname}>
            {children}
        </div>
     );
}

export default Card;