import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '../aiChat/aiChat.css';
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";

const AiChat = () => {
  const[typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT!",
      sender: "ChatGPT"
    }
  ])


  

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }
    
    const newMessages = [...messages, newMessage]; // all the old messages, = the new message

    //update our message state
    setMessages(newMessages);

    // set a tyoing indicator (chatgpt is typing)
    setTyping(true);
   

    // process message to chatGpt ( send it over and see the response)
    await processMessageToChatGPT(newMessages);  
  }

  async function processMessageToChatGPT(chatMessages){
    //chatMessages {sender: "user" or "ChatGPT", message: "The message content here"}
    // apiMessages {role: "user" or "assistant", content: "The message content here"}

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if(messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    // role: "user" -> a message from the user, "assistant" -> a message from ChatGPT
    // "system" -> generally one initial message defining HOW we want ChatGPT to talk

    const systemMessage = {
      role: "system",
      content: ""
    }


    const apiRequestBody = { 
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages // [message1,message2,message3]
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY,
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      console.log(data.choices[0].message.content);
      setMessages(
        [...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]
      );
      setTyping(false);
    });
  }


  return (
    <div className='AiChat'>
       <div style={{position:"relative", height:"600px", width:"100%", paddingTop:"100px"}}>
          <MainContainer>
             <ChatContainer>
                <MessageList 
                  className="message-list-custom"
                  scrollBehavior='smooth'
                   typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
                >
                  
                   {messages.map((message, i) => {
                     return <Message key={i} model={message} className={message.sender === 'user' ? 'message-sent' : 'message-received'} />
                   })}
                </MessageList>
                <MessageInput placeholder='Type message here' onSend={handleSend}/>
             </ChatContainer>
          </MainContainer>
       </div>
    </div>
  )
  ;
};

export default AiChat;
