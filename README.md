# Kinetic

# Requirements

You need to have the following tools installed on your machine:

- Node.js 14+
- Docker 20+
- Yarn v1.22+

# Getting started

```shell
git clone git@github.com:kin-labs/kinetic.git
cd kinetic
yarn install
```

# Development setup

Start Services

```shell
yarn dev:services
```

Start Api

```shell
yarn dev:api
```

# Building the project

You can build the app into a production build:

```shell
yarn build
```

After that, you can run the production app:

```shell
yarn start
```

# Testing the project

Use this command to the e2e test of the API:

```shell
nx e2e api-e2e
```

Use this command to run a unit test of one of the projects in the workspace:

```shell
nx test api-core-feature
```

Or in watch mode:

```shell
nx test api-core-feature --watch
```

Run the unit tests on all the projects.

```shell
nx run-many --target test --all
```
