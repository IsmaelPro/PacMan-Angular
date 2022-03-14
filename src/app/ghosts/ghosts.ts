import { DatePipe } from '@angular/common';

export class Ghost {
  forEach(arg0: (ghost: any) => void) {
    throw new Error('Method not implemented.');
  }
  currentIndex!: number;
  isScared!: boolean;
  timerId!: ReturnType<typeof setTimeout>;
  className!: string;
  startIndex!: number;
  speed!: number;
  constructor(className: string, startIndex: number, speed: number) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId;
  }
}
