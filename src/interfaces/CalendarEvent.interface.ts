export interface CalendarEvent {
    _id?: number;
    title: string;
    note: string;
    start: Date;
    end: Date;
    bgColor?: string;
    user?: {
        _id: string;
        name: string;
    };
};