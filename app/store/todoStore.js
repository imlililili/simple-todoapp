import { create } from "zustand";

const useTodoStore = create(set => ({
    todos: [],
    addTodo: (text) =>set((state) => ({todos: [...state.todos, {text, completed:false, id: string}]})),
    removeTodo: (id) =>set((state) => ({todos: state.todos.filter(t => t.id != id)})),
    toggleTodo: (id) =>set((state) => ({todos: state.todos.map(t => t.id === id? {...t, completed: !t.completed}: t)})),
}))

export default useTodoStore;