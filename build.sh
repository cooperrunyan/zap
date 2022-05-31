#!/bin/bash

declare -a cmds=(
  "yarn build:cli"
  "yarn build:vite"
  "yarn build:electron"
)

for cmd in "${cmds[@]}"; do {
  echo "Process \"$cmd\" started"
  $cmd &
  pid=$!
  PID_LIST+=" $pid"
}; done

trap "kill $PID_LIST" SIGINT

echo "Parallel processes have started"

wait $PID_LIST

echo
echo "All processes have completed"
