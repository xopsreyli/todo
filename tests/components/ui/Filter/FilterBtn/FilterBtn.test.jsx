import {screen, render} from "@testing-library/react";
import FilterBtn from "../../../../../src/components/ui/Filter/FilterBtn/FilterBtn.jsx";
import userEvent from "@testing-library/user-event";

const setCurrent = vi.fn()

describe(`component FilterBtn`, () => {
    const setup = (value, name, current, setCurrent) => {
        render(
            <FilterBtn
                value={value}
                name={name}
                current={current}
                setCurrent={setCurrent}
            />
        )
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it(`renders with right values`, () => {
        const value = `a`
        const name = `test`
        const current = `a`

        setup(value, name, current, setCurrent)

        expect(screen.getByLabelText(value)).toBeInTheDocument()
        expect(screen.getByRole(`radio`, { name: value })).toHaveAttribute(`name`, name)
    })

    describe(`element radio button`, () => {
        it(`not checked when current does not equal value`, () => {
            const value = `a`
            const name = `test`
            const current = `b`

            setup(value, name, current, setCurrent)

            expect(screen.getByRole(`radio`, { name: value })).not.toBeChecked()
        })

        it(`checked when current equals value`, () => {
            const value = `a`
            const name = `test`
            const current = `a`

            setup(value, name, current, setCurrent)

            expect(screen.getByRole(`radio`, { name: value })).toBeChecked()
        })

        it(`calls setCurrent with its value on click`, async () => {
            const value = `a`
            const name = `test`
            const current = `b`
            const user = userEvent.setup()

            setup(value, name, current, setCurrent)

            await user.click(screen.getByRole(`radio`, { name: value }))

            expect(setCurrent).toHaveBeenCalledOnce()
            expect(setCurrent).toHaveBeenCalledWith(value)
        })
    })
})