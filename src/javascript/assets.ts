export class Assets {
  public imgs:any = {
    ground: { path: './images/ground.png', element: null }
  }

  private loadedImgs = 0;
  private numberOfImgs = Object.keys(this.imgs).length;

  constructor(finishedLoadingAssets: any) {
    for (const key in this.imgs) {
      const img = this.imgs[key];

      img.element = new Image();
      img.element.src = img.path;

      img.element.onload = () => {
        if (++this.loadedImgs === this.numberOfImgs) {
          finishedLoadingAssets();
        }
      }

    }
  }
}
