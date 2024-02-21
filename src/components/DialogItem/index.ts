import { ChatInfo } from '../../api/ChatsAPI'
import Block from '../../utils/Block'
import template from './dialogItem.hbs'
import './dialogItem.scss'

export interface DialogItemProps {
  id: number
  src_avatar: string
  name: string

  last_message?: string
  message_time?: string
  message_count?: number
  events?: {
    click: () => void
  }
}

export default class DialogItem extends Block {
  constructor(props: DialogItemProps) {
    super(props)
  }

  render() {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
    })
  }
}
