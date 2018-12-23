# :round_pushpin: Real Time Footfall Analysis [![Build Status](https://travis-ci.org/real-time-footfall-analysis/rtfa-web.svg?branch=master)](https://travis-ci.org/real-time-footfall-analysis/rtfa-web) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
This repository contains a React front-end for the [Real Time Footfall Analysis](https://github.com/real-time-footfall-analysis) project.

## :wrench: Setup
1. Clone this repository
2. `cd` into the cloned directory and run `yarn install`
3. Setup the following **File Watchers** in WebStorm (or your IDE of choice):
    1. [Prettier](https://prettier.io/docs/en/webstorm.html) (for `.js`, `.json` and `.scss` files)
    2. [Stylelint](https://www.jetbrains.com/help/webstorm/using-stylelint-code-quality-tool.html) (for `.scss` files)
4. Run `yarn start` and the front-end should automatically load at `http://localhost:3000/`    
5. If you wish to use the bundled mock server tool:
    1. `cd` into `src/tools`
    2. Run `yarn install`
    3. Set `REACT_APP_USE_MOCK_SERVER=true` in your Node environment. 
    
## :ribbon: Style Guidelines
As mentioned above, this project uses [Prettier](https://prettier.io) for code formatting and `package.json` enforces code-style compliance with a pre-commit validation hook. Setting up File Watchers is the best way to ensure you're always compliant with the style guide.

Pre-commit validation also involves `ESLint` checks, which should ideally be displayed live in your IDE as you code; this means there is no need for an ESLint File Watcher.

To avoid disappointment and ensure that committing the current state of your repository will succeed, run `yarn validate` prior to committing. This is not a guarantee of code functionality but will maintain consistent code formatting, automatic regression testing and some basic static analysis via linters.
