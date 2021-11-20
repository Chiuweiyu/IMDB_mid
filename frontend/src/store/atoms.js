import {atom} from "recoil";

export const emailInputState = atom({
    key: 'emailInputState',
    default: ''
})

export const userState = atom({
    key: 'userState',
    default: null
})

export const messageState = atom({
    key: 'messageState',
    default: 'Welcome to Din-Ben-Ton 2.0'
})

export const connectToWalletState = atom({
    key: 'connectToWalletState',
    default: false
})

export const selectedCompanyIdState = atom({
    key: 'selectedCompanyIdState',
    default: null
})

export const todayCompanyState = atom({
    key: 'todayCompanyState',
    default: null
})

export const userOrderState = atom({
    key: 'userOrderState',
    default: []
})

export const todayOrderState = atom({
    key: 'todayOrderState',
    default: []
})