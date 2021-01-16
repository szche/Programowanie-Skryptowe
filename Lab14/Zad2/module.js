"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timetable = exports.time = exports.move = exports.Action = void 0;
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
var Timetable = /** @class */ (function () {
    function Timetable() {
        this.table = new Array();
    }
    Timetable.prototype.canBeTransferredTo = function (date) {
        var arg_time = exports.time(date);
        if (arg_time > 1200 || arg_time < 480)
            return false;
        if (this.busy(date) == true)
            return false;
        return true;
    };
    Timetable.prototype.busy = function (date) {
        var arg_time = exports.time(date);
        for (var _i = 0, _a = this.table; _i < _a.length; _i++) {
            var meeting = _a[_i];
            var meet_start_time = exports.time(meeting.date);
            var meet_end_time = meet_start_time + meeting.duration;
            if (arg_time > meet_start_time && arg_time < meet_end_time)
                return true;
        }
        console.log("NOT BUSY");
        return false;
    };
    Timetable.prototype.put = function (meeting) {
        console.log(this.table);
        if (this.busy(meeting.date) == true)
            return false;
        this.table.push(meeting);
        console.log("Tablica: ", this.table);
        return true;
    };
    Timetable.prototype.get = function (date) {
        for (var _i = 0, _a = this.table; _i < _a.length; _i++) {
            var meeting = _a[_i];
            if (meeting.date == date)
                return meeting;
        }
        return { title: "Empty", date: new Date(0, 0, 0, 0, 0), duration: 0 };
    };
    Timetable.prototype.perform = function (actions) {
        for (var _c = 0; _c < actions.length; _c++) {
            var action = actions[_c];
            if (_c >= this.table.length)
                _c = _c % this.table.length;
            var meeting = this.table[_c];
            var meeting_moved = exports.move(meeting, action);
            if (this.canBeTransferredTo(meeting_moved.date) == false)
                continue;
            this.table.splice(_c, 1);
            this.put(meeting_moved);
        }
    };
    return Timetable;
}());
exports.Timetable = Timetable;
