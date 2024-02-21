import ChatsController from '../../controllers/ChatsController'
import UserController from '../../controllers/UserController'
import Block from '../../utils/Block'
import { Button } from '../Button'
import template from './popup.hbs'
import './popup.scss'

interface ModalProps {
  describeAction?: string
  type: 'text' | 'file'
  action?: string
  hidden?: 'hidden'
}

export default class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      events: {
        keydown: (e: any) => {
          const popup = document.querySelector('.wrapper-popup') as HTMLElement
          if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
            popup.classList.add('hidden')
          }
        },
      },
    })
  }
  init() {
    this.children.button = new Button({
      label: 'Поменять аватарку',
      type: 'button',

      onClick: e => {
        e.preventDefault()
        const fileInput = document.querySelector(
          '.file-input',
        ) as HTMLFormElement
        if (fileInput.type === 'file') {
          const avatar = fileInput.files?.item(0)
          const formData = new FormData()
          formData.append('avatar', avatar)
          UserController.changeAvatar(formData)
        } else {
          const value = fileInput.value
          console.log(value)
          ChatsController.create(value)
          this.init()
        }

        document.querySelector('.wrapper-popup')?.classList.toggle('hidden')
      },
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
