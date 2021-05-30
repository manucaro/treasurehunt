import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateScoreService {

  constructor() { }

  calculate(solution: string, mySolution: string, score: string) {
    if (solution.charAt(0) == mySolution.charAt(0) && solution.charAt(1) == mySolution.charAt(1)) {
      return score;
    } else if (((+solution.charAt(0) - +mySolution.charAt(0) == 1) || (+solution.charAt(0) - +mySolution.charAt(0) == -1)) && ((+solution.charAt(1) - +mySolution.charAt(1) == 1) || (+solution.charAt(1) - +mySolution.charAt(1) == -1))) {
      return (+score * 0.5).toString();
    } else if (((+solution.charAt(0) - +mySolution.charAt(0) == 1) || (+solution.charAt(0) - +mySolution.charAt(0) == -1)) && solution.charAt(1) == mySolution.charAt(1)) {
      return (+score * 0.5).toString();
    } else if (solution.charAt(0) == mySolution.charAt(0) && ((+solution.charAt(1) - +mySolution.charAt(1) == 1) || (+solution.charAt(1) - +mySolution.charAt(1) == -1))) {
      return (+score * 0.5).toString();
    } else {
      return '0'
    }
  }
}

