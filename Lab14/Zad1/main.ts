//Zdefiniuj typ wyliczeniowy Action
enum Action {
    DAY_EARLIER,
    DAY_LATER,
    HOUR_EARLIER,
    HOUR_LATER
  }

//Korzystając z interfejsów zdefiniuj typ złożony Meeting
interface Meeting  {
    title: string;
    date: Date;
    duration: number;
    participants?: Array<string>;
}

//Zadeklaruj zmienną o nazwie meeting — ma przechowywać elementy typu Meeting, a następnie przypisz jej trzy przykładowe spotkania
let meeting: Array<Meeting> = [
  {title:"Programowanie Skryptowe", date: new Date(), duration: 90},
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

//Zadeklaruj zmienną o nazwie move i typie funkcyjnym reprezentującym funkcje o sygnaturze 
//funkcja(meeting: Meeting, action: Action) i typie zwracanej wartości Meeting, 
//a następnie przypisz jej funkcję anonimową, która realizuje operację przesuwania z 
//uwzględnieniem warunku, że spotkania mogą się odbywać w godzinach od 8:00 do 20:00
let move: (meeting: Meeting, action: Action) => Meeting = function (meet, ac) {
  //Czas rozpoczecia zajec w minutach
  const prevTime: number = meet.date.getHours() * 60 + meet.date.getMinutes();
  if( ac == Action.HOUR_LATER && prevTime+60+meet.duration < 1200 && prevTime+60 > 480) {
      meet.date.setHours( meet.date.getHours() + 1 );
  }
  else if ( ac == Action.HOUR_EARLIER && prevTime-60 > 480 && prevTime-60+meet.duration < 1200) {
    meet.date.setHours( meet.date.getHours() - 1 );
  }
  return meet;

};

for (let index in meeting) {
  move(meeting[index], actions[index]);
  console.log(meeting[index]);
}