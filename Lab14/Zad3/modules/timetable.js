"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timetable = void 0;
var time_1 = require("./time");
var move_1 = require("./move");
var Timetable = /** @class */ (function () {
    function Timetable() {
        this.table = new Array();
    }
    Timetable.prototype.canBeTransferredTo = function (date) {
        var arg_time = time_1.time(date);
        if (arg_time > 1200 || arg_time < 480)
            return false;
        if (this.busy(date) == true)
            return false;
        return true;
    };
    Timetable.prototype.busy = function (date) {
        var arg_time = date.getTime();
        //console.log("arg time: ", arg_time);
        for (var _i = 0, _a = this.table; _i < _a.length; _i++) {
            var meeting = _a[_i];
            var meet_start_time = meeting.date.getTime();
            var meet_end_time = meet_start_time + (meeting.duration * 60 * 1000);
            //console.log("Meet start and end: ", meet_start_time, meet_end_time);
            if (arg_time >= meet_start_time && arg_time <= meet_end_time) {
                //console.log("BUSY");
                return true;
            }
        }
        //console.log("NOT BUSY");
        return false;
    };
    Timetable.prototype.put = function (meeting) {
        if (this.busy(meeting.date) == true)
            return false;
        this.table.push(meeting);
        //console.log("Tablica: ", this.table);
        return true;
    };
    Timetable.prototype.get = function (date) {
        var arg_time = date.getTime();
        for (var _i = 0, _a = this.table; _i < _a.length; _i++) {
            var meeting = _a[_i];
            if (meeting.date.getTime() == arg_time) {
                return meeting;
            }
        }
        return { title: "Empty", date: new Date(0, 0, 0, 0, 0), duration: 0 };
    };
    Timetable.prototype.perform = function (actions) {
        for (var _c = 0; _c < actions.length; _c++) {
            var counter = _c % this.table.length;
            var action = actions[counter];
            var meeting = this.table[counter];
            var meeting_moved = move_1.move(meeting, action);
            if (this.canBeTransferredTo(meeting_moved.date) == false)
                continue;
            this.table.splice(counter, 1);
            this.put(meeting_moved);
        }
    };
    return Timetable;
}());
exports.Timetable = Timetable;
