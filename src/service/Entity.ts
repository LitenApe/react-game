import Dice from './Dice';

export type Stats = {
  damage: number;
  health: number;
};
interface IEntity {
  getDamage(): number;
  getHealth(): number;
  getStats(): Stats;

  receiveAttack(attack: number): number;
  heal(): void;

  levelUp(damage: number, health: number): void;
}

export default class Entity implements IEntity {
  private damage = 1;
  private health = 10;

  constructor(damage = 1, health = 10) {
    this.damage = damage;
    this.health = health;
  }

  getStats(): Stats {
    return {
      damage: this.damage,
      health: this.health,
    };
  }

  /**
   * Calculates attack damage, including critical hit
   * @returns { number } attack damage
   */
  getDamage(): number {
    const dies = Dice.roll();
    return dies === 6 ? this.damage * 2 : this.damage;
  }

  /**
   * Retrieves current health
   * @returns { number } current health
   */
  getHealth(): number {
    return this.health;
  }

  /**
   * Attack the entity
   * @param { number } attack attacks the given entity
   * @returns remaining health
   */
  receiveAttack(attack: number): number {
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
  heal(): void {
    const dies = Dice.roll();
    this.health = dies >= 5 ? this.health + 4 : this.health + 2;
  }

  /**
   * increases stats
   */
  levelUp(damage: number, health: number): void {
    this.damage += damage;
    this.health += health;
  }
}
