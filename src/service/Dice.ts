export default class Dice {

    /**
     * roll the dice and retrieve a number between 1 and 6
     * @returns { number } number of dies
     */
    static roll(): number {
        return Math.floor(Math.random() * 6) + 1;
    }
}