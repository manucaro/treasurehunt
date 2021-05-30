import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-manage-games',
  templateUrl: './manage-games.page.html',
  styleUrls: ['./manage-games.page.scss'],
})
export class ManageGamesPage implements OnInit {

  games: Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dbService: DbService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Por favor, espere...'
    });
    this.presentLoading(loading);
    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.games = data;
      })
    })
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

  deleteGame(gameKey) {
    this.dbService.deleteGame(gameKey);
  }
}
