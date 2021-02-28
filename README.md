## Setup
```
npm run dev     // dev server
npm run build   // build project
```
## Approach
- src/useScoreBoard.js 

Custom hook implemented to contain all of our scoreboard logic. It provides an API for React Components so that they can implement a scoreboard.

- src/useScoreBoard.test.js 

Custom hook sets of tests using @testing-library/react-hooks specifically to test custom hooks.


- src/ScoreBoard.jsx

Demo React Component that use our custom hook to create a scoreboard. It's the only component rendered when running the application.

- src/ScoreBoard.test.js

Demo React Component sets of tests using @testing-library/react to test DOM updates in response to user events on score board elements.

## Dependencies
- Build/Development tool: vite https://github.com/vitejs/vite
- Javascript testing lib: jest https://github.com/facebook/jest
- React testing lib: https://github.com/testing-library/react-testing-library
- React hooks testing lib: https://react-hooks-testing-library.com/