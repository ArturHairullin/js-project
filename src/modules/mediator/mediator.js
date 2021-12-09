// Оставляем возможность использовать в частных случаях
export class Mediator {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event, callback) {
        this.listeners[event] = this.listeners[event]
            .filter(listener => listener !== callback);
    }

    emit(event, ...args) {
        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}

// Экспорт единой точки входа для общих событий
export const mediator = new Mediator();
