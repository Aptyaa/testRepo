import Block from '../../utils/Block'
import template from './chatPage.hbs'
import { submitValidation } from '../../utils/validation'
import './chat.scss'
import Sidebar from '../../components/Sidebar'
import ChatsController from '../../controllers/ChatsController'
import MessageController, {
  Message as MessageInfo,
} from '../../controllers/MessagesController'
import { withStore } from '../../utils/Store'
import Input from '../../components/Input'
import { Button } from '../../components/Button'
import SentMessage from '../../components/SentMessage'

interface ChatProps {
  selectedChat: number
  messages: MessageInfo[]
  userId: number
}

export class ChatPage extends Block {
  constructor() {
    super({
      events: {
        submit: submitValidation,
      },
    })
  }
  init() {
    console.log(this.props)
    // this.children.messages = this.createMessages(this.props)
    this.children.sidebar = new Sidebar(this.props.chats)
    this.children.input = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message',
      class: 'message-send',
    })
    this.children.button = new Button({
      class: 'button-send',
      type: 'submit',
      onClick: () => {
        const input = this.children.input as Input
        let message = input.getValue()
        input.setValue('')
        MessageController.sendMessage(this.props.selectChat!, message)
      },
    })
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.messages = newProps.messages.map((mess: MessageInfo) => {
      return new SentMessage({
        sent_message: mess.content,
      })
    })
    return true
  }
  private createMessages(props: ChatProps) {
    return props.messages?.map((mes: MessageInfo) => {
      return new SentMessage({
        sent_message: mes.content,
      })
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}

// const withChats = withStore((state: any) => {
//   const selectedChatId = state.selectChat
//   if (!selectedChatId) {
//     return {
//       messages: [],
//       selectedChat: undefined,
//       userId: state.user?.id,
//     }
//   }

//   return {
//     selectedChat: state.selectChat,
//     messages: (state.messages || {})[selectedChatId] || [],
//     userId: state.user?.id,
//   }
// })

const withChats = withStore((state: any) => ({
  ...state,
}))

// export default ChatPage
export default withChats(ChatPage)
