import {Meeting} from './meeting';
import {Action} from './action';
import {time} from './time';
import {move} from './move'


export interface ITimetable {
    table: Array<Meeting>,
    canBeTransferredTo(date: Date): boolean,
    busy(date: Date): boolean,
    put(meeting: Meeting): boolean,
    get(date: Date): Meeting,
    perform(actions: Array<Action>): void
  }
  
  
  export class Timetable implements ITimetable {
    constructor() {}
    table = new Array();
  
    canBeTransferredTo(date: Date) {
      const arg_time = time(date);
      if(arg_time > 1200 || arg_time < 480) return false;
      if(this.busy(date) == true) return false;
      return true;
    }
  
    busy(date: Date) {
      const arg_time = date.getTime();
      //console.log("arg time: ", arg_time);
      for (let meeting of this.table) {
        const meet_start_time = meeting.date.getTime();
        const meet_end_time = meet_start_time + (meeting.duration*60*1000);
        //console.log("Meet start and end: ", meet_start_time, meet_end_time);
        if(arg_time >= meet_start_time && arg_time <= meet_end_time) 
        {
          //console.log("BUSY");
          return true;
        }
      }
      //console.log("NOT BUSY");
      return false;
    }
  
    put(meeting: Meeting) {
      if( this.busy(meeting.date) == true ) return false;
      this.table.push(meeting);
      //console.log("Tablica: ", this.table);
      return true;
    }
  
    get(date: Date) {
      const arg_time = date.getTime();
      for (let meeting of this.table) {
        if(meeting.date.getTime() == arg_time) 
          {
            return meeting;
          }
      }
      return {title:"Empty", date: new Date(0, 0, 0, 0, 0), duration: 0};
    }
  
    perform(actions: Array<Action>) {
      for (var _c = 0; _c < actions.length; _c++) {
        const counter = _c % this.table.length;
        const action = actions[counter];
        const meeting = this.table[counter];
        const meeting_moved = move(meeting, action);
        if( this.canBeTransferredTo(meeting_moved.date) == false) continue;
        this.table.splice(counter, 1);
        this.put(meeting_moved);
      }
    }
  
  }