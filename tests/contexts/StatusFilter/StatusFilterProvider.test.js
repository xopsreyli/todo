import {act, renderHook} from "@testing-library/react";
import useStatusFilter from "../../../src/hooks/useStatusFilter/useStatusFilter.js";
import StatusFilterProvider from "../../../src/contexts/StatusFilter/StatusFilterProvider.jsx";
import {ACTIVE, ALL} from "../../../src/enums/statusFilter/statusFilter.enums.js";

describe(`context provider StatusFilterProvider`, () => {
    const callHook = () => renderHook(() => useStatusFilter(), {
        wrapper: StatusFilterProvider
    })

    it(`has "all" as default value`, () => {
        const { result } = callHook()

        expect(result.current.filter).toBe(ALL)
    })

    it(`sets values`, () => {
        const { result } = callHook()

        act(() => result.current.setFilter(ACTIVE))

        expect(result.current.filter).toBe(ACTIVE)
    })
})