# Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisite](#prerequisite)
- [Installation](#installation)
- [Running project for development](#running-project-for-development)
- [Build project for production](#build-project-for-production)
- [License](#license)

# Prerequisite

To run this code in your device you have to make sure, `NodeJS` and `ionic` are installed globally on your machine. After that you can install all necessary dependencies for running project.


1. Check if `npm` is installed. Otherwise please install [`NodeJS`](https://nodejs.org/en/download/package-manager/).

```bash
npm -v
```
2. Install **ionic** command line interface globally.

```bash
npm install -g @ionic/cli
```

3. Change API domain in src/environments/environment.ts and src/environments/environment.prod.ts

4. Change domain in nginx config nginx/nginx.conf line 3,4,5

5. Change IP of API in nginx config nginx/nginx.conf line 23, 29


# Installation

```bash
npm install
```

# Running project for development

```bash
npm start
```

# Build project for production

```bash
npm run build:prod
```

# License

Follow by [NNG](www.nng.bz)
www.nng.bz