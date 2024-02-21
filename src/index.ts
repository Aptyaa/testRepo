import Router from './utils/Router'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import PasswordChange from './pages/PasswordChange'
import ChatPage from './pages/ChatPage'
import { LoginPage } from './pages/Login'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'

export enum Routes {
  Home = '/',
  Signup = '/sign-up',
  Login = '/login',
  Profile = '/profile',
  Password = '/password',
  Messenger = '/messenger',
}

window.addEventListener('DOMContentLoaded', () => {
  Router.use(Routes.Signup, SignUp)
    .use(Routes.Home, Home)
    .use(Routes.Login, LoginPage)
    .use(Routes.Profile, Profile)
    .use(Routes.Password, PasswordChange)
    .use(Routes.Messenger, ChatPage)
    .start()
})
