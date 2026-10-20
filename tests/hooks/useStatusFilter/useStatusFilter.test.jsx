import {renderHook} from "@testing-library/react";
import useStatusFilter from "../../../src/hooks/useStatusFilter/useStatusFilter.js";
import StatusFilterContext from "../../../src/contexts/StatusFilter/StatusFilter.js";

describe(`hook useStatusFilter`, () => {
    it(`returns context when used with Provider`, () => {
        const value = { number: 1 }
        const wrapper = ({ children }) => (
            <StatusFilterContext value={value}>{children}</StatusFilterContext>
        )
        const { result } = renderHook(() => useStatusFilter(), { wrapper })

        expect(result.current).toBe(value)
    })

    it(`throws error when used without Provider`, () => {
        expect(() => renderHook(() => useStatusFilter()))
            .toThrow(`useStatusFilter should be used within StatusFilterProvider`)
    })
})