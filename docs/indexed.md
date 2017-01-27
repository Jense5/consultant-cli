![consultant](http://i.imgur.com/z8UG7SE.png)

<h1 align="center">Consultant Tutorial</h1>

> This document is written for version 1.0, which is **not** yet released.


This document will explain how to setup boilerplates with [consultant](https://github.com/Jense5/consultant) and how to use them in your daily workflow. Consultant requires almost **no** extra time, however it might save you tons of it. You can also use it with whichever language you like.

## Installation

```sh
$ npm install -g consultant-cli
$ # You can now use `consultant` and `cst`
$ cst --version
```

## Boilerplates

### What is a boilerplate?

Whenever you are writing code while thinking 'damn, I have done this before', you are probably just writing boilerplate code. It means that it is some basic code, almost independent of your project, which you will need to write again in the future for some other project.

If you have some experience with [NodeJS](https://nodejs.org/en), than you probably know that you need an awful amount of boilerplate code. I.e. setting up [Babel](https://babeljs.io), [Flow](https://flowtype.org), [ESLint](http://eslint.org), [MongoDB](https://www.mongodb.com), [ExpressJS](http://expressjs.com) ... You have to do it all over and over again.

That's why boilerplates are pretty popular these days. You find a lot of starter projects on Github, like [this](https://github.com/sahat/hackathon-starter), [this](https://github.com/MattMcFarland/reactathon) or [this](https://github.com/tailec/boilerplate) one. It will become quickly clear that you will have different boilerplates for different kind of projects and that you need a place to store them all. The problem is that you should clone them every time you need them. You also need to remove the git folder because you probably don't want the commits of the boilerplate. It also makes it impossible to use them offline.

### Consultant as a boilerplate manager

In its most basic use case, [consultant](https://github.com/Jense5/consultant) can be used to manage your boilerplates. It will make sure they are available offline and will be generated without traces of the boilerplate repository. Below is a video that will illustrate how this works. We use [this](https://github.com/sahat/hackathon-starter) boilerplate as an example.

```sh
$ # Add video here!
$ cst add https://github.com/sahat/hackathon-starter web-hackathon-starter
```
