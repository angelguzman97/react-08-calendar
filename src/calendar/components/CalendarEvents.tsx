import type { EventProps } from "react-big-calendar";
import type { GetCalendarEvent } from "../../interfaces";



export const CalendarEvents = ({ event }: EventProps<GetCalendarEvent>) => {
    const { title, user } = event;
    return (
        <>
            <strong>{title}</strong>
            <span>-{user?.name}</span>
        </>
    )
}
