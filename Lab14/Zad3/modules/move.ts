import {Meeting} from './meeting';
import {Action} from './action';

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