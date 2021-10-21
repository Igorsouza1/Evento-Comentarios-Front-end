import { useContext, useState, FormEvent } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export function SendMessageForm(){
    const { user, SignOut } = useContext(AuthContext)
    const [message, setMessage] = useState('')

    async function HandlesendMessage(event: FormEvent){
        event.preventDefault();

        if(!message.trim()){
            return
        }
        await api.post('messages', { message })
        
        setMessage('')
    }

    return(
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={SignOut} className={styles.signOutButton}>
                <VscSignOut size="32"/>
            </button>

            <header className={styles.userInfomation}>
                <div className={styles.userImg}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16"/>
                    {user?.login}
                </span>
            </header>

            <form onSubmit={HandlesendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                 name="message" 
                 id="message" 
                 placeholder="Qual sua expectativa para o evento?"
                 onChange={event => setMessage(event.target.value)}
                 value={message} />

                <button type="submit">Enviar Mensagem</button>
            </form>
        </div>
    )
}