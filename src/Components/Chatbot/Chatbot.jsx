import React, { useRef, useState } from "react";
import "./Chatbot.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const keywords = [
  "healthcare", "doctor", "hospital", "nurse", "medicine", "medications",
  "pharmacy", "health checkup", "diagnosis", "treatment", "surgery", "operation",
  "appointment", "patient", "symptoms", "disease", "illness", "infection",
  "diabetes", "cancer", "heart disease", "blood pressure", "cholesterol",
  "vaccination", "immunization", "COVID", "flu", "fever", "cold", "cough",
  "mental health", "therapy", "counseling", "depression", "anxiety",
  "nutrition", "diet", "exercise", "fitness", "yoga", "wellness",
  "emergency", "ambulance", "ICU", "intensive care", "surgeon", "specialist",
  "dentist", "eye doctor", "dermatologist", "pediatrician", "gynecologist",
  "orthopedic", "neurologist", "cardiologist", "oncologist", "general physician",
  "primary care", "health insurance", "medical records", "telemedicine",
  "online consultation", "second opinion", "lab test", "blood test", "MRI",
  "X-ray", "CT scan", "healthcare support", "rehabilitation", "therapy sessions"
];


const isCulturalMessage = (message) => {
  return keywords.some(keyword => message.includes(keyword));
};

export default function Chatbot(props) {
  const messageListRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am Narada",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);
  const [conversationId, setConversationId] = useState(null);
  const [lastConversationId, setLastConversationId] = useState(null);

  const handleSent = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setTyping(true);

    if (isCulturalMessage(message)) {
      try {
        const response = await fetch("https://copilot5.p.rapidapi.com/copilot", {
          method: "POST",
          headers: {
            'x-rapidapi-key': 'e419ab8c9bmsh207d1141f52d94bp17f987jsnc1d87cac5dd9',
            'x-rapidapi-host': 'copilot5.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: message,
            conversation_id: conversationId,
            tone: "BALANCED",
            markdown: false,
            photo_url: null,
          }),
        });

        const data = await response.json();
        const botMessage = data.data && data.data.message;
        const newConversationId = data.data && data.data.conversation_id;

        if (lastConversationId && newConversationId !== lastConversationId) {
          console.log("Bot: New topic detected. Starting a new conversation.");
        }

        setLastConversationId(newConversationId);
        setConversationId(newConversationId);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: botMessage || "No response message found",
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setTyping(false);
      }
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "Sorry, I could not understand you.",
          sender: "ChatGPT",
          direction: "incoming",
        },
      ]);
      setTyping(false);
    }
  };

  return props.trigger ? (
    <div className="chatPopup d-flex justify-content-end align-items-center pe-3">
      <div className="chatbotApp">
        <div className="chatbotName d-flex justify-content-between px-2 py-1">
          <h3 className="align-self-center mb-0 ms-2">
            <img src="https://img.icons8.com/?size=100&id=9Otd0Js4uSYi&format=png&color=000000" style={{ height: "4rem", width: "3.8rem" }} className="me-3" />
            TalkMe!!
          </h3>
          <button className="btn me-2" onClick={() => props.setTrigger(false)}>
            <img src="https://img.icons8.com/?size=100&id=83981&format=png&color=000000" style={{ height: "2.3rem" }} />
          </button>
        </div>
        <div
          style={{ height: "80vh" }}
          className="bottomdiv"
        >
          <MainContainer style={{ borderRadius: "0 0 10px 10px" }}>
            <ChatContainer>
              <MessageList
                ref={messageListRef}
                className="py-2 messageList"
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="Narada is thinking" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  return (
                    <Message
                      key={i}
                      model={message}
                      className="messageText m-2"
                      style={{ width: "100%" }}
                    />
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSent}
                className="py-3 px-2 inputField"
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}