import {Page, NavController, Modal} from 'ionic-angular';

import {User} from '../../providers/user/user';

import {AddParticipantPage} from '../add-participant/add-participant'

import {GameData} from '../../providers/game-data/game-data';
import {Storage} from '../../providers/storage/storage';

@Page({
    templateUrl: 'build/pages/home/home.html',
    providers: [GameData, Storage, User]
})
export class HomePage {
    private currentWinner: any;
    public currentParticipants = [];
    public numberOfParticipants: number;

    constructor(private game:GameData,
                private nav: NavController) {
    }

    goToRegisterNew() {
        let modal = Modal.create(AddParticipantPage);
        modal.onDismiss(
                data => {
                console.log('Data from modal',data)
                this.currentParticipants.push(data);
                //this.numberOfParticipants = this.currentParticipants.length;
                console.log('this.numberOfParticipants',this.numberOfParticipants, 'this.currentParticipants', this.currentParticipants)
                }
        );
        this.nav.present(modal);
        //this.nav.push(AddParticipantPage);
    }

    calculateWinner() {
        this.game.calculateOne(this.currentParticipants).then(
            winner => {
                this.currentWinner = winner;
                console.log('this.currentWinner',this.currentWinner);
            }
        );

    }

    calculateWinningOrder() {
        this.game.calculateRandomOrder(this.currentParticipants).then(
                result => {
                    console.log("Result winning order resolved", result);
                this.currentParticipants = result;
                console.log('this results',JSON.stringify(this.currentParticipants));
            }
        );
    }

    clearAndStore() {
        this.currentParticipants = [];
        this.currentWinner = null;
    }
}
