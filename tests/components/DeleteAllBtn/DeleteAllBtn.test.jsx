import useTasks from "../../../src/hooks/useTasks/useTasks.js"
import {screen, render, waitFor} from "@testing-library/react";
import DeleteAllBtn from "../../../src/components/DeleteAllBtn/DeleteAllBtn.jsx";
import userEvent from "@testing-library/user-event";

vi.mock("../../../src/hooks/useTasks/useTasks.js")

describe(`component DeleteAllBtn`, () => {
    const deleteTasks = vi.fn()

    beforeEach(() => {
        deleteTasks.mockClear()
    })

    it(`renders nothing when there is no tasks`, () => {
        useTasks.mockReturnValue({
            tasks: [],
        })

        render(<DeleteAllBtn />)

        expect(screen.queryByRole(`button`, {
            name: /delete all/i
        })).not.toBeInTheDocument()
    })

    it(`renders button when there is at least one task`, () => {
        useTasks.mockReturnValue({
            tasks: [{
                id: `1`,
                text: 'test text',
                isCompleted: false,
            }],
        })

        render(<DeleteAllBtn />)

        expect(screen.getByRole(`button`, {
            name: /delete all/i
        })).toBeInTheDocument()
    })

    it(`calls deleteTasks on click`, async () => {
        useTasks.mockReturnValue({
            tasks: [{
                id: `1`,
                text: 'test text',
                isCompleted: false,
            }],
            deleteTasks
        })

        const user = userEvent.setup()

        render(<DeleteAllBtn />)

        expect(deleteTasks).not.toHaveBeenCalled()

        await user.click(screen.getByRole(`button`, {
            name: /delete all/i
        }))

        await waitFor(() => {
            expect(deleteTasks).toHaveBeenCalledOnce()
        })
    })

    it(`calls deleteTasks once if more than 1 click was done`, async () => {
        useTasks.mockReturnValue({
            tasks: [{
                id: `1`,
                text: 'test text',
                isCompleted: false,
            }],
            deleteTasks
        })

        const user = userEvent.setup()

        render(<DeleteAllBtn />)

        expect(deleteTasks).not.toHaveBeenCalled()

        await user.click(screen.getByRole(`button`, {
            name: /delete all/i
        }))
        await user.click(screen.getByRole(`button`, {
            name: /delete all/i
        }))

        await waitFor(() => {
            expect(deleteTasks).toHaveBeenCalledOnce()
        })
    })
})