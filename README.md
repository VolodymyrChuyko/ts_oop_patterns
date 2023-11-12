# env_ts_node

## Installed:
   - TypeScript
   - NodeJS
   - nodemon
   - ESlint
   - Husky
   - Lint-staged

## Avaliable scripts
   - `npm run dev` - start develop mode (note that this option works only if TS compiler option "module" is set to "CommonJS"). In the develop mode source code restarts every time it was changed
   - `npm run build` - generate JS code from source TS files
   - `npm start` - build and start generated JS code
   - `npm run lint` - run ESlint code check

## Installing Jest for testing

To install **Jest** follow the instructions:

   1. `npm install --save-dev jest ts-jest` - install Jest library.

   2. `npx ts-jest config:init` - create jest configure file.

   3. You may need to add the `jest.config.js` file to the `include` array in `tsconfig.json` for proper **Eslint** working.

   4. Use `npx jest` to fire tests or add the line: `"test": "npx jest",` to the `scripts` object of the `package.json` file to be able to fire tests using `npm test` command.

   5. It is recommended to install the Jest extension for convenience.

See more by following:

[Jest: getting started using TypeScript](https://jestjs.io/docs/getting-started#using-typescript)

[ts-jest: installation](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file)
