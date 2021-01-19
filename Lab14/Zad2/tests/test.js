"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var module_1 = require("../module");
describe('Testy', function () {
    var timetable = new module_1.Timetable();
    it('PUT', function () {
        var meet = { title: "Programowanie Skryptowe - Lab", date: new Date(2021, 1, 14, 14, 20), duration: 90 };
        chai_1.expect(timetable.put(meet)).equal(true);
        var meet2 = { title: "Programowanie Skryptowe - Lab2", date: new Date(2021, 1, 14, 14, 20), duration: 90 };
        chai_1.expect(timetable.put(meet2)).equal(false);
        var meet3 = { title: "Systemy Operacyjne", date: new Date(2021, 1, 13, 8, 0), duration: 90 };
        chai_1.expect(timetable.put(meet3)).equal(true);
    });
    it('BUSY', function () {
        var date = new Date(2021, 1, 14, 14, 20);
        chai_1.expect(timetable.busy(date)).equal(true);
        var date2 = new Date(2021, 1, 15, 14, 20);
        chai_1.expect(timetable.busy(date2)).equal(false);
    });
    it('GET', function () {
        var date = new Date(2021, 1, 14, 14, 20);
        var meet = { title: "Programowanie Skryptowe - Lab", date: new Date(2021, 1, 14, 14, 20), duration: 90 };
        var zapytanie = timetable.get(date);
        chai_1.expect(zapytanie.title).equal("Programowanie Skryptowe - Lab");
        chai_1.expect(zapytanie.date.getTime()).equal(new Date(2021, 1, 14, 14, 20).getTime());
        chai_1.expect(zapytanie.duration).equal(90);
    });
    it('PERFORM', function () {
        var actions = [module_1.Action.DAY_EARLIER, module_1.Action.DAY_LATER, module_1.Action.HOUR_EARLIER];
        var expected_meet1 = { title: "Programowanie Skryptowe - Lab", date: new Date(2021, 1, 13, 13, 20), duration: 90 };
        var expected_meet2 = { title: "Systemy Operacyjne", date: new Date(2021, 1, 14, 8, 0), duration: 90 };
        timetable.perform(actions);
        var perform_meet1 = timetable.table[0];
        var perform_meet2 = timetable.table[1];
        chai_1.expect(perform_meet1.date.getDate()).equal(expected_meet1.date.getDate() - 1);
        chai_1.expect(perform_meet1.date.getHours()).equal(expected_meet1.date.getHours() + 1);
    });
});
