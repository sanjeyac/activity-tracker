#!/bin/sh

# install  in cron 

# crontab -e
# * * * * * DISPLAY=:0 /path/to/tracker.sh once
# TODO: autocreate -- (crontab -l 2>/dev/null; echo "*/5 * * * * /path/to/job -with args") | crontab -


#params
DB=/opt/activityTracker/activity.db

USER=$(whoami)
#echo "$(date) running as $USER" >> /tmp/trackerlog

#posix version
track() {
  WINDOW=$(xdotool getactivewindow getwindowname)
  UNIXTIME=$(date +%s)
  #echo "$(date) inserting...  $WINDOW" >> /tmp/trackerlog
  if [ "$(id -u)" -ne 0 ]; then # if user is not root
    if [ -n "$WINDOW" ]; then # if window variable is not empty
      sqlite3 $DB "insert into activity (unixtime,window) values ($UNIXTIME,\"$WINDOW\");"
    else
      echo "NO WINDOW DETECTED: window is empty!"
    fi
  else
    echo "running under wring user"
  fi
}

#applications
case "$1" in

  start)
    #loop without cron tab
    echo -n "Starting Tracking Deamon .... "
    # acquisizione ora e finestra di lavoro
    while [ true ]
    do
        track
        sleep 60 #1 minute
    done
    track
    ;;

  init)
    echo "init db"
    sqlite3 $DB "CREATE TABLE activity ( unixtime INTEGER NOT NULL, window TEXT NOT NULL, PRIMARY KEY(unixtime) );"
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
