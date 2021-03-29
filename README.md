# YATM

## Installation

**IF YOU HAVE ONE OF THESE OPERATING SYSTEMS AND I MESSED SOMETHING UP PLEASE FIX**

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

`$ npm i --save-dev electron jquery typescript @types/node`

- NOTE: If you encounter errors running node modules, you may have to install them globally with the `-g` flag, see below:

`$ sudo npm i -g electron typescript`

## Running



Once we have all of the dependencies properly installed, we need to compile our Typescript modules down to javascript:

`$ npm run build`

Once the typescript components have been compiled, we can then simply run the `electron` application using the start script in `package.json`:

`$ npm start`

## Packaging for Distribution

- Build application using `electron-packager`
- Will create a directory with an executable and other needed files for running

### Dependencies

`# npm install electron-packager -g`

### Building Packages

- Linux

`electron-packager ./YATM yet-another-task-manager --platform=linux --arch=x64`

- Windows

`electron-packager ./YATM yet-another-task-manager --platform=win32 --arch=x64`

- MacOS

`electron-packager ./YATM yet-another-task-manager --platform=darwin --arch=x64`

- For Mac App Store

`electron-packager ./YATM yet-another-task-manager --platform=mas --arch=x64`
