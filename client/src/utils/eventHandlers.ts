import io from 'socket.io-client';

const socket = io.connect();

export function subscribe(event: string, callback: Function) {
  socket.on(event, callback);
}

export function emit(event: string, msg?: string) {
  socket.emit(event, msg);
}