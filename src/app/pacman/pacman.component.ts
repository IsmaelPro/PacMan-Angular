import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pacman',
  templateUrl: './pacman.component.html',
  styleUrls: ['./pacman.component.scss'],
})
export class PacmanComponent implements OnInit {
  @Input() squares: any = [];
  @Input() width!: number;
  @Output() responseEmitter: EventEmitter<number> = new EventEmitter();
  pacmanCurrentIndex: number = 490;
  key!: any;
  e!: EventTarget;
  constructor() {}

  ngOnInit(): void {
    this.squares[this.pacmanCurrentIndex].classList.add('pac-man');
    const width = 28;
    const movePacman = (e: any) => {
      this.squares[this.pacmanCurrentIndex].classList.remove('pac-man');
      switch (e.keyCode) {
        case 37:
          if (
            this.pacmanCurrentIndex % width !== 0 &&
            !this.squares[this.pacmanCurrentIndex - 1].classList.contains(
              'wall'
            ) &&
            !this.squares[this.pacmanCurrentIndex - 1].classList.contains(
              'ghost-lair'
            )
          )
            this.pacmanCurrentIndex -= 1;
          if (this.squares[this.pacmanCurrentIndex - 1] === this.squares[363]) {
            this.pacmanCurrentIndex = 391;
          }
          break;
        case 38:
          if (
            this.pacmanCurrentIndex - width >= 0 &&
            !this.squares[this.pacmanCurrentIndex - width].classList.contains(
              'wall'
            ) &&
            !this.squares[this.pacmanCurrentIndex - width].classList.contains(
              'ghost-lair'
            )
          )
            this.pacmanCurrentIndex -= width;
          break;
        case 39:
          if (
            this.pacmanCurrentIndex % width < width - 1 &&
            !this.squares[this.pacmanCurrentIndex + 1].classList.contains(
              'wall'
            ) &&
            !this.squares[this.pacmanCurrentIndex + 1].classList.contains(
              'ghost-lair'
            )
          )
            this.pacmanCurrentIndex += 1;
          if (this.squares[this.pacmanCurrentIndex + 1] === this.squares[392]) {
            this.pacmanCurrentIndex = 364;
          }
          break;
        case 40:
          if (
            this.pacmanCurrentIndex + width < width * width &&
            !this.squares[this.pacmanCurrentIndex + width].classList.contains(
              'wall'
            ) &&
            !this.squares[this.pacmanCurrentIndex + width].classList.contains(
              'ghost-lair'
            )
          )
            this.pacmanCurrentIndex += width;
          break;
      }
      this.squares[this.pacmanCurrentIndex].classList.add('pac-man');
      this.responseEmitter.emit(this.pacmanCurrentIndex);
    };
    document.addEventListener('keyup', movePacman);
  }
}
