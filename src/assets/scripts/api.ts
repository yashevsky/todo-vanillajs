import type { TodoType } from './types'

const response = fetch('https://jsonplaceholder.typicode.com/todos')
const todoAmount = 10

export const fetchTodos: Promise<TodoType[]> = response
    .then((resp) => resp.json())
    .then((json) => json.slice(0, todoAmount))
