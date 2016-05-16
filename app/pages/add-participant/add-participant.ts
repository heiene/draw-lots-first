import {Page, NavController, ViewController} from 'ionic-angular';
import {User} from '../../providers/user/user';
import {GameData} from '../../providers/game-data/game-data';

/*
 Generated class for the AddParticipantPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/add-participant/add-participant.html',
    providers: [User, GameData]
})
export class AddParticipantPage {
    //user: User;
    
    constructor(private viewCtrl:ViewController,
                private user: User,
                private game: GameData) {
    }

    close() {
        if(this.user.name) {
            console.log('her')
            this.game.getGravatar(this.user.gravatarId, 200).then(
                    data => {
                    this.user.gravatarUrl = data.url;
                    this.user.color = data.color;
                }
            );
            this.viewCtrl.dismiss(this.user);
        }

        this.viewCtrl.dismiss(null);

    }

}
