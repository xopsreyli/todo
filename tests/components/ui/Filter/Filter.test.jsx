import {screen, render} from "@testing-library/react";
import Filter from "../../../../src/components/ui/Filter/Filter.jsx";

describe(`component Filter`, () => {
    const setCurrent = vi.fn()

    const setup = (options) => {
        render(
            <Filter
                options={options}
                current={`a`}
                setCurrent={setCurrent}
                name={`test`}
            />
        )
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it(`renders no FilterBtn when options are empty`, () => {
        setup([])

        expect(screen.queryAllByRole('radio')).toHaveLength(0)
    })

    it(`renders FilterBtn for each option`, () => {
        setup([`a`, `b`, `c`])

        expect(screen.getAllByRole('radio')).toHaveLength(3)
        expect(screen.getByText(`a`)).toBeInTheDocument()
        expect(screen.getByText(`b`)).toBeInTheDocument()
        expect(screen.getByText(`c`)).toBeInTheDocument()
    })
})