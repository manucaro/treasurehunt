import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipateGamePage } from './participate-game.page';

const routes: Routes = [
  {
    path: '',
    component: ParticipateGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipateGamePageRoutingModule {}
