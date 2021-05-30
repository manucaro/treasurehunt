import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayGamePageRoutingModule } from './play-game-routing.module';

import { PlayGamePage } from './play-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlayGamePageRoutingModule
  ],
  declarations: [PlayGamePage],
  providers: [
    DatePipe
  ]
})
export class PlayGamePageModule {}
