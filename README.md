# SWAPI-GAME

SWAPI-GAME App 1.0

The game features two main views: LoginView and GameView.

##LoginView:
To start the game, users must register with an email address and password. For each subsequent session, users simply log in with the previously created account. After successful authentication, the user is transferred to the GameView.

##GameView:
Information Bar: At the top, it displays the logged-in user's information and the counter status of the current game.

##Control Panel: Users can select the type of resource to be drawn (people or spaceships) and input usernames. Usernames are registered when scores are entered into the database.

##The game: involves selecting random cards featuring Star Wars characters whenever the user selects "Play" or "Rematch". Currently, two types of resources are supported: people and spaceships. Each resource type has a different decisive attribute for winning—crew size for spaceships and mass for people. The player who selects the higher-value card wins the round.

Players have the option to play multiple rounds. Results are saved only when the 'Publish/New Game' button is pressed. This action resets the game state (including any usernames entered), allowing users to start afresh and battle for their desired outcome once more.

# Description

The app is implemented in a minimal way, with the entire work limited to 3 days. The focus has been on structuring the codebase to present the code style and best practices, as if it were a real-world project.
The general concept has been achieved, but due to the limited time, not all desired features have been implemented. Therefore, I will leave here my proposals/improvements:
- Add TypeScript
The use of the Options API within components was intentional, as it still enables the creation of a common structure for small and lightweight components, while all reusable logic was moved to composables where the Composition API is in use. In my opinion, this is a great benefit of combining both approaches
- Implement a Memo function to cache and store values of function executions with already used parameters
- Improve error handling, and potentially add a random pick for resources that are not found
- Define more unit and e2e tests (only crucial ones have been implemented)
- Add more JSDoc comments to crucial functions
- The styling of the website is not bad considering the time spent, but it could be further polished
- Add debounce to inputs
- Disable Login/Register buttons until the necessary details have been entered.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```
