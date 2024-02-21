import Block from '../../utils/Block'
import { Routes } from '../../index'
import template from './sidebar.hbs'
import './sidebar.scss'
import { Ref } from '../Ref'
import Router from '../../utils/Router'
import store, { withStore } from '../../utils/Store'
import Popup from '../PopupCreate'
import Modal from '../Modal'
import { ChatInfo } from '../../api/ChatsAPI'
import DialogItem from '../DialogItem'
import ChatsController from '../../controllers/ChatsController'

interface SidebarProps {
  chats: ChatInfo[]
  isLoaded: boolean
}

class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super({
      ...props,
      events: {
        click: (e: any) => {
          const popupChat = document.querySelector(
            '.popup-create',
          ) as HTMLButtonElement
          const wrp = document.querySelector('.wrapper-popup') as HTMLElement

          if (
            e.target.tagName === 'BUTTON' &&
            !e.target.classList.contains('button')
          ) {
            popupChat.classList.toggle('hidden')
          }
          if (e.target.className === 'add') {
            console.log('add')
            wrp.classList.toggle('hidden')
            popupChat.classList.add('hidden')
          }
          if (e.target.className === 'delete') {
            console.log('delete')
            wrp.classList.toggle('hidden')
            popupChat.classList.add('hidden')
          }
        },
      },
    })
  }

  init() {
    ChatsController.fetchChats()
    if (this.props.chats) this.children.chats = this.createChats(this.props)
    this.children.ref = new Ref({
      ref_name: 'Профиль',
      className: 'header_navigation',
      color: 'inherit',
      border_color: 'inherit',
      onClick: e => {
        e.preventDefault()
        Router.go(Routes.Profile)
      },
    })

    this.children.popupChat = new Popup({
      addField: 'Добавить чат',
      deleteField: 'Удалить чат',
    })
    this.children.popup = new Modal({
      type: 'text',
      describeAction: 'Создать чат',
      action: 'название чата',
    })
  }
  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.chats = this.createChats(newProps)
    return true
  }

  private createChats(props: SidebarProps) {
    return props.chats.map((data: any) => {
      return new DialogItem({
        id: data.id,
        src_avatar: data.avatar,
        name: data.title,
        last_message: data.last_message?.content,
        message_time: data.last_message?.time
          .split('T')[1]
          .split(':')
          .slice(0, 2)
          .join(':'),
        message_count: data.unread_count,
        events: {
          click: () => {
            ChatsController.selectChat(data.id)
          },
        },
      })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withChats = withStore((state: any) => ({
  chats: state.chats,
  isLoaded: true,
}))
export default withChats(Sidebar)
