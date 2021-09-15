import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/pixel-art';

import Dice from './Dice';

export type Stats = {
  damage: number;
  currentHealth: number;
  originalHealth: number;
};

export type Skill = {
  name: string;
  action: (entity: Entity) => number;
};

interface IEntity {
  getName(): string;
  getAvatar(): string;

  getDamage(): number;
  getHealth(): number;
  getStats(): Stats;
  getSkills(): Array<Skill>;

  receiveAttack(attack: number): number;
  heal(): void;

  levelUp(damage: number, health: number): void;
  learn(skill: Skill): void;
}

export default class Entity implements IEntity {
  private name;
  private damage;
  private originalHealth;
  private currentHealth;
  private skills: Array<Skill> = [];
  private avatar: string;

  constructor(name: string, damage = 5, health = 100) {
    this.name = name;
    this.damage = damage;
    this.originalHealth = health;
    this.currentHealth = health;
    this.skills = [
      {
        name: 'Basic Attack',
        action: (entity: Entity): number => {
          return entity.getDamage();
        },
      },
    ];

    this.avatar = createAvatar(style, {
      seed: this.name,
    });
  }

  /**
   * @returns returns entity name
   */
  getName(): string {
    return this.name;
  }

  /**
   * returns a svg which was generated during instance
   * creation.
   * @returns { string } returns a html svg string
   */
  getAvatar(): string {
    return this.avatar;
  }

  /**
   * Retrieve skills learned by the entity
   * @returns { Stats } returns the damage and health
   */
  getStats(): Stats {
    return {
      damage: this.damage,
      currentHealth: this.currentHealth,
      originalHealth: this.originalHealth,
    };
  }

  /**
   * Retrieve an entity skills
   * @returns { Array<Skill> } returns all the entities skills
   */
  getSkills(): Array<Skill> {
    return this.skills;
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
    return this.currentHealth;
  }

  /**
   * Attack the entity. The entity might receive some healing
   * after the attack if they are lucky
   * @param { number } attack attacks the given entity
   * @returns remaining health
   */
  receiveAttack(attack: number): number {
    this.currentHealth = this.currentHealth - attack;

    if (this.currentHealth < 0) {
      this.currentHealth = 0;
    } else if (Dice.roll() === 6) {
      this.heal();
    }

    return this.currentHealth;
  }

  /**
   * Heals the entity
   */
  heal(): void {
    const dies = Dice.roll();
    this.currentHealth =
      dies >= 5 ? this.currentHealth + 4 : this.currentHealth + 2;
  }

  /**
   * increases stats
   */
  levelUp(damage: number, health: number): void {
    this.damage += damage;
    this.currentHealth += health;
    this.originalHealth += health;
  }

  /**
   * adds a skill to the entities list of learned skills
   */
  learn(skill: Skill): void {
    this.skills = this.skills.concat([skill]);
  }
}
