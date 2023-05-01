import Link from "next/link";

interface Props {
    to: string;
    children?: React.ReactNode;
}

function HLink({ to, children }: Props) {
    return ( 
        <Link href={to} className="text-blue-600 hover:text-blue-800 hover:underline visited:text-purple-600">{children}</Link>
     );
}

export default HLink;