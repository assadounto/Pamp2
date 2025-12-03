let backendURL;
let cableURL;

let version= "1.4.1"

if (process.env.NODE_ENV === 'production') {
    backendURL = "https://api.trypamp.com";
    cableURL = "wss://api.trypamp.com/cable";
} else {
    backendURL = "https://api.trypamp.com";
    cableURL = "wss://api.trypamp.com/cable";
}



export { backendURL, cableURL,version };


