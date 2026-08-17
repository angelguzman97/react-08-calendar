import { parseISO } from "date-fns";
import type { GetCalendarEvent, GetCalendarEvents } from "../interfaces";

export const convertEventsToDateEvents = (events: GetCalendarEvents[] = []
): GetCalendarEvent[] => {


    return events.map((event) => ({
        ...event,
        start: parseISO(event.start),
        end: parseISO(event.end)
    }));
}