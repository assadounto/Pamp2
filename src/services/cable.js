import { cableURL } from "./http";

// src/services/cable.js
class WebSocketService {
    constructor() {
        this.socketRef = null;
        this.room = null;
    }

    connect(room,user_id) {
        this.room = room;
        this.user_id=user_id
        this.socketRef = new WebSocket(cableURL);

        this.socketRef.onopen = () => {
            console.log('WebSocket connected');
            this.socketRef.send(JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({ channel: 'ChatChannel', room,user_id })
            }));
        };

        this.socketRef.onclose = (e) => {
            console.log('WebSocket disconnected', e);
            // Attempt to reconnect after a delay
            setTimeout(() => {
                this.connect(this.room, this.user_id);
            }, 3000); // Adjust the delay as needed
        };

        this.socketRef.onerror = (e) => {
            console.log('WebSocket error', e.message);
        };
    }

    disconnect() {
        if (this.socketRef) {
            this.socketRef.close();
        }
    }

    send(data) {
        this.socketRef.send(JSON.stringify({
            command: 'message',
            identifier: JSON.stringify({ channel: 'ChatChannel', room: data.room }),
            data: JSON.stringify(data)
        }));
    }

    onMessage(callback) {
        this.socketRef.onmessage = (e) => {
            const message = JSON.parse(e.data);
           
            if (message.type === 'ping') return;
            if (message.message) callback(message.message);
        };
    }
}

const WebSocketInstance = new WebSocketService();
export default WebSocketInstance;
