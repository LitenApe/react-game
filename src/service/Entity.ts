import Dice from './Dice';

interface IEntity {
  getDamage(): number;
  getHealth(): number;

  setHealth(attack: number): number;
  heal(): void;

  levelUp(): void;
}

export default class Entity implements IEntity {
  private damage = 1;
  private health = 10;

  constructor(damage = 1, health = 10) {
    this.damage = damage;
    this.health = health;
  }

  /**
   * Calculates attack damage, including critical hit
   * @returns { number } attack damage
   */
  getDamage() {
    const dies = Dice.roll();
    return dies === 6 ? this.damage * 2 : this.damage;
  }

  /**
   * Retrieves current health
   * @returns { number } current health
   */
  getHealth() {
    return this.health;
  }

  /**
   * Attack the entity
   * @param { number } attack attacks the given entity
   * @returns remaining health
   */
  setHealth(attack: number) {
    this.health = this.health - attack;

    if (this.health < 0) {
      this.health = 0;
    } else if (Dice.roll() >= 5) {
      this.heal();
    }

    return this.health;
  }

  /**
   * Heals the entity
   */
  heal() {
    const dies = Dice.roll();
    this.health =
      dies >= 5 ? this.damage + this.health : this.damage * 2 + this.health;
  }

  /**
   * increases stats
   */
  levelUp() {
    const dies = Dice.roll();

    if (dies < 2) {
      this.damage += 2;
    } else if (dies < 4) {
      this.damage += 3;
    } else {
      this.damage += 4;
      this.heal();
    }
  }
}
