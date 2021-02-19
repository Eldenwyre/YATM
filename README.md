# YATM

## Installation

You will need NodeJs installed for any of the below to work.

After you have that installed, we will need to install some additional things to run the application.

In the root directory of the project, run the following commands to install the needed dependencies:

`npm i --save-dev electron electron-build-env neon-cli jquery`

`npx @electron-forge/cli import`

## Running

After everything is installed properly, build the `rust` module with the following command:

`npm run build`

This builds our `rust` module as a native node module, so that it can be imported and used by `electron`.

Because `neon` and `electron` use different node verisons, we must build it using `electon-build-env`, otherwise everything breaks because they are compiled with different versions of `NodeJs`.

After we have built our `rust_core` module, we can actually run the `electron` application with `electron-forge` using the following command: 

`npm start`
