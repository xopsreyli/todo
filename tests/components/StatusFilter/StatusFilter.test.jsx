import useStatusFilter from "../../../src/hooks/useStatusFilter/useStatusFilter.js";
import {render} from "@testing-library/react";
import StatusFilter from "../../../src/components/StatusFilter/StatusFilter.jsx";
import Filter from "../../../src/components/ui/Filter/Filter.jsx";

vi.mock("../../../src/hooks/useStatusFilter/useStatusFilter")
vi.mock("../../../src/components/ui/Filter/Filter.jsx", () => ({
    default: vi.fn(() => null)
}))

describe(`component StatusFilter`, () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it(`passes the props right`, () => {
        const current = `all`
        const setCurrent = vi.fn()
        const options = [ `all`, `active`, `done` ]

        useStatusFilter.mockReturnValue({
            filter: current,
            setFilter: setCurrent,
            options,
        })

        render(<StatusFilter />)

        expect(Filter).toHaveBeenCalledOnce()
        expect(Filter.mock.calls[0][0]).toEqual({
            current: current,
            setCurrent: expect.any(Function),
            options: options,
            name: `status`,
        })
    })
})