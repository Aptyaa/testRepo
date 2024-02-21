import Block from '../../utils/Block'
import template from './login.hbs'
import { blurValidation } from '../../utils/validation'
import { submitValidation } from '../../utils/validation'
import './login.scss'
import Router from '../../utils/Router'
import { Routes } from '../..'
import AuthController from '../../controllers/AuthController'
import { SigninData, SignupData } from '../../api/AuthAPI'
import Input from '../../components/Input'
import { Button } from '../../components/Button'
import { Ref } from '../../components/Ref'

export class LoginPage extends Block {
  constructor() {
    super({})
    // super({
    //   events: {
    //     // blur: blurValidation,
    //     // submit: submitValidation,
    //   },
    //   pageName: 'Вход',
    //   buttons: {
    //     type: 'submit',
    //     label: 'Войти',
    //     onSubmit: (e: Event) => {
    //       e.preventDefault()
    //       let form: any = this.refs.formInfo
    //       const formData = new FormData(form._element)
    //       let data: any = {}
    //       for (let [name, value] of formData) {
    //         data = { ...data, [name]: value }
    //       }
    //       console.log(data)
    //       AuthController.signin(data)
    //     },
    //   },
    //   ref: {
    //     href: '',
    //     onClick: () => {
    //       Router.go(Routes.Signup)
    //     },
    //   },

    //   inputs: [
    //     {
    //       type: 'text',
    //       value: '',
    //       placeholder: 'Пользователь',
    //       name: 'login',
    //     },
    //     {
    //       type: 'text',
    //       value: '',
    //       placeholder: 'Пароль',
    //       name: 'password',
    //     },
    //   ],
    // })
  }
  init() {
    this.children.login = new Input({
      name: 'login',
      type: 'input',
      placeholder: 'Логин',
    })
    this.children.password = new Input({
      name: 'password',
      type: 'input',
      placeholder: 'Пароль',
    })
    this.children.button = new Button({
      type: 'button',
      label: 'Войти',
      onClick: () => {
        const form = document.querySelector('form') || undefined
        const dataForm = new FormData(form)
        let data = {}
        for (const [key, value] of dataForm) {
          data = { ...data, [key]: value }
        }
        AuthController.signin(data as SigninData)
      },
    })
    this.children.ref = new Ref({
      ref_name: 'Создать аккаунт',
      color: 'blue',
      border_color: 'white',
      onClick: e => {
        e.preventDefault()
        Router.go(Routes.Signup)
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
