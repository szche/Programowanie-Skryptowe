import { Meeting } from './meeting';
import { Action } from './action';
export interface ITimetable {
    table: Array<Meeting>;
    canBeTransferredTo(date: Date): boolean;
    busy(date: Date): boolean;
    put(meeting: Meeting): boolean;
    get(date: Date): Meeting;
    perform(actions: Array<Action>): void;
}
export declare class Timetable implements ITimetable {
    constructor();
    table: any[];
    canBeTransferredTo(date: Date): boolean;
    busy(date: Date): boolean;
    put(meeting: Meeting): boolean;
    get(date: Date): any;
    perform(actions: Array<Action>): void;
}
