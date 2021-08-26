import { useState } from "react";
import { ReactNode, useEffect } from "react";
import GameEntity from "../components/GameEntity";
import Entity from "../service/Entity";
import { EntityType } from "./Game";

type BattleProps = {
    player: Entity;
    playerVisual: ReactNode;

    enemy: Entity;
    enemyVisual: ReactNode;

    declareWinner(winner: EntityType): void;
}

export default function Battle(props: BattleProps) {
    const { player, playerVisual, enemy, enemyVisual, declareWinner } = props;
    const [isRunning, setIsRunning] = useState(true);
    const [winner, setWinner] = useState<EntityType | null>(null)

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            const remainingPlayerHealth = player.setHealth(enemy.getDamage());
            const remainingEnemyHealth = enemy.setHealth(player.getDamage());

            if (remainingPlayerHealth === 0 || remainingEnemyHealth === 0) {
                setIsRunning(false);
                setWinner(player.getHealth() === 0 ? EntityType.Enemy : EntityType.Player);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [isRunning])

    useEffect(() => {
        if (isRunning || winner === null) return;

        const timer = setTimeout(() => {
            declareWinner(winner)
        }, 10000);

        return () => {
            clearTimeout(timer);
        }
    }, [isRunning, winner])

    if (winner === EntityType.Enemy) {
        return <h1>Loser!</h1>
    }

    if (winner === EntityType.Player) {
        return <h1>Winner</h1>
    }

    return (
        <div id="arena">
            <GameEntity visual={playerVisual} />
            <GameEntity visual={enemyVisual} />
        </div>
    )
}