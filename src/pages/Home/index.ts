import Block from '../../utils/Block'
import template from './homepage.hbs'
import router from '../../utils/Router'
import { Routes } from '../../index'
import { Ref } from '../../components/Ref'

export default class Home extends Block {
  constructor() {
    super({
      login: {
        onClick: () => {
          router.go(Routes.Login)
        },
      },
      signup: {
        onClick: () => {
          router.go(Routes.Signup)
        },
      },
      profile: {
        onClick: () => {
          router.go(Routes.Profile)
        },
      },
      settings: {
        onClick: () => {
          router.go(Routes.Settings)
        },
      },
      changePass: {
        onClick: () => {
          router.go(Routes.Password)
        },
      },
      chat: {
        onClick: () => {
          router.go(Routes.Messenger)
        },
      },
      page404: {
        onClick: () => {
          // render('page404')
        },
      },
      page500: {
        onClick: () => {
          // render('page500')
        },
      },
    })
  }
  init() {
    this.children.login = new Ref({
      ref_name: 'Login',
      onClick: () => {
        router.go(Routes.Login)
      },
    })
    this.children.signup = new Ref({
      ref_name: 'Singup',
      onClick: () => {
        router.go(Routes.Signup)
      },
    })
    this.children.chat = new Ref({
      ref_name: 'Chat',
      onClick: () => {
        router.go(Routes.Messenger)
      },
    })
    this.children.profile = new Ref({
      ref_name: 'Profile',
      onClick: () => {
        router.go(Routes.Profile)
      },
    })
    this.children.settings = new Ref({
      ref_name: 'Settings',
      onClick: () => {
        router.go(Routes.Settings)
      },
    })
    this.children.password = new Ref({
      ref_name: 'Password',
      onClick: () => {
        router.go(Routes.Password)
      },
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
