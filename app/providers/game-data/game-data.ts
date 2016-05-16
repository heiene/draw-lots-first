import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Md5} from 'ts-md5/dist/md5';

import {COLORS} from '../../utils/colors'
import {User} from '../user/user'

/*
 Generated class for the GameData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

@Injectable()
export class GameData {

    constructor(private http: Http){}

    calculateOne(currentParticipants: Array) {
        let numberOfParticipants = currentParticipants.length;
        let oneNumber_temp = Math.random() * numberOfParticipants;
        let oneNumber = Math.floor(oneNumber_temp);

//Test to see if it is correctly randomming
//        this.test(currentParticipants);
//

        return new Promise<User>(
            resolve =>
                setTimeout(function() {
                    resolve(currentParticipants[oneNumber])
                },2000)
            )

    }


    calculateRandomOrder(curPart: Array) {
        let arr = this.randomizeArray(curPart);


        return new Promise<User[]>(
                resolve =>
                setTimeout(function() {
                    resolve(arr)
                },2000)
        );
    }

    getGravatar(email, size) {
        let gravUrl;
        let color;
        if(email) {

            let size = size || 80;
            gravUrl = 'http://www.gravatar.com/avatar/' +Md5.hashStr(email) + '?s=' + size;

        } else {
            console.log(COLORS);
            color = this.randomizeArray(COLORS)[0];
        }
        return Promise.resolve({url: gravUrl, color: color})
    }

    randomizeArray(arr: Array) {
        var currentIndex = arr.length;
        var temporaryValue;
        var randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        return arr;
    }

    test(p: Array) {
        var result = [];
        for (let j = 0; j<p.length; j++) {
            result[j] = 0;
        }

        for (let i = 0; i<100000;i++) {
            let numb = p.length;
            let oneNumber_temp = Math.random() * numb;
            let oneNumber = Math.floor(oneNumber_temp);
            result[oneNumber] +=  1;

        }
        console.log('Testing ');
    }
}

