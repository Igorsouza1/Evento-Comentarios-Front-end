import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg'
import { api } from '../../services/api'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type MessageProps = {
    id: string;
    text: string;
    users: {
        name: string;   
        avatar_url: string;
    }
}

let messagesQueue: MessageProps[] = []

const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage: MessageProps ) => {
    messagesQueue.push(newMessage)
})



export function MessageList(){
    const [messages, setMessages] = useState<MessageProps[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            if(messagesQueue.length > 0){
                setMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1],
                ].filter(Boolean))  

                messagesQueue.shift()
            }
        }, 3000)
    }, [])

    useEffect(() => {
        api.get<MessageProps[]>('messages/last3').then(response => {
            setMessages(response.data)
        })
    }, [])


    return(
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="doWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map(message => {
                    return(
                        <li key={message.id} className={styles.message}>
                        <p className={styles.messageContent}>
                            {message.text}
                        </p>    
                        <div className={styles.messageUser}>
                            <div className={styles.userImg}>
                                <img src={message.users.avatar_url} alt={message.users.name} />
                            </div>
                            <span>{message.users.name}</span>
                        </div>
                    </li>
                    )
                })}
            </ul>

        </div>
    )
}