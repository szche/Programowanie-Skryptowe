import { parse } from './js/parseMod';
import {Action} from './modules/action';
import {Meeting} from './modules/meeting';
import {move} from './modules/move';
import {Timetable} from './modules/timetable';
declare var process: any;
// import {parse} from './js/parse';

///<reference path='./js/parseMod.d.ts' />

let timetable = new Timetable();

function print(meet: Meeting): void {
  console.log("Spotkanie: ", meet.title);
  console.log("Dzien: ", meet.date.getDate(), meet.date.getMonth(), meet.date.getFullYear());
  console.log("Godzina rozpoczecia: ", meet.date.getHours(), meet.date.getMinutes());
  console.log("Czas trwania: ", meet.duration);
  console.log("----------------------------------");
}

console.log("Znaleziono argumenty: ", process.argv.slice(2));
let akcje: Array<Action> = parse(process.argv.slice(2));

timetable.put( {title:"Programowanie Skryptowe", date: new Date(2021, 1, 14, 12, 50), duration: 90} );
timetable.put( {title:"Fizyka 2", date: new Date(2021, 1, 15, 8, 30), duration: 90} );
timetable.put( {title:"Systemy Operacyjne", date: new Date(2021, 1, 13, 17, 30), duration: 90, participants: ['Jan Kowalski', 'Adam Nowak']} );
for (let meeting of timetable.table) {
  print(meeting);
}

console.log("\n=== WYKONUJE PERFORM ===\n");
console.log("----------------------------------");

timetable.perform(akcje);
for (let meeting of timetable.table) {
  print(meeting);
}