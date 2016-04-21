# pleague
A league system for the company fußball

# Development

Install a local version of the 1.3 version of [Meteor](https://www.meteor.com/install)

Clone a version of the repo to your development computer

`cd \your\devel\dir\`

`git clone git@github.com:tuvokki/pleague.git` (or use the github GUI tool)

Run the meteor command in the directory

`cd pleague`

`meteor`

This creates a bunch of outputs which end with:


> meteor [[[[[ ~\D\research\pleague ]]]]]
> 
> => Started proxy.
> => Started MongoDB.
> => Started your app.
> 
> => App running at: http://localhost:3000/    Type Control-C twice to stop.


This will start a local mongoDB and the meteor server. Open a browser on http://localhost:3000/ and see (a totally empty) application.

Last step is to create a user in the `settings` tab called `admin` with a password of your choice. A user with this name is hardcoded as admin user (todo: [create an issue](https://github.com/tuvokki/pleague/issues/new) for this...)
