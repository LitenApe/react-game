# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tasks

Windows<3 corporation has decided to create a game to appeal to the younger generation in an attempt to market themself as a cool place. However, the budget was cut in the middle of development, and the team was axed. Now it is up to you to complete the game, so that Windows<3 corporation can become a cool place to work.

### 1. Player Registration

Oh no! The testers found a bug straight away! The provided player name is lost during transition to the next screen when we click on **Start**. It was found after further investigation that **Start** button pushing the user to the next screen before storing it somewhere safe!.

Complete the implementation of **context/PlayerContext** and connect it to the **container/Register** component. Afterward, add necessary logic to **push** the user to the game when "Start" is clicked.

### 2. Create entities

Hmm, seems like there is still something missing before the player name is visible. A new **Entity** is currently created every time a new battle starts. This can't be right, right? How can we progress in the game if we are always starting all over again after each battle? We cant!

Initialize the player and enemy state variables with a **new Entity()**, remember to provide the supplied player name when creating the player entity.

Below is the signature for creating a new entity, feel free to use values found inside of **initialPlayerStats** to set a starting point for our new player and enemy.

For the monsters name, we can use the service **Monster**, which has a method **getMonster()** that returns a monster name.

```ts
// Creating an entity
constructor(name: string, damage: number, health: number);
```

Remember to send the newly created player and monster as argument to the **Reward** and **Battle** component.

### 3. Progressive difficulty

The testers has given up! Seems like the previous team was a bunch of useless potatoes. The enemy is infinitely dead. Create a new enemy inside of the **progressGame** function. Remember to make it a little bit stronger then the previous enemy.

We can invoke the method **getStats()** to retrieve an entities current damage and health. Use this information to determine how strong the next enemy should be.

OPS! **getStats()** provides the current values, which means that the health is **0** for defeated enemies. Make use of the round counter to create some magic formula which determines the enemy health.

### 4. Game Over!

After working on the game for a while, we have grown tired of refreshing the page every time we die to reset the game. There is also some wierd behaviour when we restarts the game after dying, which is most likely linked to the fact the player still has **0 health** after restarting the game.

Repeat what you did in the second task. Create a new player and enemy entity inside of the **resetGame()** function. Additionally, make the players damage a little bit higher based on how many times the player has played. The **attempts** variable counts how many runs the player has logged for the session. Use that to determine how much stronger the player should be.

### 5. The StatusBox is broken!

After a short coffein injection, we suddenly came to the realisation that the health bar is broken for some reason. After further inspection, it seems like the entire **StatusBox** component is broken. Essentially just a brick.

Inspect the StatusBox component and fix the problem!

Hint: There is nothing that triggers React to re calculate the virtual dom to decide whether or not it should re-paint the screen.

### 6. What is that 0?

The **0** right next to the avatars has bottered you for some time now. It is the end of the day and you are fed up with it. THE TIME HAS COME! BEGONE YOU DAMN 0! You look into the **GameEntity** component and discover that the 0 is actually a recent damage received indicator. However, it is hardcoded to 0 at the momemt.

Figure out how to show the health difference every time it is reduced. Bonus points if you are able to create a custom hook with **useRef** which returns the value.

### 7. THE GAME WORKS!

After almost 2 years of work, the game is finally finished. You buy yourself a cake to celebrate, however, while eating the cake and bragging to your collegues, you suddenly feel sick, nausea is creeping in quickly. You cannot take it anymore and run towards your computer. The code needs to be refactored!

Set each game screen as it's own route inside of **App.tsx** and introduce a **GameContext** which handles all the logic to keep the game running. Make necessary changes to the component interfaces to maintain the current set of features.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
