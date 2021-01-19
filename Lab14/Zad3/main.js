"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseMod_1 = require("./js/parseMod");
var timetable_1 = require("./modules/timetable");
// import {parse} from './js/parse';
///<reference path='./js/parseMod.d.ts' />
var timetable = new timetable_1.Timetable();
function print(meet) {
    console.log("Spotkanie: ", meet.title);
    console.log("Dzien: ", meet.date.getDate(), meet.date.getMonth(), meet.date.getFullYear());
    console.log("Godzina rozpoczecia: ", meet.date.getHours(), meet.date.getMinutes());
    console.log("Czas trwania: ", meet.duration);
    console.log("----------------------------------");
}
console.log("Znaleziono argumenty: ", process.argv.slice(2));
var akcje = parseMod_1.parse(process.argv.slice(2));
timetable.put({ title: "Programowanie Skryptowe", date: new Date(2021, 1, 14, 12, 50), duration: 90 });
timetable.put({ title: "Fizyka 2", date: new Date(2021, 1, 15, 8, 30), duration: 90 });
timetable.put({ title: "Systemy Operacyjne", date: new Date(2021, 1, 13, 17, 30), duration: 90, participants: ['Jan Kowalski', 'Adam Nowak'] });
for (var _i = 0, _a = timetable.table; _i < _a.length; _i++) {
    var meeting = _a[_i];
    print(meeting);
}
console.log("\n=== WYKONUJE PERFORM ===\n");
console.log("----------------------------------");
timetable.perform(akcje);
for (var _b = 0, _c = timetable.table; _b < _c.length; _b++) {
    var meeting = _c[_b];
    print(meeting);
}
