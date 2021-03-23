# YATM

## Installation

**IF YOU HAVE ONE OF THESE OPERATING SYSTEMS AND I MESSED SOMETHING UP PLEASE FIX**

## Rust

There are 2 components we need to get rust up and running
* `Rust`
* `Cargo`

These can be one or two different package.  In the case of Fedora and Debian, they are 2 separate packages, in the case of Arch they are one.

### Arch and derivatives

`$ sudo pacman -S rust`

### Debian and derivatives

`$ sudo apt install rustc cargo`

### Fedora

`$ sudo dnf install rust cargo`

### Windows

`https://forge.rust-lang.org/infra/other-installation-methods.html`

## Node

We need Node.js in order to run `electron`, as well as `neon`, and their associate modules.

### Arch and derivatives

`$ sudo pacman -S nodejs`

### Debian and derivatives

`$ sudo apt install nodejs`

### Fedora

`$ sudo dnf install nodejs`

### Windows

`https://nodejs.org/en/download/`

After you have that installed, we will need to install some additional things to run the application.

In the root directory of the project, run the following commands to install the needed dependencies:

`$ npm i --save-dev electron electron-build-env neon-cli jquery`

`$ npx @electron-forge/cli import`

* NOTE: If you encounter errors running node modules, you may have to install them globally with the `-g` flag, see below:

`$ sudo npm i -g electron electron-build-env neon-cli jquery`

## Running

After everything is installed properly, build the `rust` module with the following command:

`$ npm run build`

This builds our `rust` module as a native node module, so that it can be imported and used by `electron`.

Because neon and electron use different node verisons, we must build it using `electon-build-env`, otherwise everything breaks because they are compiled with different versions of NodeJs.

After we have built our `rust_core` module, we can actually run the electron application with `electron-forge` using the following command: 

`$ npm start`

### Running Rust Unit Tests

To run unit tests, change into `local_modules/rust_core/native/` and run `cargo test` to run the rust unit tests

## Packaging for Distribution

* Build application using `electron-packager`
* Will create a directory with an executable and other needed files for running

## Dependencies

`# npm install electron-packager -g`

## Building Packages

### Linux

`electron-packager ./YATM yet-another-task-manager --platform=linux --arch=x64`

### Windows

`electron-packager ./YATM yet-another-task-manager --platform=win32 --arch=x64`

### MacOS

`electron-packager ./YATM yet-another-task-manager --platform=darwin --arch=x64`

* For Mac App Store

`electron-packager ./YATM yet-another-task-manager --platform=mas --arch=x64`
