# Good Forest - MERN app

[![Build and Test](https://github.com/omers4/good-forest-back2rnd/actions/workflows/main.yml/badge.svg)](https://github.com/omers4/good-forest-back2rnd/actions/workflows/main.yml)

An app for Good Forest initiative, developed as part of Back2R&D organization.
A Full MERN Stack app based on [this boilerplate](https://github.com/djizco/mern-boilerplate/).

## Requirements

- [Node.js](https://nodejs.org/)
- Mongo Db (Install the msi from here - https://www.mongodb.com/try/download/community)

## Quick Start

#### Setup

```bash
npm install
```

#### On Mac / Linux:

```
brew tap mongodb/brew
brew install mongodb-community
```

Start the database

```bash
brew services start mongodb-community
```

#### for Development

Start the client

```bash
npm run dev
```

Start the server

```bash
npm start
```

And go to `http://localhost:8080`

#### for Production

```bash
npm run build
npm start
```

#### Other Commands

```bash
npm test
npm run lint
npm run lint:fix
npm run test:verbose
npm run test:watch-client
npm run test:watch-server
```

## Git cheat-sheet for a new feature

```bash
git checkout -b add-info-to-readme
git add .
git commit -m "add info to readme"
git push #(On the first time  - git push --set-upstream origin add-info-to-readme)
```

Open a new pull request
Move issue in Trello to "in review"

## Code Structure

```
- client
  - api
  - assets
    - images
    - icons
  - components
    - atoms
    - molecules
    - organisms
    - templates
    - pages
    - environment
  - hooks
  - store
    - actions
    - reducers
    - thunks
    - tests
  - styles
  - utils
- server
  - config
  - database
  - routes
- scripts
```

Component Heirarchy:

Environment > Pages > Templates > Organisms > Molecules > Atoms

This is based on atomic design. Learn more about [atomic design](http://bradfrost.com/blog/post/atomic-web-design/).

## Technologies

[React](https://facebook.github.io/react/) - View Library

[Redux](http://redux.js.org/) - State Manager

[Webpack](https://webpack.github.io/) - Module Bundler

[Express](http://expressjs.com/) - Node Application Framework

[MongoDB](https://www.mongodb.com/) - Document Database

[Mongoose](http://mongoosejs.com/) - MongoDB Framework

[Passport](http://www.passportjs.org/) - Authentication Framework

[React Notifications Component](https://teodosii.github.io/react-notifications-component/) - Notification System

[Bulma](http://bulma.io/) - CSS Framework

[React Bulma Companion](https://github.com/djizco/react-bulma-companion) - Bulma Component Library

[FontAwesome](http://fontawesome.io/) - Icons

[Ramda](http://ramdajs.com/) - Functional Library

[date-fns](https://date-fns.org/) - Date Functions Library

[SuperAgent](https://github.com/visionmedia/superagent) - HTTP Request Library

[ESLint](http://eslint.org/) - Code Linter

[Jest](https://jestjs.io/) - Testing Framework
