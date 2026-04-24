#/bin/bash

echo "=============================="
echo "   SERVER MONITORING SYSTEM   "
echo "=============================="

# CPU CHECK FUNCTION
check_cpu() {
    CPU_LOAD=$(top -bn1 | grep "load average" | awk '{print $10}' | sed 's/,//')
    echo  "Current CPU Load: $CPU_LOAD"

    CPU_INT=$(printf "%.0f" "$CPU_LOAD")

      if [ "$CPU_INT" -gt 1 ]; then
          echo "ALERT: High CPU load!"
      else
          echo "CPU load is normal"
      fi
}

echo "------------------------------"

# MEMORY CHECK FUNCTION
check_memory() {
    MEMORY_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
    echo "Current Memory Usage: $MEMORY_USAGE%"

    MEM_INT=$(printf "%.0f" "$MEMORY_USAGE")

    if [ "$MEM_INT" -gt 50 ];then
        echo "ALERT: High memory usage!"
    else
        echo "Memory usage is normal"
    fi
}

echo "------------------------------"

# RUN CHECKS
check_cpu
echo "------------------------------"
check_memory

echo "=============================="
echo "    Monitoring Completed"
echo "=============================="
