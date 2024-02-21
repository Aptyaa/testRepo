import Block from '../../utils/Block'
import template from './passwordchange.hbs'
import '../Profile/profile.scss'
import '../PasswordChange/passwordchange.scss'
import { blurValidation, submitValidation } from '../../utils/validation'
import UserPhoto from '../../components/UserPhoto'
import InfoInput from '../../components/InfoInput'
import { Button } from '../../components/Button'
import UserController from '../../controllers/UserController'
import { UserPassword } from '../../api/UsersAPI'
import Router from '../../utils/Router'
import { Routes } from '../../index'
import AuthController from '../../controllers/AuthController'
import { withStore } from '../../utils/Store'

const userFields = [
  ['Старый пароль', 'oldPassword'],
  ['Новый пароль', 'newPassword'],
  ['Повторите новый пароль', 'newPassword'],
]

class PasswordChange extends Block {
  init() {
    this.children.photo = new UserPhoto({
      src: '',
      alt: 'Фото пользователя',
      name: this.props['first_name'],
    })
    this.children.inputs = userFields.map(([field, name]) => {
      return new InfoInput({
        field,
        name,
        disabled: false,
      })
    })
    this.children.button = new Button({
      type: 'button',
      label: 'Сохранить',
      onClick: e => {
        e.preventDefault()
        const form = document.querySelector('form') || undefined
        const dataForm = new FormData(form)
        let data = {}
        for (const [key, value] of dataForm) {
          data = { ...data, [key]: value }
        }
        console.log(data)
        UserController.changePassword(data as UserPassword)
        Router.go(Routes.Profile)
      },
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
const withPass = withStore(state => ({ ...state.user }))
export default withPass(PasswordChange)
