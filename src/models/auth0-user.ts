export interface Auth0User {
    emails: Array<{value: string}>;
    id: string;
    app_metadata: {
        fistPumpUserId: string;
    }
}