## Setup
```
npm run dev     // dev server
npm run build   // build project
```
## Approach: 
### Creating a custom hook + a component that use it.

- src/useScoreBoard.js 
- src/useScoreBoard.test.js 

I used a custom hook to implement all of our scoreboard logic. It provides an API for any React Components to use so that they can implement a scoreboard with the following operation : Create a match / Update a match score / End a match / Get a ordered list of all matchs. To test our scoreboard custom hook we are using @testing-library/react-hooks (All API methods are being tested in the test file).

- src/ScoreBoard.jsx
- src/ScoreBoard.test.js

This is a "demo" React Component that use our custom hook to create implement a scoreboard. It makes use of all of our custom hook methods. This component is also being tested using @testing-library/react to test DOM updates in response to user events.

## Dependencies
- Build/Development tool: vite https://github.com/vitejs/vite
- Javascript testing lib: jest https://github.com/facebook/jest
- React testing lib: https://github.com/testing-library/react-testing-library
- React hooks testing lib: https://react-hooks-testing-library.com/
- Styles: https://github.com/tailwindlabs/tailwindcss