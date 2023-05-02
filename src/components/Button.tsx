import type { MouseEventHandler } from "react";

interface Props {
  onCLick: MouseEventHandler;
  children?: React.ReactNode;
  className?: string;
}

const defaultClassname = "text-white bg-blue-700 hover:bg-blue-800 p-2 border rounded-lg ";

function Button({ onCLick, children, className }: Props) {
  if (className) {
    className = defaultClassname + className;
  }else {
    className = defaultClassname;
  }
  return (
    <button onClick={onCLick} className={className}>
      {children}
    </button>
  )
}

export function RedButton({ onCLick, children }: Props) {
  return (
    <button onClick={onCLick} className="text-white bg-red-600 hover:bg-red-700 p-2 border rounded-lg">
      {children}
    </button>
  )
}

export default Button