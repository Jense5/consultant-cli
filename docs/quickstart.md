---
layout: default
title: Getting Started
description: "Get started with consultant in under 5 minutes"
permalink: /
slug: quickstart
---

# Getting Started

> #### This website is still under construction! Read at your own risk! 😁

> 🚫 Grammar Nazis

## What is consultant?

Consultant is a small and lightweight command line tool that makes it easy to craft new projects from scratch. It uses boilerplates and templates to kickstart a new project in the language of your choice. Throughout the documentation I will refer to templates and boilerplates as two different types as we shall look at them in a different way.

A boilerplate is a static set of files which should be created when you start a new project, while a template is a dynamic set of files which can use variables, optional files and a lot more when generating a new project. So let's learn how to manage boilerplates first.

## Installation

```sh
# Install consultant-cli to have the `cli` command available
$ npm install -g consultant-cli
# Check if you have the newest version
$ cst --version
```

## Adding Boilerplates

You can choose to either have a boilerplate locally, or online. For this example, we will use this [online boilerplate](https://github.com/gaearon/library-boilerplate). If you would like a local one, you can just change the url to the local path of your boilerplate. Note that you can use one in whichever language you want.

```sh
# Simply use the `add` command to add the boilerplate
$ cst add https://github.com/gaearon/library-boilerplate node-lib

Consultant ADD v0.2.4
Starting to clone https://github.com/gaearon/library-boilerplate.
Installed node-lib

```

The last argument of the add command will be the name of the saved boilerplate. This is not required, but if you don't, consultant will ask for a name afterwards. To view a list of installed boilerplate, run the list command.

```sh
$ cst list

Consultant LIST v0.2.4
List of installed templates:
    - node-lib

```

## Crafting Projects

To create a new project, simply call the `create` command with the freshly installed boilerplate name. It will create the new boilerplate and you are ready to go.

```
$ mkdir project && cd project
$ cst create node-lib

Consultant CREATE v0.2.4
Au Revoir

```

Boilerplate management is actually just a small part of what consultant can do. The most powerful part is when we start to work with templates.
