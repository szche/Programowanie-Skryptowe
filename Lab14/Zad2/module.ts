//Zdefiniuj typ wyliczeniowy Action
export enum Action {
    DAY_EARLIER,
    DAY_LATER,
    HOUR_EARLIER,
    HOUR_LATER
  }

//Korzystając z interfejsów zdefiniuj typ złożony Meeting
export interface Meeting  {
    title: string;
    date: Date;
    duration: number;
    participants?: Array<string>;
}


//Zadeklaruj zmienną o nazwie move i typie funkcyjnym reprezentującym funkcje o sygnaturze 
//funkcja(meeting: Meeting, action: Action) i typie zwracanej wartości Meeting, 
//a następnie przypisz jej funkcję anonimową, która realizuje operację przesuwania z 
//uwzględnieniem warunku, że spotkania mogą się odbywać w godzinach od 8:00 do 20:00
export let move: (meeting: Meeting, action: Action) => Meeting = function (meet, ac) {
    //Czas rozpoczecia zajec w minutach
    const prevTime: number = meet.date.getHours() * 60 + meet.date.getMinutes();
    if( ac == Action.HOUR_LATER && prevTime+60+meet.duration < 1200 && prevTime+60 > 480) {
        meet.date.setHours( meet.date.getHours() + 1 );
    }
    else if ( ac == Action.HOUR_EARLIER && prevTime-60 > 480 && prevTime-60+meet.duration < 1200) {
      meet.date.setHours( meet.date.getHours() - 1 );
    }
    else if ( ac == Action.DAY_EARLIER) {
      meet.date.setHours( meet.date.getHours() - 24 );
    }
    else {
      meet.date.setHours( meet.date.getHours() + 24 );
    }
    return meet;
  
  };


export let time: (meeting: Date) => number = function (meet) {
    return meet.getHours() * 60 + meet.getMinutes();
};
  

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