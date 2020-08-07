export interface Room {
    readonly _id?: string;
    readonly name: string;
    readonly date: Date;
    readonly connections: Array<string>
}
