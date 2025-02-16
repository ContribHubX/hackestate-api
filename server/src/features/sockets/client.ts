import { type Socket } from "socket.io"

type ClientEventCallback = (data: object) => void;

class Client {
    public readonly socket: Socket; 

    constructor(socket: Socket) {
        this.socket = socket;
    }

    /** 
     * Register an event callback to the client
     * 
     * @param event Event name
     * @param callback Callback function
     */
    on(event: string, callback: ClientEventCallback): void {
        this.socket.on(`client__${event}`, callback);
    }

    /**
     * Send packet to the client
     * 
     * @param identifier Packet type identifier
     * @param data Data to send to the client
     */
    send<T>(identifier: string, data: T): void {
        this.socket.emit("recv", {
            ...data,
            eventType: identifier 
        })
    }

    /**
     * Unregister all events registered to the client
     */
    offAll(): void {
        this.socket.removeAllListeners();
    }

    /** 
     * Helper function to test if both clients match 
     * 
     * @param other The other client instance to test against
     */
    is(other: Client): boolean { 
        return this.socket.id === other.socket.id;
    }
}

export default Client;