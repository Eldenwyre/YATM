# YATM

## Installation

Testing this atm

## Running

After everything is installed properly, build the `rust` module with the following command:

`npm run build`

This builds our `rust` module as a native node module, so that it can be imported and used by `electron`
Because `neon` and `electron` use different node verisons, we must build it using `electon-build-env`, otherwise everything breaks because they are compiled with different versions of `NodeJs`.

After we have built our `rust_core` module, we can actually run the `electron` application with `electron-forge` using the following command: 

`npm start`
