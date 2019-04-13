# Xbox-Smartglass-Core-Node
[![Build Status](https://travis-ci.org/unknownskl/xbox-smartglass-core-node.svg?branch=release/0.3.0)](https://travis-ci.org/unknownskl/xbox-smartglass-core-node)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=xbox-smartglass-core-node&metric=alert_status&branch=release/0.3.0)](https://sonarcloud.io/component_measures?id=xbox-smartglass-core-node&metric=alert_status)
[![Technical debt](https://sonarcloud.io/api/project_badges/measure?project=xbox-smartglass-core-node&metric=sqale_index&branch=release/0.3.0)](https://sonarcloud.io/component_measures?id=xbox-smartglass-core-node&metric=sqale_index)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=xbox-smartglass-core-node&metric=bugs&branch=release/0.3.0)](https://sonarcloud.io/component_measures?id=xbox-smartglass-core-node&metric=bugs)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=xbox-smartglass-core-node&metric=coverage&branch=release/0.3.0)](https://sonarcloud.io/component_measures?id=xbox-smartglass-core-node&metric=coverage)

NodeJS smartglass library for controlling a Xbox

## Dependencies

- NPM
- pip install cryptography

## How to install

`npm install xbox-smartglass-core-node --save`

## How to use

See the [examples](examples) folder for examples

## Known Issues

- Broadcasting does not work properly yet.
- Callback when sending a power_on command always returns true for now.
- Protocol can be broken sometimes.

## Changelog

0.2.2:

    No code changes. Integrated Travis CI.

0.2.1:

    Fixed a bug that caused the connection to fail because the path to the python signing component was invalid

0.2.0:

    Big update! xbox-smartglass-node-core can connect to the Xbox! For now only polling the status of the active app and tuning off the console

0.1.3:

    Fixed a problem where old callbacks were still used when init a new client
