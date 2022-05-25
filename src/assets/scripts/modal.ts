const modal = document.querySelector('#modal')
const modalContent = modal.querySelector('#modal-content')
const modalActiveClass = 'active'

const initialState = {
    isModalOpened: false,
}

export let { isModalOpened } = initialState

export const openModal = (text: string) => {
    modal.classList.add(modalActiveClass)
    modalContent.innerHTML = text
    isModalOpened = true
}

export const closeModal = () => {
    if (isModalOpened) {
        modal.classList.remove(modalActiveClass)
        isModalOpened = false
    } else return
}

modal.addEventListener('click', (event: Event) => {
    const target = event.target as Element
    if (target !== modalContent) closeModal()
})
