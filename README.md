# Kinetic

Kinetic is an open-source suite of tools that make it easy to build apps that integrate Solana.

It provides a consistent and clean abstraction over the Solana SDKs and enhances it with some commonly requested features like paying Solana fees on behalf of the user, tracking and timing the users transactions and sending out webhooks.

Kinetic is aimed at developers that want to build crypto-experiences for the users of their app, hiding a lot of the details about the blockchain out of sight for both the developer and the end user.

# Using Kinetic

See how to use Kinetic in your TypeScript app [here](https://developer.kin.org/docs/developers/typescript).

Or use one of our other SDKs:

- [Kinetic Android SDK](https://developer.kin.org/docs/developers/android-kotlin)
- [Kinetic Dart/Flutter SDK](https://developer.kin.org/docs/developers/flutter-dart)
- [Kinetic iOS SDK](https://developer.kin.org/docs/developers/ios-swift)
- [Kinetic Python SDK](https://developer.kin.org/docs/developers/python)
- [Kinetic Unity SDK](https://developer.kin.org/docs/developers/unity)

Learn more about Kinetic [here](https://developer.kin.org/docs/kinetic).

# Contributing

If you want to contribute to Kinetic, use the following steps to get started with a local development environment:

## Requirements

You need to have the following tools installed on your machine:

- Node.js 16+
- Docker 20+
- Yarn v1.22+

## Getting started

```shell
git clone git@github.com:kin-labs/kinetic.git
cd kinetic
yarn install
```

## Development setup

Start Services

```shell
yarn dev:services
```

Start the Api

```shell
yarn dev:api
```

Start the Web UI

```shell
yarn dev:web
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

Use this command to the e2e test of the SDK:

```shell
nx e2e sdk-e2e
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

# What If I Get Stuck?

Pop into the [#kinetic-general](https://discord.com/channels/808859554997469244/973322547854733362) channel on our [Discord](https://kin.org/developerdiscord), and we'll give you a hand!
