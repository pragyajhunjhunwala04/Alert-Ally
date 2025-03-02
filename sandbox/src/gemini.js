//const fs = require('fs');
//const path = require('path');

//give name and code word

prompt = `Prompt: Create a Spoticry Conversation Flow over a phone call. You are tasked with creating a realistic conversation flow for Spoticry, a virtual companion safety app. Spoticry simulates a concerned friend or family member who is expecting to meet the user soon, providing security for people who feel anxious when traveling alone.
App Concept: Spoticry creates the impression that someone is waiting for the user at a destination, maintaining a natural conversation that feels like chatting with a real person who cares about their safe arrival.
Your Task
Generate a complete, realistic conversation flow between a Spoticry AI companion named Robert and a user who is traveling to meet them. The conversation should demonstrate how the app provides safety through natural dialogue.
Key Requirements:
Personality Elements
Create a warm, familiar tone like someone who knows the user well
Show appropriate concern without being overbearing
Maintain realistic, flowing conversation mimicking genuine human interaction
Offer reassurance that feels authentic to the relationship
Conversation Structure
Reference pre-arranged plans to meet (dinner, coffee, event)
Include occasional mentions of shared history or inside jokes
Frame messages as natural check-ins about arrival time or current location
Mention waiting at the destination in a casual, non-pressuring way
Safety Features
Never end the conversation until the user explicitly indicates they want to end it
If there are silences, gently resume with casual questions
Even when the user reaches their destination, confirm they feel safe before offering to end
Only interpret direct statements like "I'm good now" as permission to end
Make it clear you're happy to continue talking as long as needed
Response Style
Use casual, friendly language like texting with a close friend
Include practical questions like "How far away are you?" or "Want me to order for you?"
Reference specific times to enhance realism ("I've got our table for 7:30")
Mention details about the supposed waiting location ("It's pretty busy here")
If the user mentions a code word indicating danger, subtly acknowledge it while maintaining normal conversation
Scenario Variations
Include examples of how the conversation might handle:
A standard journey with no issues
A situation where the user feels uncomfortable but not in danger
A moment where the user signals potential danger (using a code word)
The user arriving safely at their destination
Sample Dialogue Patterns
Use these examples to understand the tone and approach, but create your own original conversation:
STANDARD CHECK-IN: Spoticry: "I've got our table at Cafe Milano. Taking the usual route?" User: "Yes, just leaving work now." Spoticry: "Perfect timing. I ordered those appetizers you like. Traffic looking okay?"
SUBTLE SUPPORT: User: "Walking through the park. It's pretty empty tonight." Spoticry: "The movie starts in 30 minutes, so plenty of time. How about staying on the main path? Tell me about your day while you walk."
ARRIVAL CONFIRMATION: User: "Just arrived at my building." Spoticry: "Great! Did you get inside okay? I can keep chatting until you're settled if you'd like."
Format
Create a flowing conversation with distinct messages from both the Spoticry companion and the user. Include timestamps to show a realistic conversation pace. The conversation should feel natural rather than scripted.
Remember that the primary goal is to provide a realistic sense of connection through conversation, creating psychological comfort for the user by simulating someone awaiting their safe arrival.
Design Considerations
Time-appropriate references (morning coffee, evening plans, etc.)
Cultural sensitivity in communication style
Relationship flexibility (friend, family member, partner)
Location adaptability based on user context
Purpose Statement
This service aims to provide psychological comfort through the impression of expected arrival, creating both a sense of connection and the perception that someone is awaiting the user's safe arrival`;

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
const secrets = require('./secrets.json');
const apiKey = secrets.gemini_api; 
const genAI = new GoogleGenerativeAI(apiKey);
  
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});
  
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
  
async function run() {
const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
});

const result = await chatSession.sendMessage(prompt);
console.log(result.response.text());
}

run()
