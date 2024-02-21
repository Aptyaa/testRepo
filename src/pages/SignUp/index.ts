import Block from '../../utils/Block'
import template from './signup.hbs'
import { blurValidation, submitValidation } from '../../utils/validation'
import router from '../../utils/Router'
import { Routes } from '../../index'
import AuthController from '../../controllers/AuthController'
import './signup.scss'
import { SignupData } from '../../api/AuthAPI'
import Input from '../../components/Input'
import { Button } from '../../components/Button'
import { Ref } from '../../components/Ref'
import Router from '../../utils/Router'

const SignupField = [
  ['email', 'text', 'Почта'],
  ['login', 'text', 'Логин'],
  ['first_name', 'text', 'Имя'],
  ['second_name', 'text', 'Фамилия'],
  ['phone', 'text', 'Телефон'],
  ['password', 'password', 'Пароль'],
  ['password', 'password', 'Пароль еще раз'],
]

export default class SignUp extends Block {
  // constructor() {
  //   super({
  //     events: {
  //       submit: submitValidation,
  //       blur: blurValidation,
  //     },
  //     ref: {
  //       onClick: () => {
  //         router.go(Routes.Login)
  //       },
  //     },
  //     button: {
  //       onSubmit: () => {
  //         let form: any = this.refs.formInfo
  //         const formData = new FormData(form._element)
  //         let data = {}
  //         for (let [name, value] of formData) {
  //           data = { ...data, [name]: value }
  //         }
  //         AuthController.singup(data as SignupData)
  //       },
  //     },
  //     pageName: 'Регистрация',
  //     inputs: [
  //       {
  //         type: 'text',
  //         placeholder: 'Почта',
  //         name: 'email',
  //       },
  //       {
  //         type: 'text',
  //         placeholder: 'Логин',
  //         name: 'login',
  //       },
  //       {
  //         type: 'text',
  //         placeholder: 'Имя',
  //         name: 'first_name',
  //       },
  //       {
  //         type: 'text',
  //         placeholder: 'Фамилия',
  //         name: 'second_name',
  //       },
  //       {
  //         type: 'text',
  //         placeholder: 'Телефон',
  //         name: 'phone',
  //       },
  //       {
  //         type: 'password',
  //         placeholder: 'Пароль',
  //         name: 'password',
  //       },
  //       {
  //         type: 'password',
  //         placeholder: 'Пароль(еще раз)',
  //         name: 'password',
  //       },
  //     ],
  //   })
  // }
  init() {
    this.children.inputs = SignupField.map(([name, type, placeholder]) => {
      return new Input({
        name,
        type,
        placeholder,
      })
    })
    this.children.button = new Button({
      label: 'Зарегистрироваться',
      type: 'submit',
      onClick: () => {
        const form = document.querySelector('form') || undefined
        const dataForm = new FormData(form)
        let data = {}
        for (const [key, value] of dataForm) {
          data = { ...data, [key]: value }
        }
        AuthController.singup(data as SignupData)
        Router.go(Routes.Profile)
      },
    })
    this.children.ref = new Ref({
      ref_name: 'Войти',
      color: 'blue',
      border_color: 'white',
      onClick: e => {
        e.preventDefault()
        Router.go(Routes.Login)
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
