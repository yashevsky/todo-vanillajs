import { closeModal, isModalOpened, openModal } from './modal'
import type { changeCounterType } from './types'

const input: HTMLInputElement = document.querySelector('#input')
const button = document.querySelector('#button')
const list = document.querySelector('#todo-list')
const total = document.querySelector('#total')

let counter = 0

const isInputEmpty = () => {
    let result = true
    if (input.value === '') {
        result = true
    } else {
        result = false
    }
    return result
}

button.addEventListener('click', () => {
    if (!isInputEmpty()) {
        createElements(input.value)
        input.value = ''
    }
    openModal()
})

document.addEventListener('keyup', (e: KeyboardEvent) => {
    if (isModalOpened) {
        if (e.code === 'Escape') closeModal()
    } else return
})

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
        openModal()
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

input.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.code === 'Enter' && !isInputEmpty()) {
        createElements(input.value)
        input.value = ''
    }
    openModal()
})
