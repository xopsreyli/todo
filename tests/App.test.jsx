import {screen, render, within} from "@testing-library/react";
import App from "../src/App.jsx";
import userEvent from "@testing-library/user-event";

describe(`App`, () => {
    let user

    const setup = () => {
        user = userEvent.setup()

        render(<App />)
    }

    beforeEach(() => {
        localStorage.clear()
    })

    it(`lets user create task`, async () => {
        setup()
        const taskText = `test task`

        expect(screen.queryByText(taskText)).not.toBeInTheDocument()

        await user.type(screen.getByLabelText(/enter new task/i), taskText)
        await user.click(screen.getByRole(`button`, { name: /add/i }))

        expect(screen.getByText(taskText)).toBeInTheDocument()
    })

    it(`lets user filter tasks`, async () => {
        const tasks = [
            {
                id: `1`,
                text: `active task`,
                isCompleted: false
            },
            {
                id: `2`,
                text: `done task`,
                isCompleted: true
            }
        ]
        localStorage.setItem(`tasks`, JSON.stringify(tasks))
        setup()

        expect(screen.getByText(tasks[0].text)).toBeInTheDocument()
        expect(screen.getByText(tasks[1].text)).toBeInTheDocument()

        await user.click(screen.getByRole(`radio`, { name: /active/i }))

        expect(screen.getByText(tasks[0].text)).toBeInTheDocument()
        expect(screen.queryByText(tasks[1].text)).not.toBeInTheDocument()

        await user.click(screen.getByRole(`radio`, { name: /done/i }))

        expect(screen.queryByText(tasks[0].text)).not.toBeInTheDocument()
        expect(screen.getByText(tasks[1].text)).toBeInTheDocument()

        await user.click(screen.getByRole(`radio`, { name: /all/i }))

        expect(screen.getByText(tasks[0].text)).toBeInTheDocument()
        expect(screen.getByText(tasks[1].text)).toBeInTheDocument()
    })

    it(`lets user complete the task and moves it to done list`, async () => {
        const tasks = [
            {
                id: `1`,
                text: `active task`,
                isCompleted: false
            },
            {
                id: `2`,
                text: `done task`,
                isCompleted: true
            },
            {
                id: `3`,
                text: `test task`,
                isCompleted: false
            }
        ]
        localStorage.setItem(`tasks`, JSON.stringify(tasks))
        setup()

        const activeList = screen.getByRole(`list`, { name: `Active tasks` })
        const doneList = screen.getByRole(`list`, { name: `Done tasks` })

        expect(within(activeList).getAllByRole(`listitem`)).toHaveLength(2)
        expect(within(doneList).getAllByRole(`listitem`)).toHaveLength(1)

        const testTask = screen.getByText(tasks[2].text).closest(`li`)

        await user.click(within(testTask).getByRole(`checkbox`))

        expect(within(activeList).getAllByRole(`listitem`)).toHaveLength(1)
        expect(within(doneList).getAllByRole(`listitem`)).toHaveLength(2)
    })

    it(`lets user delete task`, async () => {
        const task = {
            id: `1`,
            text: `test task`,
            isCompleted: false
        }
        localStorage.setItem(`tasks`, JSON.stringify([task]))
        setup()

        expect(screen.getByText(task.text)).toBeInTheDocument()

        await user.click(within(screen.getByText(task.text).closest(`li`)).getByRole(`button`, { name: /delete/i }))

        expect(screen.queryByText(task.text)).not.toBeInTheDocument()
    })

    it(`lets user delete all done tasks`, async () => {
        const tasks = [
            {
                id: `1`,
                text: `active task`,
                isCompleted: false
            },
            {
                id: `2`,
                text: `done task`,
                isCompleted: true
            }
        ]
        localStorage.setItem(`tasks`, JSON.stringify(tasks))
        setup()

        const activeList = screen.getByRole(`list`, { name: `Active tasks` })
        const doneList = screen.getByRole(`list`, { name: `Done tasks` })

        expect(within(activeList).getAllByRole(`listitem`)).toHaveLength(1)
        expect(within(doneList).getAllByRole(`listitem`)).toHaveLength(1)

        await user.click(screen.getByRole(`button`, { name: /clear done/i }))

        expect(within(activeList).getAllByRole(`listitem`)).toHaveLength(1)
        expect(screen.queryByRole(`list`, { name: `Done tasks` })).not.toBeInTheDocument()
    })

    it(`lets user delete all tasks`, async () => {
        const tasks = [
            {
                id: `1`,
                text: `active task`,
                isCompleted: false
            },
            {
                id: `2`,
                text: `done task`,
                isCompleted: true
            }
        ]
        localStorage.setItem(`tasks`, JSON.stringify(tasks))
        setup()

        expect(screen.getByText(tasks[0].text)).toBeInTheDocument()
        expect(screen.getByText(tasks[1].text)).toBeInTheDocument()

        await user.click(screen.getByRole(`button`, { name: /delete all/i }))

        expect(screen.queryByText(tasks[0].text)).not.toBeInTheDocument()
        expect(screen.queryByText(tasks[1].text)).not.toBeInTheDocument()
    })
})