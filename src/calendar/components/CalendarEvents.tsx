import type { EventProps } from "../../interfaces";


export const CalendarEvents = ({ event }: EventProps) => {
    const { title, user } = event;
    return (
        <>
            <strong>{title}</strong>
            <span>-{user?.name}</span>
        </>
    )
}
