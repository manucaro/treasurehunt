import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-participate-game',
  templateUrl: './participate-game.page.html',
  styleUrls: ['./participate-game.page.scss'],
})
export class ParticipateGamePage implements OnInit {

  player: any = [];
  games: Array<any>;
  gamesPlayed: Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private dbService: DbService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getPlayerInfo();
    this.getGamesPlayed();
    this.getGames();
  }

  async getPlayerInfo() {
    const data = await this.dbService.getPlayer();
    return this.player = data;
  }

  checkIfPlayed(gameID) {
    return this.gamesPlayed.includes(gameID);
  }

  async getGamesPlayed() {
    const data = await this.dbService.getGamesPlayed();
    return this.gamesPlayed = data.map((x => x.payload.doc.id));
  }

  async getGames() {
    const loading = await this.loadingCtrl.create({
      message: 'Por favor, espere...'
    });
    this.presentLoading(loading);
    const data = await this.dbService.getGames();
    loading.dismiss();
    return this.games = data;
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout() {
    this.router.navigate(["/home"]);
    this.authService.doLogout()
      .then(res => {
        console.log("User logout");
      }, err => {
        console.log(err);
      })
  }
}
