# Node Task Manager Rest API

Simple Task Manager REST API which uses: **Node.js**, **mongoose**, **Express** and **Jest** technologies.
Also includes authentication with JWT.
For storing, MongoDB database is used.

## Installing application

To install the application use following command:

```shell script
npm install
```

## Environment configuration

Following environment variables need to be set in your OS or updated in the **.config/dev.env** configuration file.

```properties
PORT = 3000
MONGODB_CONNECTION_URL = mongodb://127.0.0.1:27017/task-manager
SENDGRID_API_KEY = SG.api.key
FROM_EMAIL = email@example.com
JWT_SECRET_KEY = wqcle66p1a01zu4qgw54jlbj5y8n71l5tbzj52oyxy51gefp
JWT_ALGORITHM = HS256
JWT_ACCESS_TOKEN_EXPIRES_IN = 1 week
EMAIL_FUNCTIONALITY_ENABLED = false
```

## Run tests

You can run your tests using:

```shell script
npm test
```

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```shell script
npm run dev
```

## Running the application in production mode

You can run your application in production mode using:

```shell script
npm start
```

## Related Guides

- Node.js ([guide](https://nodejs.org/en/docs/)): Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express ([guide](https://expressjs.com/en/guide/routing.html)): Fast, unopinionated, minimalist web framework for Node.js.
- mongoose ([guide](https://mongoosejs.com/docs/guide.html)): elegant mongodb object modeling for node.js.
- Jest ([guide](https://jestjs.io/docs/getting-started)): Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
