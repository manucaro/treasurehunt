import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.page.html',
  styleUrls: ['./game-results.page.scss'],
})
export class GameResultsPage implements OnInit {

  gameResults: any = [];
  gameID = "";

  constructor(private dbService: DbService, private route: ActivatedRoute, public navCtrl: NavController) { }

  ngOnInit() {
    this.gameID = this.route.snapshot.paramMap.get('gameID');
    this.getGameResults();
  }

  async getGameResults() {
    const data = await this.dbService.getGameResults(this.gameID);
    return this.gameResults = data;
  }
}
