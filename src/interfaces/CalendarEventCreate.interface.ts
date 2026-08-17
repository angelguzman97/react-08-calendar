export interface CalendarEventPayload {
    id?: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
}

export interface EventoResponse {
    id: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user: string;
}
export interface CalendarEventResponse {
    ok: boolean;
    evento: EventoResponse
}