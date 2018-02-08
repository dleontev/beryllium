import {Socket} from "phoenix";

const socketURL = "ws://localhost:4000/socket";

export default {
    initSocket(topic, payload, callback = null){ //callback must be bound to (this) and must take a parameter (messages)
        let socket = new Socket(`${socketURL}`, {token: localStorage.getItem("token")});
        socket.connect();
        let channel = socket.channel(`${topic}`, payload);
        channel.join()
					.receive("ok", ({messages}) => {
						console.log("Joined!");
						if(callback !== null){
							callback(messages);
						}
          })
					.receive("error", ({reason}) => {
						console.log("Failed to join!", reason);
					})
					.receive("timeout", () => {
						console.log("Networking issue. Still waiting...");
					});
        return {
            socket: socket,
            channel: channel
        }
    },

    onEvent(channel, event_name, callback){ //callback MUST be bound to (this) inside component
        channel.on(`${event_name}`, (msg) =>{
            callback();
        });
		},
		
		pushChannel(channel, event_name, payload, timeout, callback){ //callback must be bound to (this) and must take a parameter (messages)
			channel
			.push(`${event_name}`, payload, timeout)
				.receive("ok", (msg) => {
					console.log("created message", msg);
					callback(msg);
				})
				.receive("error", (reason) => {console.log("create failed", reason)})
        .receive("timeout", () => {console.log("Networking issue...")});
		},

    leaveChannel(channel, socket){
        channel.leave().receive("ok", () => {
					console.log("left");
					socket.disconnect();
				});
    }
}
