export class Assets {
  public imgs:any = {
    garbageTruck: { path: './images/garbage-truck.png', element: null, version: { right: 0, left: 47, up: 95, down: 160 } }
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
