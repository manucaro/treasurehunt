import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'manage-games',
    loadChildren: () => import('./manage-games/manage-games.module').then( m => m.ManageGamesPageModule)
  },
  {
    path: 'create-game',
    loadChildren: () => import('./create-game/create-game.module').then( m => m.CreateGamePageModule)
  },
  {
    path: 'participate-game',
    loadChildren: () => import('./participate-game/participate-game.module').then( m => m.ParticipateGamePageModule)
  },
  {
    path: 'play-game/:gameID',
    loadChildren: () => import('./play-game/play-game.module').then( m => m.PlayGamePageModule)
  },
  {
    path: 'game-results/:gameID',
    loadChildren: () => import('./game-results/game-results.module').then( m => m.GameResultsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'edit-game/:gameID',
    loadChildren: () => import('./edit-game/edit-game.module').then( m => m.EditGamePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
