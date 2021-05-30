import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CalculateScoreService } from '../services/calculate-score.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.page.html',
  styleUrls: ['./play-game.page.scss'],
})
export class PlayGamePage implements OnInit {
  formValidation: FormGroup;
  errorMessage: string = '';

  formValidationMessages = {
    'mysolution': [
      { type: 'required', message: 'Se debe dar una solución' },
      { type: 'minlength', message: 'La solución debe de ser de 2 dígitos de longitud' },
      { type: 'maxlength', message: 'La solución debe de ser de 2 dígitos de longitud' },
      { type: 'pattern', message: 'Debe ser numérico' },
    ]
  };

  game: any = [];
  player: any = [];
  gameID = "";
  mySolution = "";
  myScore = "";

  constructor(
    private route: ActivatedRoute,
    private dbService: DbService,
    private calculateScore: CalculateScoreService,
    private formBuilder: FormBuilder,
    public router: Router,
    public alertController: AlertController,
    private datePipe: DatePipe,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.resetFields();
    this.gameID = this.route.snapshot.paramMap.get('gameID');
    this.getGame(this.gameID);
    this.getPlayer();
  }

  async getGame(gameID) {
    const data = await this.dbService.getGame(gameID);
    return this.game = data;
  }

  async getPlayer() {
    const data = await this.dbService.getPlayer();
    return this.player = data;
  }

  resetFields() {
    this.formValidation = this.formBuilder.group({
      mysolution: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(2),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]))
    });
  }

  onSubmit(value) {
    this.myScore = this.calculateScore.calculate(this.game.solution, value.mysolution, this.game.score);
    this.dbService.createGameResults(this.gameID, this.myScore, value.mysolution, this.datePipe.transform(new Date(), 'dd-MM-yyyy'), this.game.description, this.game.solution, this.game.image, this.game.name);
    this.dbService.registerGameAsPlayed(this.gameID);

    this.dbService.updateInfoPlayer((+this.player.totalplayed + 1).toString(), (+this.player.totalscore + +this.myScore).toString());

    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Puntuación: '.concat(this.myScore),
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

    this.router.navigate(["/home"]);
  }
}
