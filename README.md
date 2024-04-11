# SWAPI-GAME

SWAPI-GAME App 1.0 

The game features two main views: LoginView and GameView.

LoginView:
To start the game, users must register with an email address and password. For each subsequent session, users simply log in with the previously created account. After successful authentication, the user is transferred to the GameView.

GameView:
Information Bar: At the top, it displays the logged-in user's information and the counter status of the current game.

Control Panel: Users can select the type of resource to be drawn (people or spaceships) and input usernames. Usernames are registered when scores are entered into the database.

The game: involves selecting random cards featuring Star Wars characters whenever the user selects "Play" or "Rematch". Currently, two types of resources are supported: people and spaceships. Each resource type has a different decisive attribute for winning—crew size for spaceships and mass for people. The player who selects the higher-value card wins the round.

Players have the option to play multiple rounds. Results are saved only when the 'Publish/New Game' button is pressed. This action resets the game state (including any usernames entered), allowing users to start afresh and battle for their desired outcome once more.

# Description

App implemented in minimal way, I've mainly focused on structuring codebase in odrer to present code style and best practices if it would be real world project. 
General concept was achieved but due to limited time some I didn't implement all I wanted, therefore I will leave here my proposals/imporvements.

- WILL BE ADDED BEFORE FINISHING TASK

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
