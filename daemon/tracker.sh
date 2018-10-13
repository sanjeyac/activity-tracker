#!/bin/sh

#params
DB=/opt/activityTracker/activity.db

#posix version
track() {
  WINDOW=$(xdotool getactivewindow getwindowname)
  UNIXTIME=$(date +%s)
  if [[ $EUID -ne 0 ]]; then # if user is not root
    if [ -n "$WINDOW" ]; then # if window variable is not empty
      sqlite3 $DB "insert into activity (unixtime,window) values ($UNIXTIME,\"$WINDOW\");"
    fi
  fi
}

#applications
case "$1" in

  start)
    echo -n "Starting Tracking Deamon .... "
    # acquisizione ora e finestra di lavoro
    while [ true ]
    do
        track
        sleep 5 #1 minute
    done
    track
    ;;

  init)
    echo "init db"
    sqlite3 $DB "CREATE TABLE `activity` ( `unixtime` INTEGER NOT NULL, `window` TEXT NOT NULL, PRIMARY KEY(`unixtime`) );"
    ;;

  once)
    echo "logging activity once"
    track
    ;;

  *)
    echo "Usage: $0 start"
    exit 1
    ;;
esac
