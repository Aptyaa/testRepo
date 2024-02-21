import Block from '../../utils/Block'
import template from './profile.hbs'
import './profile.scss'
import { Routes } from '../../index'
import store, { StoreEvents, withStore } from '../../utils/Store'
import AuthController from '../../controllers/AuthController'
import { SigninData, UserData } from '../../api/AuthAPI'
import InfoInput from '../../components/InfoInput'
import { Ref } from '../../components/Ref'
import UserPhoto from '../../components/UserPhoto'
import { Button } from '../../components/Button'
import UserController from '../../controllers/UserController'
import Router from '../../utils/Router'
import PopUp from '../../components/Modal'
import { isEqual } from '../../utils/helpers'

interface ProfileProps extends UserData {}

const userFields = [
  ['Почта', 'email'],
  ['Логин', 'login'],
  ['Имя', 'first_name'],
  ['Фамилия', 'second_name'],
  ['Имя в чате', 'display_name'],
  ['Телефон', 'phone'],
]

class Profile extends Block {
  init() {
    this.children.popup = new PopUp({
      describeAction: 'Загрузите файл',
      type: 'file',
      action: 'Выберите файл на компьютере',
      hidden: 'hidden',
    })
    this.children.photo = new UserPhoto({
      src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
      alt: 'Фото пользователя',
      name: this.props['first_name'],
      onClick: () => {
        const popup = document.querySelector('.wrapper-popup') as HTMLElement
        popup.classList.toggle('hidden')
      },
    })
    this.children.inputs = userFields.map(([field, name]) => {
      return new InfoInput({
        field,
        name,
        value: this.props[name],
        disabled: true,
      })
    })
    this.children.settings = new Ref({
      ref_name: 'Изменить данные',
      onClick: e => {
        e.preventDefault()

        this.children.inputs.forEach(
          (input: any) => (input.props.disabled = false),
        )
        const refers = document.querySelector('.refers') as HTMLElement
        refers.style.display = 'none'
        const btn = document.querySelector('.submit') as HTMLElement
        btn.style.display = 'block'
        console.log(btn)
      },
    })
    this.children.password = new Ref({
      ref_name: 'Изменить пароль',
      onClick: e => {
        e.preventDefault()
        Router.go(Routes.Password)
      },
    })
    this.children.exit = new Ref({
      ref_name: 'Выйти',
      color: 'red',
      border_color: 'red',
      onClick: e => {
        e.preventDefault()
        AuthController.logout()
      },
    })
    this.children.button = new Button({
      type: 'button',
      label: 'Сохранить',
      display: 'none',
      class: 'submit',
      onClick: e => {
        console.log('click')
        e.preventDefault()
        const form = document.querySelector(
          '.container-info',
        ) as HTMLFormElement
        const dataForm = new FormData(form)
        let data = {}
        for (const [key, value] of dataForm) {
          data = { ...data, [key]: value }
        }
        UserController.changeProfile(data as UserData)

        const refers = document.querySelector('.refers') as HTMLElement
        refers.style.display = 'block'
        const btn = document.querySelector('.submit') as HTMLElement
        btn.style.display = 'none'
        ;(this.children.inputs as Array<Block>).forEach(
          (input: any) => (input.props.disabled = true),
        )
      },
    })
  }

  protected componentDidUpdate(oldProps: ProfileProps, newProps: any): boolean {
    /**
     * Обновляем детей
     */
    // eslint-disable-next-line no-extra-semi
    ;(this.children.inputs as InfoInput[]).forEach((input, i) => {
      input.setProps({ value: newProps[userFields[i][1]] })
    })
    //  Другой вариант — просто заново создать всех детей. Но тогда метод должен возвращать true, чтобы новые дети отрендерились
    this.children.photo = new UserPhoto({
      ...this.props,
      name: newProps['first_name'],
      src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
    })

    // this.children.inputs = userFields.map(([field, name]) => {
    //   return new InfoInput({ field, name, value: newProps[name] })
    // })
    /**
     * Так как мы обновили детей, этот компонент не обязательно рендерить
     */
    return true
  }

  render() {
    return this.compile(template, this.props)
  }
}

// const withUser = withStore(state => ({ ...state.user }))

// export default withUser(Profile)

export default Profile
