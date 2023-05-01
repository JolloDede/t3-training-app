interface Props {
    children: React.ReactNode;
}

export function PageTitle({ children }: Props) {
    return (
        <h1 className='text-3xl font-bold'>{children}</h1>
    )
}

export function SecondTitle({ children }: Props) {
    return (
        <h1 className='text-2xl font-bold'>{children}</h1>
    )
}
