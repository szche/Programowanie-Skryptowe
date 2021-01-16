import { expect } from 'chai';
import {Action, Meeting, move, time} from '../module';

describe('Testy', function() {

    let meeting: Array<Meeting> = [
        {title:"Programowanie Skryptowe", date: new Date(2021, 1, 14, 8, 20), duration: 90},
        {title:"Fizyka 2", date: new Date(2021, 1, 14, 10, 20), duration: 40},
        {title:"Systemy Operacyjne", date: new Date(2021, 1, 14, 19, 30), duration: 20, participants: ['Jan Kowalski', 'Adam Nowak']}
    ];

    it('HOUR_EARLIER', function() {
        let meet = move(meeting[0], Action.HOUR_EARLIER);
        expect( time(meet.date) ).equal( time(new Date(2021, 1, 14, 8, 20)) );

        meet = move(meeting[1], Action.HOUR_EARLIER);
        expect( time(meet.date) ).equal( time(new Date(2021, 1, 14, 9, 20)) );
    }); 

    it('HOUR_LATER', function() {
        let meet = move(meeting[0], Action.HOUR_LATER);
        expect( time(meet.date) ).equal( time(new Date(2021, 1, 14, 9, 20)) );

        meet = move(meeting[2], Action.HOUR_LATER);
        expect( time(meet.date) ).equal( time(new Date(2021, 1, 14, 19, 30)) );
    }); 

    it('DAY_EARLIER', function() {
        let meet = move(meeting[0], Action.DAY_EARLIER);
        expect( time(meet.date) ).equal( time(new Date(2021, 1, 13, 9, 20)) );
    }); 

    it('DAY_LATER', function() {
        let meet = move(meeting[0], Action.DAY_LATER);
        expect( time(meet.date) ).equal( time(new Date(2021, 1, 15, 9, 20)) );
    }); 

    

  });