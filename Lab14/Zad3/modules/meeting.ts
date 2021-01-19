//Korzystając z interfejsów zdefiniuj typ złożony Meeting
export interface Meeting  {
    title: string;
    date: Date;
    duration: number;
    participants?: Array<string>;
}