import io from 'socket.io-client';

export const socket = io();

export function subscribe(event: string, callback: (...args : any[]) => void) {
  socket.on(event, callback);
}

export function emit(event: string, msg?: string) {
  socket.emit(event, msg);
}