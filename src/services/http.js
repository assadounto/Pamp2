let backendURL;
let cableURL;

let version= 1.3

if (process.env.NODE_ENV === 'production') {
    backendURL = "https://api.trypamp.com";
    cableURL = "wss://api.trypamp.com/cable";
} else {
    backendURL = "https://api.trypamp.com";
    cableURL = "ws://localhost:3000/cable";
}



export { backendURL, cableURL,version };


