"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var module_1 = require("../module");
describe('Testy', function () {
    var meeting = [
        { title: "Programowanie Skryptowe", date: new Date(2021, 1, 14, 8, 20), duration: 90 },
        { title: "Fizyka 2", date: new Date(2021, 1, 14, 10, 20), duration: 40 },
        { title: "Systemy Operacyjne", date: new Date(2021, 1, 14, 19, 30), duration: 20, participants: ['Jan Kowalski', 'Adam Nowak'] }
    ];
    it('HOUR_EARLIER', function () {
        var meet = module_1.move(meeting[0], module_1.Action.HOUR_EARLIER);
        chai_1.expect(module_1.time(meet.date)).equal(module_1.time(new Date(2021, 1, 14, 8, 20)));
        meet = module_1.move(meeting[1], module_1.Action.HOUR_EARLIER);
        chai_1.expect(module_1.time(meet.date)).equal(module_1.time(new Date(2021, 1, 14, 9, 20)));
    });
    it('HOUR_LATER', function () {
        var meet = module_1.move(meeting[0], module_1.Action.HOUR_LATER);
        chai_1.expect(module_1.time(meet.date)).equal(module_1.time(new Date(2021, 1, 14, 9, 20)));
        meet = module_1.move(meeting[2], module_1.Action.HOUR_LATER);
        chai_1.expect(module_1.time(meet.date)).equal(module_1.time(new Date(2021, 1, 14, 19, 30)));
    });
    it('DAY_EARLIER', function () {
        var meet = module_1.move(meeting[0], module_1.Action.DAY_EARLIER);
        chai_1.expect(module_1.time(meet.date)).equal(module_1.time(new Date(2021, 1, 13, 9, 20)));
    });
    it('DAY_LATER', function () {
        var meet = module_1.move(meeting[0], module_1.Action.DAY_LATER);
        chai_1.expect(module_1.time(meet.date)).equal(module_1.time(new Date(2021, 1, 15, 9, 20)));
    });
});
