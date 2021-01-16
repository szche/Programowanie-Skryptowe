import { expect } from 'chai';
import {Action, Meeting, move, time, ITimetable, Timetable} from '../module';

describe('Testy', function() {
    let timetable = new Timetable();

    it('PUT', function() {
        let meet: Meeting = {title:"Programowanie Skryptowe - Lab", date: new Date(2021, 1, 14, 14, 20), duration: 90};
        expect( timetable.put(meet) ).equal(true);

        let meet2: Meeting = {title:"Programowanie Skryptowe - Lab2", date: new Date(2021, 1, 14, 14, 20), duration: 90};
        expect( timetable.put(meet2) ).equal(false);
    }); 

  });