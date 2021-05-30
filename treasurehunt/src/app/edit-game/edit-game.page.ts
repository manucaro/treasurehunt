import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.page.html',
  styleUrls: ['./edit-game.page.scss'],
})
export class EditGamePage implements OnInit {
  game: any = [];
  gameID = "";

  formValidation: FormGroup;

  constructor(

    public router: Router,
    private formBuilder: FormBuilder,
    private dbService: DbService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.gameID = this.route.snapshot.paramMap.get('gameID')
    this.getGame(this.gameID);
    this.resetFields();
  }

  async getGame(gameID) {
    const data = await this.dbService.getGame(gameID);
    return this.game = data;
  }

  resetFields() {

    this.formValidation = this.formBuilder.group({
      name: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
      solution: new FormControl(''),
      score: new FormControl(''),
    });
  }

  onSubmit(value) {
    if (value.name == '')
      value.name = this.game.name;
    if (value.image == '')
      value.image = this.game.image;
    if (value.description == '')
      value.description = this.game.description;
    if (value.solution == '')
      value.solution = this.game.solution;
    if (value.score == '')
      value.score = this.game.score;
    value.player = this.game.player;

    let data = {
      name: value.name,
      image: value.image,
      description: value.description,
      solution: value.solution,
      score: value.score,
      player: value.player
    }
    this.dbService.editGame(this.gameID, data)
      .then(
        res => {
          this.router.navigate(["/manage-games"]);
        }
      )
  }
}
