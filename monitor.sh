#/bin/bash

echo "Server monitoring script"

# Get CPU load
CPU_LOAD=$(top -bn1 | grep "load average" | awk '{print $10}' | sed 's/,//')

echo "Current CPU Load: $CPU_LOAD"

# Convert CPU to integer
CPU_INT=$(printf "%.0f" "$CPU_LOAD")

# Check CPU load
if [ "$CPU_INT" -gt 1 ]; then
   echo "ALERT: High CPU load!"
else
   echo "CPU load is normal"
fi

echo "------------------------"

# MEMORY CHECK
MEMORY_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100.0}')

echo "Current Memory Usage:$MEMORY_USAGE%"

# Convert Memory to integer
MEM_INT=$(printf "%.0f" "$MEMORY_USAGE")

# Check memory usage
if [ "$MEM_INT" -gt 50 ]; then
    echo "ALERT: High memory usage!"
else
    echo "Memory usage is normal"
fi
