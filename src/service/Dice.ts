export default class Dice {
  /**
   * roll the dice and retrieve a number between 1 and max,
   * which defaults to 6
   * @param { number } max the highest number possible to roll.
   * @returns { number } number of dies
   */
  static roll(max = 6): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
