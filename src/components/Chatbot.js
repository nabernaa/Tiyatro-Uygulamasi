import React, { useState } from 'react';
import '../styles/Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark,faCommentDots, faRobot, faUserCircle  } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, user: 'user' }]);
            setInput('');
            // Bot cevabını simüle et
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { text: 'Bu bir bot cevabıdır', user: 'bot' }]);
            }, 1000);
        }
    };

    return (
        <div>
            {!isOpen && (
                <span className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon icon={faCommentDots} fontSize={36}/>
                </span>
            )}
            {isOpen && (
                <div className="chatbot">
                    
                    <div className="chatbot-header">
                        Canlı Destek <span className="close-button" onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faCircleXmark}/></span>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.user}`}>
                                {msg.user === 'bot' && (
                                    <div className="message-content">
                                        <div className="icon bot-icon">
                                            <FontAwesomeIcon icon={faRobot} fontSize={24}/>
                                        </div>
                                        <div className="text">{msg.text}</div>
                                    </div>
                                )}
                                {msg.user === 'user' && (
                                    <div className="message-content">
                                        <div className="text">{msg.text}</div>
                                        <div className="icon user-icon">
                                            <FontAwesomeIcon icon={faUserCircle} fontSize={24}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Mesajınızı buraya yazın..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend}>Gönder</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

