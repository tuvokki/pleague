[![Build Status](https://travis-ci.org/tuvokki/pleague.svg?branch=master)](https://travis-ci.org/tuvokki/pleague)

# pleague
A league system for the company fußball

# Development

Install a local version of the 1.3 version of [Meteor](https://www.meteor.com/install)

Clone a version of the repo to your development computer

`cd \your\devel\dir\`

`git clone git@github.com:tuvokki/pleague.git` (or use the github GUI tool)

Install npm dependencies and run the meteor command in the directory

`cd pleague`

`npm install`

`meteor`

This creates a bunch of outputs which end with:

![image](https://cloud.githubusercontent.com/assets/181719/14711685/a536d7fa-07da-11e6-8bbd-170ce02d9634.png)

You have just started a local mongoDB and the meteor server. Open a browser on http://localhost:3000/ and see (a totally empty) application.

On first boot a user called `admin` with a password of `secret` is created for you.

(todo: [create an issue](https://github.com/tuvokki/pleague/issues/new) to not hardcode the password...)
