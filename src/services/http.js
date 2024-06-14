let backendURL;
let cableURL;

if (process.env.NODE_ENV === 'production') {
    backendURL = "https://api.trypamp.com";
    cableURL = "wss://api.trypamp.com/cable";
} else {
    backendURL = "http://localhost:3000";
    cableURL = "ws://localhost:3000/cable";
}

export { backendURL, cableURL };


