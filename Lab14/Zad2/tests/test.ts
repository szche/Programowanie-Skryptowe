import { expect } from 'chai';
import {Action, Meeting, move, time, ITimetable, Timetable} from '../module';

describe('Testy', function() {
    let timetable = new Timetable();

    it('PUT', function() {
        let meet: Meeting = {title:"Programowanie Skryptowe - Lab", date: new Date(2021, 1, 14, 14, 20), duration: 90};
        expect( timetable.put(meet) ).equal(true);

        let meet2: Meeting = {title:"Programowanie Skryptowe - Lab2", date: new Date(2021, 1, 14, 14, 20), duration: 90};
        expect( timetable.put(meet2) ).equal(false);

        let meet3: Meeting = {title:"Systemy Operacyjne", date: new Date(2021, 1, 13, 8, 0), duration: 90};
        expect( timetable.put(meet3) ).equal(true);
    }); 


    it('BUSY', function() {
        let date = new Date(2021, 1, 14, 14, 20);
        expect( timetable.busy(date) ).equal(true);

        let date2 = new Date(2021, 1, 15, 14, 20);
        expect( timetable.busy(date2) ).equal(false);
    }); 

    it('GET', function() {
        let date = new Date(2021, 1, 14, 14, 20);
        let meet: Meeting = {title:"Programowanie Skryptowe - Lab", date: new Date(2021, 1, 14, 14, 20), duration: 90};
        const zapytanie: Meeting = timetable.get(date);

        expect( zapytanie.title ).equal( "Programowanie Skryptowe - Lab" );
        expect( zapytanie.date.getTime() ).equal( new Date(2021, 1, 14, 14, 20).getTime() );
        expect( zapytanie.duration ).equal( 90 );
    }); 

    it('PERFORM', function() {
        const actions: Array<Action> = [Action.DAY_EARLIER, Action.DAY_LATER, Action.HOUR_EARLIER];
        const expected_meet1: Meeting = {title:"Programowanie Skryptowe - Lab", date: new Date(2021, 1, 12, 13, 20), duration: 90};
        const expected_meet2: Meeting = {title:"Systemy Operacyjne", date: new Date(2021, 1, 14, 8, 0), duration: 90};

        timetable.perform(actions);
        const perform_meet1 = timetable.table[0];
        const perform_meet2 = timetable.table[1];

        expect( perform_meet1.date.getDate() ).equal( expected_meet1.date.getDate() );
        expect( perform_meet2.date.getDate() ).equal( expected_meet2.date.getDate() );

    });

  });