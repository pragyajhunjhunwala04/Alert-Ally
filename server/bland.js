import Axios from "axios";
import fs from 'fs';

const gemini_task_output = "";
const secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
const headers = {
    authorization: secrets.bland_api,
};
  
  // Data
  const data = {
    phone_number: "+16508805494",
    task: gemini_task_output,
    voice_id: 0,
    language: "eng",
    request_data: {
      calling: "Pragya",  //change to user's name?
      bag_claim: "69683",
      airline_code: "UA123",
    },
    record: true,
    reduce_latency: true,
    ivr_mode: true,
  };
  
  // API request
  await Axios.post("https://api.bland.ai/v1/calls", data, { headers });