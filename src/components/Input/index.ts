import Block from '../../utils/Block'
import template from './input.hbs'
import './input.scss'

interface InputProps {
  value?: string
  type: string
  placeholder: string
  name: string
  class?: string
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props })
  }

  getValue() {
    return (this.element as HTMLInputElement).value
  }
  setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value)
  }
  render() {
    return this.compile(template, this.props)
  }
}
