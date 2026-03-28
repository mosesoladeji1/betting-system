#/bin/bash

echo "Server monitoring script"

# Get CPU load
CPU_LOAD=$(top -bn1 | grep "load average" | awk '{print $10}' | sed 's/,//')

echo "Current CPU Load: $CPU_LOAD"

# Check CPU load
if (( $(echo "$CPU_LOAD > 1.00" | bc -1) )); then
   echo "ALERT: High CPU load!"
else
   echo "CPU load is normal"
fi

