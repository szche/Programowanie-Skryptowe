import {Action, Meeting, move} from './module';

//Zadeklaruj zmienną o nazwie meeting — ma przechowywać elementy typu Meeting, a następnie przypisz jej trzy przykładowe spotkania
let meeting: Array<Meeting> = [
  {title:"Programowanie Skryptowe", date: new Date(2021, 1, 14, 8, 20), duration: 90},
  {title:"Fizyka 2", date: new Date(), duration: 40},
  {title:"Systemy Operacyjne", date: new Date(), duration: 20, participants: ['Jan Kowalski', 'Adam Nowak']}
];
console.log(meeting);

//Zadeklaruj zmienną o nazwie actions — ma przechowywać elementy typu Action, a następnie przypisz jej trzy przykładowe akcje
let actions: Array<Action> = [
  Action.DAY_EARLIER,
  Action.HOUR_LATER,
  Action.HOUR_EARLIER
];
console.log(actions);

for (let index in meeting) {
  move(meeting[index], actions[index]);
  console.log(meeting[index]);
}