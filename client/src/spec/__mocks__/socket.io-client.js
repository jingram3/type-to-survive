// socket.io-client.js

const io = jest.genMockFromModule('socket.io-client');

let EVENTS = {
  'request players': [() => undefined],
  'player change': []
};
function emit(event, ...args) {
  EVENTS[event].forEach(func => func(...args));
}
const socket = {
  on(event, func) {
    if (EVENTS[event]) {
      return EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
  },
  emit
};

// cleanup helper
export function cleanUp() {
  EVENTS = {}
}

io.emit = emit;
io.connect = () => socket;
io.cleanUp = cleanUp;
io.socket = socket;

module.exports = io;