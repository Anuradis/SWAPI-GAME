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

App implemented in minimal way, entire work was limited to 3 days. I've mainly focused on structuring codebase in order to present code style and best practices if it would be real world project.
General concept was achieved but due to limited time I didn't implement all I wanted, therefore I will leave here my proposals/imporvements.

- Memo function to and state to keep stored values of function execution with already used params
- Define more unit and e2e tests (only crucial implemented)
- JSDocs more can be added (crucial functions commented)
- Styling of website is not bad as for time spent, but it's definetally not polished up
- Add debounce to inputs
- Login/Register buttons disabled until details entered

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
