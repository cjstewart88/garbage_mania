import { Game } from './game';

export class Player {
  public currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  public direction: 'up' | 'down' | 'left' | 'right' = 'right';
  public tick = true;
  public garbageCollected = 0;
  public lastMove = (new Date).getTime();
  public delay = 100;

  private game: Game;

  constructor(game: Game) {
    this.game = game;
    document.addEventListener('keydown', (e) => this.handleInput(e));
  }

  private handleInput(event: KeyboardEvent) {
    const now = (new Date).getTime();
    if (now - this.lastMove < this.delay) {
      return;
    }
    this.lastMove = now;

    this.tick = !this.tick;

    switch(event.keyCode) {
      case 38:
        this.direction = 'up';
        if (this.currentPosition.y - 32 >= 0) {
          this.currentPosition.y -= 32;
        }
        break;
      case 39:
        this.direction = 'right';
        if (this.currentPosition.x + 32 < 800) {
          this.currentPosition.x += 32;
        }
        break;
      case 40:
        this.direction = 'down';
        if (this.currentPosition.y + 32 < 640) {
          this.currentPosition.y += 32;
        }
        break;
      case 37:
        this.direction = 'left';
        if (this.currentPosition.x - 32 >= 0) {
          this.currentPosition.x -= 32;
        }
        break;
      case 32:
        this.checkRequestedMove();
        break;
    }
  }

  private checkRequestedMove() {
    const levelMap = this.game.level;

    const row = Math.round(this.currentPosition.y/32);
    const col = Math.round(this.currentPosition.x/32);

    if (!levelMap[row] || !levelMap[row][col]) {
      return;
    }

    switch (levelMap[row][col]) {
      case 'N':
        this.game.nextLevel();
        this.currentPosition = { x: 0, y: 0 };
        break;
      case 'G':
        this.garbageCollected += 1;
        console.log(this.garbageCollected);
        this.game.level[row][col] = 'E';
        break;
    }
  }
}
