import useTasks from "../../../../src/hooks/useTasks/useTasks.js"
import {screen, render} from "@testing-library/react";
import Task from "../../../../src/components/TaskList/Task/Task.jsx";
import styles from "../../../../src/components/TaskList/Task/Task.module.css";
import userEvent from "@testing-library/user-event";

vi.mock("../../../../src/hooks/useTasks/useTasks.js")
const completeTask = vi.fn()
const deleteTask = vi.fn()

describe(`component Task`, () => {
    const activeTask = {
        id: `1`,
        text: `active text`,
        isCompleted: false,
    }
    const doneTask = {
        id: `1`,
        text: `done text`,
        isCompleted: true,
    }

    beforeEach(() => {
        vi.clearAllMocks()
        useTasks.mockReturnValue({
            completeTask,
            deleteTask,
        })
    })

    describe(`active task`, () => {
        beforeEach(() => {
            render(<Task task={activeTask} />)
        })

        it(`renders active task`, () => {
            expect(screen.getByRole(`listitem`)).toBeInTheDocument()
            expect(screen.getByText(activeTask.text)).toBeInTheDocument()
            expect(screen.getByRole(`checkbox`)).toBeInTheDocument()
            expect(screen.getByRole(`button`, { name: /delete/i })).toBeInTheDocument()
        })

        it(`does not have class "task--completed" when the task is active`, () => {
            expect(screen.getByRole(`listitem`)).not.toHaveClass(styles['task--completed'])
        })

        it(`sets right checked checkbox status`, () => {
            const checkbox = screen.getByRole(`checkbox`)

            expect(checkbox).not.toBeChecked()
        })

        it(`calls completeTask on checkbox click`, async () => {
            const user = userEvent.setup()

            await user.click(screen.getByRole(`checkbox`))

            expect(completeTask).toHaveBeenCalledWith(activeTask.id)
        })

        it(`calls deleteTask on delete button click`, async () => {
            const user = userEvent.setup()

            await user.click(screen.getByRole(`button`, { name: /delete/i }))

            expect(deleteTask).toHaveBeenCalledWith(doneTask.id)
        })
    })

    describe(`completed task`, () => {
        beforeEach(() => {
            render(<Task task={doneTask} />)
        })

        it(`renders done task`, () => {
            expect(screen.getByRole(`listitem`)).toBeInTheDocument()
            expect(screen.getByText(doneTask.text)).toBeInTheDocument()
            expect(screen.queryByRole(`checkbox`)).not.toBeInTheDocument()
            expect(screen.queryByRole(`button`, { name: /delete/i })).not.toBeInTheDocument()
        })

        it(`has class "task--completed" when the task is done`, () => {
            expect(screen.getByRole(`listitem`)).toHaveClass(styles['task--completed'])
        })
    })
})