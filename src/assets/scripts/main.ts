import { closeModal, isModalOpened, openModal } from './modal'
import type { changeCounterType, TodoType } from './types'

const { localStorage } = window

const input: HTMLInputElement = document.querySelector('#input')
const button = document.querySelector('#button')
const list = document.querySelector('#todo-list')
const total = document.querySelector('#total')

let counter = 0

type todoArr = TodoType[] | undefined

let todoArr: todoArr = localStorage.getItem('todoItems')
    ? JSON.parse(localStorage.getItem('todoItems'))
    : []

const isInputEmpty = () => input.value === ''

const changeCounter: (type: changeCounterType) => void = (type) => {
    switch (type) {
        case 'dec':
            counter--
            break
        case 'inc':
            counter++
            break
        default:
            return
    }
}

const createElements = (value: string) => {
    changeCounter('inc')

    const li = createElement('li')
    const btn = createElement('button')

    li.className = 'todo-list__item'
    li.textContent = value
    btn.className = 'button'
    btn.textContent = 'remove'

    btn.addEventListener('click', () => {
        changeCounter('dec')
        list.removeChild(li)
        total.textContent = counter.toString()
        // нужно записывать не в рез а в тудуАрр
        todoArr = todoArr.filter((item) => item !== value.toLowerCase())
        localStorage.setItem('todoItems', JSON.stringify(todoArr))
        openModal('Вы удалили задачу!')
    })

    li.addEventListener('click', (event: Event) => {
        const target = event.target as Element
        target.classList.toggle('active')
    })

    li.appendChild(btn)
    list.insertBefore(li, list.firstChild)
    total.textContent = counter.toString()
}

const createElement = (tag: any) => {
    let res
    switch (tag) {
        case 'li':
            res = document.createElement(tag)
            break
        case 'button':
            res = document.createElement(tag)
            break
    }
    return res
}

// close modal

document.addEventListener('keyup', (e: KeyboardEvent) => {
    if (isModalOpened) {
        if (e.code === 'Escape') closeModal()
    } else return
})

// add todo
button.addEventListener('click', () => {
    if (!isInputEmpty()) {
        createElements(input.value)
        todoArr.unshift(input.value)
        localStorage.setItem('todoItems', JSON.stringify(todoArr))
        input.value = ''
        openModal('Добавлена задача!')
    }
})

input.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.code === 'Enter' && !isInputEmpty()) {
        createElements(input.value)
        todoArr.unshift(input.value)
        localStorage.setItem('todoItems', JSON.stringify(todoArr))
        input.value = ''
        openModal('Добавлена задача!')
    }
})
if (localStorage.getItem('todoItems')) {
    const arr = Array.from(JSON.parse(localStorage.getItem('todoItems')))

    arr.reverse().forEach((element: string) => {
        createElements(element)
    })
}
