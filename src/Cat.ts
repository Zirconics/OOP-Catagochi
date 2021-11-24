export default class Cat {
  private alive: boolean;

  private mood: number;

  private energy: number;

  private hunger: number;

  /**
   * Constructer that creates a new instance of Cat.
   *
   * @param alive Variable that depicts if the Cat is alive.
   * @param mood Variable that depicts the mood of the Cat.
   * @param energy Variable that depicts the energy the Cat has.
   * @param hunger Variable that depicts the hunger the Cat has.
   */
  public constructor(alive: boolean, mood: number, energy: number, hunger: number) {
    this.alive = alive;
    this.mood = mood;
    this.energy = energy;
    this.hunger = hunger;
  }

  /**
   * Function that lets the catagochi make a sound.
   * Checks if the catagochi is alive before logging "Meow" to the console.
   */
  public meow(): void {
    if (!this.alive) {
      throw new Error('Dead catagochi cannot meow.');
    } else {
      console.log('Meow');
    }
  }

  /**
   * Function that feeds the catagochi
   * Decreases the hunger variable with 2 points.
   * Calls the meow() function.
   */
  public feed = (): void => {
    this.hunger -= 2;
    this.meow();
  };

  /**
   * Funtion that plays with the catagochi
   * Increases the mood variable with 2 points.
   * Increases the hunger variable with 1 point.
   * Decreases the energy variable with 1 point.
   * Calls the meow() function.
   */
  public play = (): void => {
    this.mood += 2;
    this.hunger += 1;
    this.energy -= 1;
    this.meow();
  };

  /**
   * Function that lets the catagochi sleep.
   * Increases the energy variable with 2 points.
   * Increases the hunger variable with 1 point.
   * Calls the meow() function.
   */
  public sleep = (): void => {
    this.energy += 2;
    this.hunger += 1;
    this.meow();
  };

  /**
   * Function that sets the Alive boolean to false when the catagochi dies.
   */
  private catDied(): void {
    this.alive = false;
    console.log('Catagochi died');
  }

  /**
   * ttaaagsdgfg
   */
  public ignore(): void {
    if (this.hunger >= 10 || this.energy <= 0) {
      this.catDied();
    }

    this.energy -= (Math.random() > 0.7 ? 1 : 0);
    this.hunger += (Math.random() > 0.5 ? 1 : 0);
    this.mood -= (Math.random() > 0.3 ? 1 : 0);
  }

  /**
   * Getters and Setters
   */

  /**
   *
   * @returns Return the energy value;
   */
  public getEnergy(): number {
    return this.energy;
  }

  /**
   *
   * @param energy Sets the value of the variable energy.
   */
  public setEnergy(energy: number): void {
    this.energy = energy;
  }

  /**
   *
   * @returns Returns the mood value.
   */
  public getMood(): number {
    return this.mood;
  }

  /**
   *
   * @param mood Sets the value of the variable mood.
   */
  public setMood(mood: number): void {
    this.mood = mood;
  }

  /**
   *
   * @returns Return the hunger value.
   */
  public getHunger(): number {
    return this.hunger;
  }

  /**
   *
   * @param hunger Sets the value of the variable hunger.
   */
  public setHunger(hunger: number): void {
    this.hunger = hunger;
  }

  /**
   *
   * @returns Retruns alive is true or false.
   */
  public isAlive(): boolean {
    return this.alive;
  }
}
