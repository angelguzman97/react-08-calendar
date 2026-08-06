
interface Event {
    title?: string;
    user?: {
        _id: string;
        name: string;
    };
}
interface EventProps {
    event: Event
}
export const CalendarEvent = ({ event }: EventProps) => {
    const { title, user } = event;
    return (
        <>
            <strong>{title}</strong>
            <span>-{user?.name}</span>
        </>
    )
}
