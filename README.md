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
