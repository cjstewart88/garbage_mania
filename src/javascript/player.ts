import { Game } from './game';

export class Player {
  public currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  public garbageCollected = 0;

  private game: Game;

  constructor(game: Game) {
    this.game = game;
    document.addEventListener('keydown', (e) => this.handleInput(e));
  }

  private handleInput(event: KeyboardEvent) {
    switch(event.keyCode) {
      case 38:
        //up
        if (this.currentPosition.y - 16 >= 0) {
          this.currentPosition.y -= 16;
        }
        break;
      case 39:
        //right
        if (this.currentPosition.x + 16 < 800) {
          this.currentPosition.x += 16;
        }
        break;
      case 40:
        // down
        if (this.currentPosition.y + 16 < 640) {
          this.currentPosition.y += 16;
        }
        break;
      case 37:
        // left
        if (this.currentPosition.x - 16 >= 0) {
          this.currentPosition.x -= 16;
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
