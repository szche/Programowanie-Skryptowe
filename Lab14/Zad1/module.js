"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.time = exports.move = exports.Action = void 0;
//Zdefiniuj typ wyliczeniowy Action
var Action;
(function (Action) {
    Action[Action["DAY_EARLIER"] = 0] = "DAY_EARLIER";
    Action[Action["DAY_LATER"] = 1] = "DAY_LATER";
    Action[Action["HOUR_EARLIER"] = 2] = "HOUR_EARLIER";
    Action[Action["HOUR_LATER"] = 3] = "HOUR_LATER";
})(Action = exports.Action || (exports.Action = {}));
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
        meet.date.setHours(meet.date.getHours() - 1);
    }
    else if (ac == Action.DAY_EARLIER) {
        meet.date.setHours(meet.date.getHours() - 24);
    }
    else {
        meet.date.setHours(meet.date.getHours() - 24);
    }
    return meet;
};
exports.move = move;
var time = function (meet) {
    return meet.getHours() * 60 + meet.getMinutes();
};
exports.time = time;
