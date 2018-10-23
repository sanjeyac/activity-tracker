#!/bin/sh

# install  in cron 

# crontab -e
# * * * * * DISPLAY=:0 /path/to/tracker.sh once
# TODO: autocreate -- (crontab -l 2>/dev/null; echo "*/5 * * * * /path/to/job -with args") | crontab -


#params
DB=/opt/activityTracker/activity.db
TRACKER_PATH=/opt/activityTracker/activity-tracker/daemon/tracker.sh
USER=$(whoami)
CRONTAB_LINE="* * * * * DISPLAY=$DISPLAY $TRACKER once"


#insert current active window title in a sqlite db
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



# install script call in cron
install_cron() {
  crontab -l > /tmp/mycron
  echo $CRONTAB_LINE >> /tmp/mycron
  crontab /tmp/mycron
  rm /tmp/mycron
}



# main
case "$1" in

  start)
    #loop without cron tab every minute
    echo -n "Starting Tracking Deamon .... "
    while [ true ]
    do
        track
        sleep 60 #1 minute
    done
    track
    ;;

  init)

    #if file does not exists
    if [ ! -f $DB ]; then
      echo "Initialize db in $DB"
      sqlite3 $DB "CREATE TABLE activity ( unixtime INTEGER NOT NULL, window TEXT NOT NULL, PRIMARY KEY(unixtime) );"
      echo "Installing crontab"
    fi

    echo "install crontab line"
    install_cron
    ;;

  once)
    echo "logging activity once"
    track
    ;;

  cronline)
    echo "Add this line to your crontab with 'crontab -e' : $CRONTAB_LINE"
    track
    ;;    

  *)
    echo "Usage: $0 init | once | start \n"
    echo "\tinit: initialize a cron line to schedule window tracking every minute (preferred way)"
    echo "\tonce: insert current active window in sqlite db"
    echo "\tstart: start a bash based loop (deprecated just for testing purpose)"
    echo "\cronline: manual installation in crontab"    
    exit 1
    ;;
esac