//Zdefiniuj typ wyliczeniowy Action
var Action;
(function (Action) {
    Action[Action["DAY_EARLIER"] = 0] = "DAY_EARLIER";
    Action[Action["DAY_LATER"] = 1] = "DAY_LATER";
    Action[Action["HOUR_EARLIER"] = 2] = "HOUR_EARLIER";
    Action[Action["HOUR_LATER"] = 3] = "HOUR_LATER";
})(Action || (Action = {}));
//Zadeklaruj zmienną o nazwie meeting — ma przechowywać elementy typu Meeting, a następnie przypisz jej trzy przykładowe spotkania
var meeting = [
    { title: "Programowanie Skryptowe", date: new Date(), duration: 90 },
    { title: "Fizyka 2", date: new Date(), duration: 40 },
    { title: "Systemy Operacyjne", date: new Date(), duration: 20, participants: ['Jan Kowalski', 'Adam Nowak'] }
];
console.log(meeting);
//Zadeklaruj zmienną o nazwie actions — ma przechowywać elementy typu Action, a następnie przypisz jej trzy przykładowe akcje
var actions = [
    Action.DAY_EARLIER,
    Action.HOUR_LATER,
    Action.HOUR_EARLIER
];
console.log(actions);
//Zadeklaruj zmienną o nazwie move i typie funkcyjnym reprezentującym funkcje o sygnaturze 
//funkcja(meeting: Meeting, action: Action) i typie zwracanej wartości Meeting, 
//a następnie przypisz jej funkcję anonimową, która realizuje operację przesuwania z 
//uwzględnieniem warunku, że spotkania mogą się odbywać w godzinach od 8:00 do 20:00
var move = function (meet, ac) {
    //Czas rozpoczecia zajec w minutach
    var prevTime = meet.date.getHours() * 60 + meet.date.getMinutes();
    if (ac == Action.HOUR_LATER && prevTime + 60 + meet.duration < 1200 && prevTime + 60 > 480) {
        meet.date.setHours(meet.date.getHours() + 1);
    }
    else if (ac == Action.HOUR_EARLIER && prevTime - 60 > 480 && prevTime - 60 + meet.duration < 1200) {
        console.log("SPELNIA");
        meet.date.setHours(meet.date.getHours() - 1);
    }
    return meet;
};
for (var index in meeting) {
    move(meeting[index], actions[index]);
    console.log(meeting[index]);
}
