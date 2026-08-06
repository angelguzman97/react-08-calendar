import type { EventProps } from "../../interfaces";


export const CalendarEvent = ({ event }: EventProps) => {
    const { title, user } = event;
    return (
        <>
            <strong>{title}</strong>
            <span>-{user?.name}</span>
        </>
    )
}
