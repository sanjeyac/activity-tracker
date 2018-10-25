# Activity Tracker

Activity Tracker is a Cloudless software usage tracker.

- Cloudless: Do we need to share personal data and habits with unknown services? Keep your data on your computer

- Tracker: Do you need to keep track of your time automatically? for projects, for works or simply "how many time have you spent on social networks today, is it necessary?"

![Alt text](docs/screens/screen.png?raw=true "Screenshot")

## Why this project?

Life is an empty jar, you can fill it with Rocks (very important things like family, friends, life goals, etc.), Pebbles ( job, house, etc. ) and Sand ( small things that are remaining small), if you fill the jar with time wasting sand, there will be no space for Rocks and Pebbles.

## How to install / Compile
### Daemon

you need xdotool

install xdotool in ubuntu/debian:

> sudo apt install xdotool

> git clone https://github.com/sanjeyac/activity-tracker.git

> cd daemon

> ./tracker.sh init

### Desktop App

Create binary package

> yarn package

TODO: make binary releases

####  Running from source

Desktop-app: go to desktop-app folder and:

> yarn

> yarn rebuild

> yarn start

## RoadMap / Todo

- UI driven chart creator ( currently charts are configured in a json configuration file )
- Writing more tests
- Create a solid View Layer
- Tons of validations
- CronTab installer script
- Private mode, at the moment everything will be tracked
- Current daemon works on Linux, maybe Windows and MacOS will be supported in the future

## Tech

This project is based on [Electron](https://github.com/electron/electron)