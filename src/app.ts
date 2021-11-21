class Catagotchi {

  private alive: boolean;

  private mood: number;

  private energy: number;

  private hunger: number;

  private gameDOM: Element;

  private displayMood: HTMLDivElement;

  private displayEnergy: HTMLDivElement;

  private displayHunger: HTMLDivElement;

  private displayStatus: HTMLDivElement;

  private lastTickTimeStamp : number;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param gameDOM pass the DOM element where the game will run.
   */
  public constructor(gameDOM : Element) {
    this.gameDOM = gameDOM;

    this.alive = true;

    this.mood = 10;
    this.energy = 10;
    this.hunger = 0;

    this.getDOMElements();
    this.updateDisplays();
    this.startRunning();
    this.meow();
  }

  /**
   * Function that feeds the catagochi
   * Decreases the hunger variable with 2 points.
   * Calls the meow() function.
   */
  public feed(): void {
    this.hunger -= 2;
    this.meow();
  }

  /**
   * Funtion that plays with the catagochi
   * Increases the mood variable with 2 points.
   * Increases the hunger variable with 1 point.
   * Decreases the energy variable with 1 point.
   * Calls the meow() function.
   */
  public play(): void {
    this.mood += 2;
    this.hunger += 1;
    this.energy -= 1;
    this.meow();
  }

  /**
   * Function that lets the catagochi sleep.
   * Increases the energy variable with 2 points.
   * Increases the hunger variable with 1 point.
   * Calls the meow() function.
   */
  public sleep(): void {
    this.energy += 2;
    this.hunger += 1;
    this.meow();
  }

  /**
   * Function that lets the catagochi make a sound.
   * Checks if the catagochi is alive before loggin "Meow" to the console.
   */
  private meow(): void {
    if (!this.alive) {
      throw new Error('Dead catagochi cannot meow.');
    } else {
      console.log('Meow')
    }
  }

  /**
   * Function that sets the Alive boolean to false when the catagochi dies.
   */
  private catDied(): void {
    this.alive = false;
  }

  /**
   * Called for every game tick.
   */
  public gameTick() {
    if (this.alive) {
      if (this.hunger >= 10 || this.energy <= 0) {
        this.catDied()
      }

      this.energy -= (Math.random() > 0.7 ? 1 : 0);
      this.hunger += (Math.random() > 0.5 ? 1: 0);
      this.mood -= (Math.random() > 0.3 ? 1 : 0);

      this.updateDisplays();
    }
  }

  /**
   * Funtion that updates all displays.
   */
  private updateDisplays(): void {
    this.displayEnergy.innerHTML = String(this.energy);
    this.displayHunger.innerHTML = String(this.hunger);
    this.displayMood.innerHTML = String(this.mood);
    this.displayStatus.innerHTML = (this.alive === true ? 'Alive' : 'Dead');
  }

  /**
   * Funtion that gets all the DOM Elements.
   */
  private getDOMElements(): void {
    this.displayHunger = this.gameDOM.querySelector('#displayHunger');
    this.displayMood = this.gameDOM.querySelector('#displayMood');
    this.displayEnergy = this.gameDOM.querySelector('#displayEnergy');
    this.displayStatus = this.gameDOM.querySelector('#displayStatus');

    this.gameDOM.querySelector('#buttonFeed').addEventListener('click', this.feed.bind(this));
    this.gameDOM.querySelector('#buttonPlay').addEventListener('click', this.play.bind(this));
    this.gameDOM.querySelector('#buttonSleep').addEventListener('click', this.sleep.bind(this));
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
  const catGame = new Catagotchi(document.querySelector('#game'));
};

window.addEventListener('load', init);
