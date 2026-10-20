import TaskForm from "../../../src/components/TaskForm/TaskForm.jsx";
import {screen, render, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useTasks from "../../../src/hooks/useTasks/useTasks.js"

vi.mock("../../../src/hooks/useTasks/useTasks.js" )

describe(`component TaskForm`, () => {
    let user

    const getTaskInput = () => screen.getByLabelText(/enter task:/i)
    const getSubmitBtn = () => screen.getByRole(`button`, {
        name: /create/i
    })    
    
    const createTask = vi.fn()

    beforeEach(() => {
        createTask.mockClear()

        useTasks.mockReturnValue({
            createTask
        })

        user = userEvent.setup()

        render(<TaskForm />)
    })

    describe(`rendering`, () => {
        it(`renders task input and its label`, () => {
            expect(getTaskInput()).toBeInTheDocument()
        })

        it(`renders submit button`, () => {
            expect(getSubmitBtn()).toBeInTheDocument()
        })
    })

    describe(`element task input`, () => {
        it(`changes value on typing`, async () => {
            expect(getTaskInput()).toHaveValue(``)

            await user.type(getTaskInput(), `test text`)

            expect(getTaskInput()).toHaveValue(`test text`)
        })
    })

    describe(`element submit button`, () => {
        it(`initial state is disabled`, () => {
            expect(getSubmitBtn()).toBeDisabled()
        })

        it(`enables after user typed into the input`, async () => {
            await user.type(getTaskInput(), `test`)

            expect(getSubmitBtn()).toBeEnabled()
        })

        it(`becomes disabled after user clears the input`, async () => {
            await user.type(getTaskInput(), `test`)
            await user.clear(getTaskInput())

            expect(getSubmitBtn()).toBeDisabled()
        })

        it(`stays disabled if user types whitespaces`, async () => {
            await user.type(getTaskInput(), ` `)

            expect(getSubmitBtn()).toBeDisabled()
        })
    })

    describe(`submitting`, () => {
        it(`submits on button click`, async () => {
            const text = ` test text `

            await user.type(getTaskInput(), text)
            await user.click(getSubmitBtn())

            expect(createTask).toHaveBeenCalledWith(text.trim())
            expect(createTask).toHaveBeenCalledOnce()
            expect(getTaskInput()).toHaveValue(``)
            expect(getSubmitBtn()).toBeDisabled()
        })

        it(`submits on enter key press`, async () => {
            await user.type(getTaskInput(), `test{enter}`)

            expect(createTask).toHaveBeenCalledWith(`test`)
            expect(createTask).toHaveBeenCalledOnce()
            expect(getTaskInput()).toHaveValue(``)
            expect(getSubmitBtn()).toBeDisabled()
        })

        it(`doesn't call createTask if task input is invalid`, async () => {
            const input = getTaskInput()

            await user.type(input, ` `)

            fireEvent.submit(input.closest(`form`))

            expect(createTask).not.toHaveBeenCalled()
        })
    })
})