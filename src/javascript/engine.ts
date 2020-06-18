import { Player} from './player';
import { Game } from './game';

export class Engine {
  private imgs: any;
  private player: Player;
  private game: Game;

  private canvas: any;
  private ctx: any;

  constructor(game: Game) {
    this.imgs = game.assets.imgs;
    this.player = game.player;
    this.game = game;

    this.canvas = document.getElementById('level');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 640;

    this.animate();
  }

  private animate() {
    this.drawLevel();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  private drawLevel() {
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.clearRect(0, 0, 800, 640);

    this.game.level.forEach((row: any[], i: number) => {
      row.forEach((cellValue: number | string, ii: number) => {
        let x = ii*32;
        let y = i*32;

        // grass
        if (cellValue === '0') {
          this.ctx.fillStyle = '#228B22';
          this.ctx.fillRect(x, y, 32, 32);
          return;
        }

        // road
        if (cellValue === 'R') {
          this.ctx.fillStyle = '#fff';
          this.ctx.fillRect(x, y, 32, 32);
        }

        // garbage
        if (cellValue === 'G') {
          this.ctx.fillStyle = 'yellow';
          this.ctx.fillRect(x, y, 32, 32);
        }

        // empty garbage
        if (cellValue === 'E') {
          this.ctx.fillStyle = 'black';
          this.ctx.fillRect(x, y, 32, 32);
        }

        // next level exit
        if (cellValue === 'N') {
          this.ctx.fillStyle = 'red';
          this.ctx.fillRect(x, y, 32, 32);
        }
      });
    });
    
    this.ctx.drawImage(this.imgs.garbageTruck.element,  0, this.imgs.garbageTruck.version[this.player.direction], 32, 32, this.player.currentPosition.x, this.player.currentPosition.y, 32, 32)
    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(this.player.currentPosition.x, this.player.currentPosition.y, 32, 32);
  }
}
