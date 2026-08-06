export interface Event {
    title?: string;
    user?: {
        _id: string;
        name: string;
    };
}

export interface EventProps {
    event: Event
}