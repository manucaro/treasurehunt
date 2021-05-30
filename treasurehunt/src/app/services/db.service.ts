import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  getCurrentPlayer()  {
    return (firebase.auth().currentUser != null) ? firebase.auth().currentUser.uid : null;
  }

  getMyGames() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentPlayer => {
        if (currentPlayer) {
          this.snapshotChangesSubscription =
            this.afs.collection('games', ref => ref.where('player', '==', currentPlayer.uid)).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getGames() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentPlayer => {
        if (currentPlayer) {
          this.snapshotChangesSubscription =
            this.afs.collection('games').snapshotChanges().subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            });
        }
      })
    })
  }

  getGamesPlayed() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentPlayer => {
        if (currentPlayer) {
          this.snapshotChangesSubscription =
            this.afs.collection('players').doc(currentPlayer.uid).collection('games-played').snapshotChanges().subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            });
        }
      })
    })
  }

  getGame(gameID) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentPlayer => {
        if (currentPlayer) {
          this.snapshotChangesSubscription = this.afs.doc<any>('games/' + gameID).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }

  getPlayer() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentPlayer => {
        if (currentPlayer) {
          this.snapshotChangesSubscription = this.afs.doc<any>('players/' + currentPlayer.uid).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }

  createGame(value) {
    return new Promise<any>((resolve, reject) => {
      let currentPlayer = firebase.auth().currentUser;
      this.afs.collection('games').add({
        name: value.name,
        image: value.image,
        description: value.description,
        solution: value.solution,
        score: value.score,
        player: currentPlayer.uid
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  editGame(gameKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentPlayer = firebase.auth().currentUser;
      this.afs.collection('games').doc(gameKey).update(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  deleteGame(gameKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('games').doc(gameKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createGameResults(gameID, myScore, mySolution, date, description, solution, image, name) {
    return new Promise<any>((resolve, reject) => {
      let currentPlayer = firebase.auth().currentUser;
      this.afs.collection('games').doc(gameID).collection('players-played').doc(currentPlayer.uid).set({
        myscore: myScore,
        mysolution: mySolution,
        date: date,
        description: description,
        solution: solution,
        image: image,
        name: name

      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  getGameResults(gameID) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentPlayer => {
        if (currentPlayer) {
          this.snapshotChangesSubscription = this.afs.doc<any>('games/' + gameID + '/players-played/' + currentPlayer.uid).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err)
            })
        }
      })
    });
  }

  registerGameAsPlayed(gameID) {
    return new Promise<any>((resolve, reject) => {
      let currentPlayer = firebase.auth().currentUser;
      this.afs.collection('players').doc(currentPlayer.uid).collection('games-played').doc(gameID).set({})
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  updateInfoPlayer(totalPlayed, totalScore) {
    return new Promise<any>((resolve, reject) => {
      let currentPlayer = firebase.auth().currentUser;
      this.afs.collection('players').doc(currentPlayer.uid).update({
        totalplayed: totalPlayed,
        totalscore: totalScore,
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  unsubscribeOnLogOut() {
    this.snapshotChangesSubscription.unsubscribe();
  }
}