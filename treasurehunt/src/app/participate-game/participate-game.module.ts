import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipateGamePageRoutingModule } from './participate-game-routing.module';

import { ParticipateGamePage } from './participate-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipateGamePageRoutingModule
  ],
  declarations: [ParticipateGamePage]
})
export class ParticipateGamePageModule {}
