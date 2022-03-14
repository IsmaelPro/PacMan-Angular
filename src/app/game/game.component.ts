import { Component, Input, OnInit } from '@angular/core';
import { Ghost } from '../ghosts/ghosts';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  grid = GridComponent;
  squares: any = [];
  width!: number;
  key!: any;
  ghosts!: Ghost[];

  @Input() pacmanCurrentIndex: number = 490;

  score = 0;

  constructor() {}

  ngOnInit(): void {
    this.width = 28;
    this.grid;

    this.playAudio('opening');
  }
  receivingSquares(event: any) {
    this.squares = event;
  }

  ngAfterViewChecked(): void {
    if (this.ghosts != undefined) {
      this.checkForGameOver();
    }
  }

  checkForGameOver() {
    var gameover = this.ghosts.find(
      (x) => x.currentIndex == this.pacmanCurrentIndex && x.isScared == false
    );

    if (gameover) {
      this.playAudio('death');
      this.ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      setTimeout(() => {
        alert(`Game Over\n your score was ${this.score}`);
        window.location.reload();
      }, 500);
    }
  }

  receivingPacmanCurrentIndex(event: any) {
    this.pacmanCurrentIndex = event;
    this.pacDotEaten();
    this.powerPelletEaten();
    this.checkForGameOver();
    this.checkForWin();
  }

  receivingGhosts(event: any) {
    this.ghosts = event;

    this.ghosts.forEach((ghost) => {
      this.squares[ghost.currentIndex].classList.add(ghost.className);
      this.squares[ghost.currentIndex].classList.add('ghost');
    });
  }

  pacDotEaten() {
    if (this.squares[this.pacmanCurrentIndex].classList.contains('pac-dot')) {
      this.score++;
      this.playAudio('fruit');
      this.squares[this.pacmanCurrentIndex].classList.remove('pac-dot');
    }
  }

  powerPelletEaten() {
    if (
      this.squares[this.pacmanCurrentIndex].classList.contains('power-pellet')
    ) {
      var entry = 0;
      this.score += 10;
      this.ghosts.forEach((ghost) => {
        ghost.isScared = true;
      });
      this.playAudio('powerUp');
      setTimeout(() => {
        this.unScareGhosts();
      }, 10000);

      this.squares[this.pacmanCurrentIndex].classList.remove('power-pellet');
    }
  }

  unScareGhosts(): ReturnType<typeof setTimeout> {
    var timout: any;
    this.ghosts.forEach((ghost) => {
      ghost.isScared = false;
      timout = ghost.timerId;
    });
    return timout as ReturnType<typeof setTimeout>;
  }

  checkForWin() {
    if (this.score === 274) {
      this.playAudio('victory');
      this.ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      setTimeout(() => {
        alert(`Victory\n your score was ${this.score}`);
        window.location.reload();
      }, 500);
    }
  }

  playAudio(event: string) {
    let audio = new Audio();
    if (event === 'opening') {
      audio.src = '../../assets/musics/pac-man-sound.mp3';
    }
    if (event === 'fruit') {
      audio.src = '../../assets/musics/Fruit.mp3';
      audio.volume = 0.2;
    }
    if (event === 'powerUp') {
      audio.src = '../../assets/musics/PowerUp.mp3';
      // audio.volume = 0.2;
    }
    if (event === 'death') {
      audio.src = '../../assets/musics/Death.mp3';
      audio.volume = 1;
    }
    if (event === 'victory') {
      audio.src = '../../assets/musics/victory.mp3';
      audio.volume = 1;
    }
    audio.load();
    audio.play();
  }
}
