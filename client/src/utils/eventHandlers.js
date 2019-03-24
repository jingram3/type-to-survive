import io from 'socket.io-client';

const socket = io();

export function subscribe(event, callback) {
    socket.on(event, callback);
}

export function emit(event, msg) {
    socket.emit(event, msg);
}