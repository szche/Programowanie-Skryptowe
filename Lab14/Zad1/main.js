"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("./module");
//Zadeklaruj zmienną o nazwie meeting — ma przechowywać elementy typu Meeting, a następnie przypisz jej trzy przykładowe spotkania
var meeting = [
    { title: "Programowanie Skryptowe", date: new Date(2021, 1, 14, 8, 20), duration: 90 },
    { title: "Fizyka 2", date: new Date(), duration: 40 },
    { title: "Systemy Operacyjne", date: new Date(), duration: 20, participants: ['Jan Kowalski', 'Adam Nowak'] }
];
console.log(meeting);
//Zadeklaruj zmienną o nazwie actions — ma przechowywać elementy typu Action, a następnie przypisz jej trzy przykładowe akcje
var actions = [
    module_1.Action.DAY_EARLIER,
    module_1.Action.HOUR_LATER,
    module_1.Action.HOUR_EARLIER
];
console.log(actions);
for (var index in meeting) {
    module_1.move(meeting[index], actions[index]);
    console.log(meeting[index]);
}
