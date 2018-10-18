# Activity Tracker

Activity Tracker is a Cloudless software usage tracker.

- Cloudless: Do we need to share personal data and habits with unknown services? Keep your data on your computer

- Tracker: Do you need to keep track of your time automatically? for projects, for works or simply "how many time have you spent on social networks today, is it necessary?"

## Why this project?

Life is an empty jar, you can fill it with Rocks (very important things like family, friends, life goals, etc.), Pebbles ( job, house, etc. ) and Sand ( small things that are remaining small), if you fill the jar with time wasting sand, there will be no space for Rocks and Pebbles.

## How to install / Compile
### Daemon

you need xdotool

install xdotool in ubuntu/debian:

> sudo apt install xdotool
TODO: Installer

### Manual installation
launch tracker.sh in daemon with parameter "once" every minute in crontab, using "crontab -e" command

> * * * * * DISPLAY=:0 /opt/activity-tracker/tracker.sh once

### Desktop App

TODO: binary package

####  Running from source


Desktop-app: go to desktop-app folder and:

> yarn

> yarn rebuild

> yarn start

## RoadMap / Todo

- Complete documentation
- Writing tests
- Refactor architecture with a solid MVC structure ( current version is just a proof of concept)
- Tons of validations
- CronTab installer script
- Custom Filters (Matchers)
- Private mode, at the moment anything will be tracked
- Current daemon works on Linux, maybe Windows and MacOS will bu supported

## Tech

This project is based on [Electron](https://github.com/electron/electron)




