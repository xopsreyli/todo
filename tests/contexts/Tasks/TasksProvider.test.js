import {act, renderHook} from "@testing-library/react";
import useTasks from "../../../src/hooks/useTasks/useTasks.js";
import TasksProvider from "../../../src/contexts/Tasks/TasksProvider.jsx";
import {expect} from "vitest";

describe(`context provider TasksProvider`, () => {
    const tasks = [
        {
            id: `6`,
            text: `task with id 6`,
            isCompleted: false
        },
        {
            id: `7`,
            text: `task with id 7`,
            isCompleted: true
        }
    ]
    const TASKS_DEFAULT_LENGTH = tasks.length

    const callHook = () => renderHook(() => useTasks(), {
        wrapper: TasksProvider
    })

    beforeEach(() => {
        localStorage.clear()
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    it(`creates task`, () => {
        const { result } = callHook()

        expect(result.current.tasks.length).toBe(TASKS_DEFAULT_LENGTH)

        const taskText = `new task`

        act(() => result.current.createTask(taskText))

        expect(result.current.tasks.length).toBe(TASKS_DEFAULT_LENGTH + 1)
        expect(result.current.tasks).toContainEqual({
            id: expect.any(String),
            text: taskText,
            isCompleted: false
        })
    })

    it(`completes task by changing its status`, () => {
        const { result } = callHook()

        expect(result.current.tasks.find(task => task.id === `6`).isCompleted).toBe(false)

        act(() => result.current.completeTask(`6`))

        expect(result.current.tasks.find(task => task.id === `6`).isCompleted).toBe(true)
    })

    it('deletes task', () => {
        const { result } = callHook()

        expect(result.current.tasks.length).toBe(TASKS_DEFAULT_LENGTH)

        act(() => result.current.deleteTask(`6`))

        expect(result.current.tasks.length).toBe(TASKS_DEFAULT_LENGTH - 1)
        expect(result.current.tasks.find(task => task.id === `6`)).toBeUndefined()
    })

    it(`deletes completed tasks`, () => {
        const { result } = callHook()

        expect(result.current.tasks.length).toBe(TASKS_DEFAULT_LENGTH)

        act(() => result.current.deleteCompletedTasks())

        expect(result.current.tasks.length).toBe(TASKS_DEFAULT_LENGTH - 1)
        expect(result.current.tasks.find(task => task.id === `7`)).toBeUndefined()
    })
})