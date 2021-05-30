import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private dbService: DbService, public navCtrl: NavController, private authService: AuthService,) {}

  ngOnInit() {
    this.checkIfLogged();
  }

  checkIfLogged() {
    return this.dbService.getCurrentPlayer() != null;
  }

  navToManageGames() {
    if (this.checkIfLogged()) {
      this.navCtrl.navigateForward("/manage-games");
    } else {
      this.navToLogin();
    }
  }

  navToParticipateGame() {
    if (this.checkIfLogged()) {
      this.navCtrl.navigateForward(["/participate-game"]);
    } else {
      this.navToLogin();
    }
  }

  navToLogin() {
    this.navCtrl.navigateForward(["/login"])
  }

  logout() {
    this.authService.doLogout()
      .then(res => {
        console.log("User logout");
      }, err => {
        console.log(err);
      })
  }

}
