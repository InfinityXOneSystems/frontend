/**
 * Centralized Logging Utility
 * Handles standard logging to console and stores logs for diagnostic display.
 */

export const logger = {
  logs: [],
  listeners: [],
  
  /**
   * Add a log entry
   * @param {string} type - 'info', 'error', 'warning', 'request', 'response'
   * @param {string} message - Human readable message
   * @param {any} data - Optional data payload
   */
  add(type, message, data = null) {
    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      type,
      message,
      data: data ? JSON.parse(JSON.stringify(data)) : null // simple deep copy
    };
    
    // Maintain fixed size buffer
    this.logs.unshift(entry);
    if (this.logs.length > 100) this.logs.pop();
    
    // Console output with styling
    const styles = {
      info: 'color: #0091FF',
      error: 'color: #ff4d4f; font-weight: bold',
      warning: 'color: #faad14',
      request: 'color: #52c41a',
      response: 'color: #13c2c2'
    };

    console.groupCollapsed(`%c[${type.toUpperCase()}] ${message}`, styles[type] || 'color: white');
    console.log('Timestamp:', entry.timestamp);
    if (data) console.log('Data:', data);
    console.groupEnd();
    
    this.notify();
  },
  
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  
  notify() {
    this.listeners.forEach(l => l(this.logs));
  },
  
  getLogs() {
    return this.logs;
  },
  
  clear() {
    this.logs = [];
    this.notify();
  }
};