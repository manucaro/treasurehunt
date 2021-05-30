import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageGamesResolverService } from './manage-games-resolver.service';

import { ManageGamesPage } from './manage-games.page';

const routes: Routes = [
  {
    path: '',
    component: ManageGamesPage,
    resolve: {
      data: ManageGamesResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageGamesPageRoutingModule {}
