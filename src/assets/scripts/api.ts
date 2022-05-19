type TodoType = {
    userId: number
    id: number
    title: string
    compelted: boolean
}
const response = fetch('https://jsonplaceholder.typicode.com/todos')
const todoAmount = 10

export const fetchTodos: Promise<TodoType[]> = response
    .then((resp) => resp.json())
    .then((json) => json.slice(0, todoAmount))
