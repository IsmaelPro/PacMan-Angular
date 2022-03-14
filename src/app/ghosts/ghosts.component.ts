import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ghost } from './ghosts';

@Component({
  selector: 'app-ghosts',
  templateUrl: './ghosts.component.html',
  styleUrls: ['./ghosts.component.scss'],
})
export class GhostComponent implements OnInit {
  @Input() squares: any = [];

  @Input() width: number = 0;

  @Output() responseEmitter: EventEmitter<Ghost[]> = new EventEmitter();

  ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500),
  ];
  constructor() {}

  ngOnInit(): void {
    const moveGhost = (ghost: Ghost) => {
      const directions = [-1, +1, this.width, -this.width];
      let direction = directions[Math.floor(Math.random() * directions.length)];

      ghost.timerId = setInterval(() => {
        //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
        if (
          !this.squares[ghost.currentIndex + direction].classList.contains(
            'ghost'
          ) &&
          !this.squares[ghost.currentIndex + direction].classList.contains(
            'wall'
          )
        ) {
          //remove the ghosts classes
          this.squares[ghost.currentIndex].classList.remove(ghost.className);
          this.squares[ghost.currentIndex].classList.remove(
            'ghost',
            'scared-ghost'
          );
          //move into that space
          ghost.currentIndex += direction;
          this.squares[ghost.currentIndex].classList.add(
            ghost.className,
            'ghost'
          );

          this.responseEmitter.emit(this.ghosts);
          //else find a new random direction ot go in
        } else {
          direction = directions[Math.floor(Math.random() * directions.length)];
          this.responseEmitter.emit(this.ghosts);
        }
        //if the ghost is currently scared
        if (ghost.isScared) {
          this.squares[ghost.currentIndex].classList.add('scared-ghost');
        }
        //if the ghost is currently scared and pacman is on it
        if (
          ghost.isScared &&
          this.squares[ghost.currentIndex].classList.contains('pac-man')
        ) {
          let audio = new Audio('../../assets/musics/ghosts-scared.mp3');
          audio.play();
          this.squares[ghost.currentIndex].classList.remove(
            ghost.className,
            'ghost',
            'scared-ghost'
          );
          ghost.currentIndex = ghost.startIndex;

          this.squares[ghost.currentIndex].classList.add(
            ghost.className,
            'ghost'
          );
        }
      }, ghost.speed);
    };
    this.ghosts.forEach((ghost) => moveGhost(ghost));
  }
}
