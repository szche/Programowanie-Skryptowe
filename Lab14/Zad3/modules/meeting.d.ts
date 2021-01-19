export interface Meeting {
    title: string;
    date: Date;
    duration: number;
    participants?: Array<string>;
}
