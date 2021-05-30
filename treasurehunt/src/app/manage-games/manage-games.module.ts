import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageGamesPageRoutingModule } from './manage-games-routing.module';

import { ManageGamesPage } from './manage-games.page';
import { ManageGamesResolverService } from './manage-games-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageGamesPageRoutingModule
  ],
  declarations: [ManageGamesPage],
  providers: [ManageGamesResolverService]
})
export class ManageGamesPageModule {}
