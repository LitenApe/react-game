import Dice from './Dice';

export default class Monster {
  private static monsters = [
    'Larva',
    'Lemure',
    'Chicken',
    'Imp',
    'Quasit',
    'Rutterkin',
    'Spined Devil',
    'Bearded Devil',
    'Hell Hound',
    'Barbed Devil',
  ];

  static getMonster(): string {
    const index = Dice.roll(this.monsters.length);
    return this.monsters[index];
  }
}
