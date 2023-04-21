import { MouseEventHandler } from "react";

interface Props {
    children?: React.ReactNode;
    classname?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const cardClassName = "flex flex-row justify-between flex-wrap border rounded-lg p-4 my-1 ";

function Card({ children, classname, onClick }: Props) {
    const className = classname ? cardClassName+classname : cardClassName;
    return ( 
        <div onClick={onClick} className={className}>
            {children}
        </div>
     );
}

export default Card;