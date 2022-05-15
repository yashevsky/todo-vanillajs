const input: HTMLInputElement = document.querySelector('#input')
const button = document.querySelector('#button')
const list = document.querySelector('#todo-list')
const total = document.querySelector('#total')
let counter = 0

button.addEventListener('click', () => {
    if (input.value === '') return
    createElements(input.value)
    input.value = ''
})

const createElements = (value: string) => {
    counter++

    const li = document.createElement('li')
    const btn = document.createElement('button')

    li.className = 'todo-list__item'
    li.textContent = value
    btn.className = 'button'
    btn.textContent = 'remove'

    btn.addEventListener('click', () => {
        counter--
        list.removeChild(li)
        total.textContent = counter.toString()
    })

    li.addEventListener('click', (event) => {
        const target = event.target as Element
        target.classList.toggle('active')
    })

    li.appendChild(btn)
    list.appendChild(li)
    total.textContent = counter.toString()
}
