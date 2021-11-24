import Cat from './Cat.js';
import KeyListener from './KeyListener.js';

class Catagotchi {
  private cat: Cat;

  private gameDOM: Element;

  private keyListener: KeyListener

  private displayMood: HTMLDivElement;

  private displayEnergy: HTMLDivElement;

  private displayHunger: HTMLDivElement;

  private displayStatus: HTMLDivElement;

  private lastTickTimeStamp: number;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param gameDOM pass the DOM element where the game will run.
   */
  public constructor(gameDOM: Element) {
    this.gameDOM = gameDOM;

    this.cat = new Cat(true, 10, 10, 0);
    this.keyListener = new KeyListener();

    this.getDOMElements();
    this.updateDisplays();
    this.startRunning();
    this.cat.meow();
  }

  /**
   * Called for every game tick.
   */
  public gameTick() {
    if (this.cat.isAlive) {
      this.cat.ignore();

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
    this.updateDisplays();
  }

  /**
   * Funtion that updates all displays
   */
  private updateDisplays(): void {
    this.displayEnergy.innerHTML = String(this.cat.getEnergy());
    this.displayHunger.innerHTML = String(this.cat.getHunger());
    this.displayMood.innerHTML = String(this.cat.getMood());
    this.displayStatus.innerHTML = this.cat.isAlive() === true ? 'Alive' : 'Dead';
  }

  /**
   * Funtion that gets all the DOM Elements.
   */
  private getDOMElements(): void {
    this.displayHunger = this.gameDOM.querySelector('#displayHunger');
    this.displayMood = this.gameDOM.querySelector('#displayMood');
    this.displayEnergy = this.gameDOM.querySelector('#displayEnergy');
    this.displayStatus = this.gameDOM.querySelector('#displayStatus');
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
  const catGame = new Catagotchi(document.querySelector('#game'));
};

window.addEventListener('load', init);
