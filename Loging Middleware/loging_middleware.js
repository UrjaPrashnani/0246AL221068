

export function createLogger() {
  const logs = [];

  function log(action, details = {}) {
    const entry = {
      id: Date.now(),
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    logs.push(entry);
    console.log('[Logger]', entry);
  }

  function getLogs() {
    return [...logs];
  }

  function clearLogs() {
    logs.length = 0;
  }

  return { log, getLogs, clearLogs };
}
