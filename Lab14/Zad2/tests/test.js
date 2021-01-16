"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var module_1 = require("../module");
describe('Testy', function () {
    var timetable = new module_1.Timetable();
    it('PUT', function () {
        var meet = { title: "Programowanie Skryptowe - Lab", date: new Date(2021, 1, 14, 14, 20), duration: 90 };
        chai_1.expect(timetable.put(meet)).equal(true);
        // let meet2: Meeting = {title:"Programowanie Skryptowe - Lab", date: new Date(2021, 1, 14, 14, 20), duration: 90};
        // expect( timetable.put(meet2) ).equal(false);
    });
});
