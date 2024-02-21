import Block from '../../utils/Block'
import template from './popupCreate.hbs'
import './popupCreate.scss'

interface PopupProps {
  addField: string
  deleteField: string
}

export default class Popup extends Block {
  constructor(props: PopupProps) {
    super({
      ...props,
      events: {
        keydown: (e: any) => {
          const popup = document.querySelector('.popup-create') as HTMLElement
          if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
            popup.classList.add('hidden')
          }
        },
      },
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
