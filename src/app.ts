import Cat from './Cat.js';
import KeyListener from './KeyListener.js';

class Game {
  private cat: Cat;

  private keyListener: KeyListener;

  private lastTickTimeStamp: number;

  private readonly canvas: HTMLCanvasElement;

  private readonly ctx: CanvasRenderingContext2D;

  private background: HTMLImageElement;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param canvas - Place where game elements will be written.
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.background = this.loadNewImage('img/HAPPY CAT.png');

    this.cat = new Cat(true, 10, 10, 0);
    this.keyListener = new KeyListener();

    this.startRunning();
    this.cat.meow();
  }

  /**
   * Write text to canvas.
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The text color
   * @param alignment - Where to align the text.
   */
  private writeTextToCanvas(text: string, xCoordinate: number, yCoordinate: number, fontSize = 20, color = 'red', alignment: CanvasTextAlign = 'center') {
    this.ctx.drawImage(this.background, 100, 100);
    this.ctx.font = `$${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   *
   * @param source Path to the image file to be loaded.
   * @returns An image element
   */
  // eslint-disable-next-line class-methods-use-this
  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  private clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateDisplays() {
    this.clearScreen();
    this.writeTextToCanvas(`Hunger: ${this.cat.getHunger()}`, 100, 100);
    this.writeTextToCanvas(`Energy: ${this.cat.getEnergy()}`, 300, 100);
    this.writeTextToCanvas(`Mood: ${this.cat.getMood()}`, 500, 100);
  }

  /**
   * Called for every game tick.
   */
  public gameTick() {
    if (this.cat.isAlive) {
      this.cat.ignore();

      this.keyboardInput();
    }
    this.updateDisplays();
  }

  /**
   * Function that checks if a key is being held down (during the timeTick refresh.)
   */
  private keyboardInput() {
    if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
      this.cat.play();
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.cat.sleep();
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_F)) {
      this.cat.feed();
    }
  }

  /**
   * Start the automatic updating process of this object
   */
  private startRunning() {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Check if it is time to perform the next Tick
    if (timestamp - this.lastTickTimeStamp >= 3000) {
      // Call the method of this object that needs to be called
      this.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };
}

const init = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const catGame = new Game(document.querySelector('#canvas'));
};

window.addEventListener('load', init);
