// bland.js
import axios from "axios";
import { run } from './gemini.js';
// import { createRequire } from 'module';
import secrets from "./secrets.json"

// // Create a require function
// const require = createRequire(import.meta.url);
// // Use require for JSON files which don't have a default ES module loading mechanism
// const secrets = require('./secrets.json');

async function makeCall() {
    try {
        // Get the conversation from Gemini
        const gemini_task_output = await run();
        
        // Headers for Bland API
        const headers = {
            authorization: secrets.bland_api
        };
        
        // Data for Bland API
        const data = {
            phone_number: "+16508805494",
            task: gemini_task_output,
            voice_id: 0,
            language: "eng",
            request_data: {
                calling: "Pragya"
            },
            record: true,
            reduce_latency: true,
            ivr_mode: true,
        };
        
        // Make API request to Bland.ai
        const response = await axios.post("https://api.bland.ai/v1/calls", data, { headers });
        console.log("Call initiated:", response.data);
    } catch (error) {
        console.error("Error making call:", error);
        throw error;
    }
}

// Execute the function
export default makeCall;