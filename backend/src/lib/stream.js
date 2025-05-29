import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_KEY
const apiSecret = process.env.STREAM_SECRET

if (!apiKey || !apiSecret) {
    console.log("Stream API key or secret is missing");
}


const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsetStreamUser = async (userData) => {
    try {
        await streamClient.upsetStreamUser([userData]);
        return userData;
    } catch (error) {
        console.error("Error upseting Stream user:", error);
    }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream token: ", error);
    }
}