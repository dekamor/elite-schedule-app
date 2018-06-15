import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  favourites = [
    {
      team: {id: 6182, name: 'HC Elite 7th', coach: 'Steve Michelotti'},
      tournamentId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
      tournamentName: 'March Madness Tournament',
    },
    {
      team: {id: 805, name: 'HC Elite', coach: 'Michelotti'},
      tournamentId: '98c6847e-b0d1-4295-b89e-2d95a45437f2',
      tournamentName: 'Holiday Hoops Challenge',
    }
  ];
  constructor(
    private nav: NavController,
    private loadingController: LoadingController,
    private eliteApi: EliteApi) {}

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }

  favouriteTapped($event, favourite){
    let loader = this.loadingController.create({
      content: "Getting data...",
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favourite.tournamentID)
      .subscribe(t => this.nav.push(TeamHomePage, favourite.team));
  }
}
