import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})
export class CreateGamePage implements OnInit {
  formValidation: FormGroup;

  constructor(

    public router: Router,
    private formBuilder: FormBuilder,
    private dbService: DbService,

  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields() {

    this.formValidation = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      solution: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    value.player = this.dbService.getCurrentPlayer();
    let data = {
      name: value.name,
      image: value.image,
      description: value.description,
      solution: value.solution,
      score: value.score,
      player: value.player
    }
    this.dbService.createGame(data)
      .then(
        res => {
          this.router.navigate(["/manage-games"]);
        }
      )
  }
}
