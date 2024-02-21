import Block from '../../utils/Block'
import template from './userPhoto.hbs'
import './userPhoto.scss'

interface UserPhotoProps {
  src: string
  alt: string
  onClick?: () => void
  name?: string
}

export default class UserPhoto extends Block {
  constructor(props: UserPhotoProps) {
    super({ ...props, events: { click: props.onClick } })
  }
  render() {
    return this.compile(template, this.props)
  }
}
