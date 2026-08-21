
/// Lo que se recibe del back
export interface GetCalendarEvents {
    id: string;
    title: string;
    notes: string;
    start: string;
    end: string;
    user: {
        _id: string;
        name: string;
    }
}

export interface GetCalendarEventsResponse {
    ok: boolean;
    eventos: GetCalendarEvents[]
}

/// Para el formateo del front
export interface GetCalendarEvent {
    id: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user: {
        id: string;
        name: string;
    }
}