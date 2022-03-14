import { Ghost } from './ghosts';

describe('Ghosts', () => {
  it('should create an instance', () => {
    expect(new Ghost('blinky', 348, 250)).toBeTruthy();
  });
});
