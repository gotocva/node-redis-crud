
### Install redis on ubuntu 

$ sudo apt update

$ sudo apt install redis-server

$ sudo nano /etc/redis/redis.conf

```
# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.

supervised systemd // change no => systemd
bind 127.0.0.1 ::1 // uncomment this => remove # before this line 
requirepass foobared // change foobared to any strong password 

```


$ sudo systemctl restart redis.service

$ sudo systemctl restart redis