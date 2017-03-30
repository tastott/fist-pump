
export interface Event {
    Description: string;
}

export interface EventCallback {
    (event: Event): void;
}

export interface Subscription {
    Dispose(): void;
}