import {render, screen, waitFor} from "@testing-library/react";
import ClearDoneBtn from "../../../src/components/ClearDoneBtn/ClearDoneBtn.jsx";
import useTasks from "../../../src/hooks/useTasks/useTasks.js";
import userEvent from '@testing-library/user-event';

vi.mock("../../../src/hooks/useTasks/useTasks.js")

describe(`component ClearDoneBtn`, () => {
    const deleteCompletedTasks = vi.fn()

    beforeEach(() => {
        deleteCompletedTasks.mockClear()
    })

    it(`renders nothing when there is no completed tasks`, () => {
        useTasks.mockReturnValue({
            tasks: [
                {
                    id: `1`,
                    text: `test text`,
                    isCompleted: false
                }
            ],
        })

        render(<ClearDoneBtn />)

        expect(screen.queryByRole(`button`, {
            name: /clear done/i
        })).not.toBeInTheDocument()
    })

    it(`renders button when there is completed task`, () => {
        useTasks.mockReturnValue({
            tasks: [
                {
                    id: `1`,
                    text: `test text`,
                    isCompleted: true
                }
            ],
        })

        render(<ClearDoneBtn />)

        expect(screen.getByRole(`button`, {
            name: /clear done/i
        })).toBeInTheDocument()
    })

    it(`calls deleteCompletedTasks on click`, async () => {
        useTasks.mockReturnValue({
            tasks: [
                {
                    id: `1`,
                    text: `test text`,
                    isCompleted: true
                }
            ],
            deleteCompletedTasks
        })

        const user = userEvent.setup()

        render(<ClearDoneBtn />)

        expect(deleteCompletedTasks).not.toHaveBeenCalled()

        await user.click(screen.getByRole(`button`, {
            name: /clear done/i
        }))

        await waitFor(() => {
            expect(deleteCompletedTasks).toHaveBeenCalledOnce()
        })
    })

    it(`calls deleteCompletedTasks once if more than 1 click was done`, async () => {
        useTasks.mockReturnValue({
            tasks: [
                {
                    id: `1`,
                    text: `test text`,
                    isCompleted: true
                }
            ],
            deleteCompletedTasks
        })

        const user = userEvent.setup()

        render(<ClearDoneBtn />)

        expect(deleteCompletedTasks).not.toHaveBeenCalled()

        await user.click(screen.getByRole(`button`, {
            name: /clear done/i
        }))
        await user.click(screen.getByRole(`button`, {
            name: /clear done/i
        }))

        await waitFor(() => {
            expect(deleteCompletedTasks).toHaveBeenCalledOnce()
        })
    } )
})