export interface Message {
    readonly _id?: string;
    readonly userId: string;
    readonly roomId: string;
    readonly text: string;
    readonly created: Date;
}
