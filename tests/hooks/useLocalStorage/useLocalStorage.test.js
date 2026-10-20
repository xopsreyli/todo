import {act, renderHook} from "@testing-library/react";
import useLocalStorage from "../../../src/hooks/useLocalStorage/useLocalStorage.js";

describe(`hook useLocalStorage`, () => {
    const KEY = `test-key`
    const DEFAULT_VALUE = {}
    const VALUE = { name: `John` }

    const callHook = () => renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE))

    beforeEach(() => {
        localStorage.clear()
    })

    describe(`initial value`, () => {
        it(`returns defaultValue if there is no value in LS`, () => {
            const { result } = callHook()

            expect(result.current[0]).toBe(DEFAULT_VALUE)
        })

        it(`returns value from LS if the value is there`, () => {
            localStorage.setItem(KEY, JSON.stringify(VALUE))

            const { result } = callHook()

            expect(result.current[0]).toEqual(VALUE)
        })

        it(`returns defaultValue if getting value on load throws error`, () => {
            const spy = vi.spyOn(Storage.prototype, `getItem`).mockImplementation(() => {
                throw new Error(`denied`)
            })

            const { result } = callHook()

            expect(spy).toHaveBeenCalled()
            expect(result.current[0]).toBe(DEFAULT_VALUE)
        })
    })

    describe(`set`, () => {
        it(`sets value`, () => {
            const { result } = callHook()

            act(() => result.current[1](VALUE))

            expect(JSON.parse(localStorage.getItem(KEY))).toEqual(VALUE)
            expect(result.current[0]).toEqual(VALUE)
        })

        it(`throws error if fails to set new value and keeps state unchanged`, () => {
            const setterSpy = vi.spyOn(Storage.prototype, `setItem`).mockImplementation(() => {
                throw new Error(`failed to set the value`)
            })

            const consoleSpy = vi.spyOn(console, `error`).mockImplementation(() => {})

            const { result } = callHook()

            act(() => {
                result.current[1](VALUE)
            })

            expect(setterSpy).toHaveBeenCalled()
            expect(consoleSpy).toHaveBeenCalledWith(`failed to set the value`)
            expect(result.current[0]).toBe(DEFAULT_VALUE)
        })
    })

    describe(`remove`, () => {
        it(`deletes value and sets defaultValue as value`, () => {
            localStorage.setItem(KEY, JSON.stringify(VALUE))

            const { result } = callHook()

            expect(result.current[0]).toEqual(VALUE)

            act(() => result.current[2]())

            expect(result.current[0]).toBe(DEFAULT_VALUE)
            expect(localStorage.getItem(KEY)).toBeNull()
        })

        it(`throws error if fails to delete item and keeps state unchanged`, () => {
            localStorage.setItem(KEY, JSON.stringify(VALUE))

            const removeItemSpy = vi.spyOn(Storage.prototype, `removeItem`).mockImplementation(() => {
                throw new Error(`failed to remove item`)
            })

            const consoleSpy = vi.spyOn(console, `error`).mockImplementation(() => {})

            const { result } = callHook()

            act(() => result.current[2]())

            expect(removeItemSpy).toHaveBeenCalled()
            expect(consoleSpy).toHaveBeenCalledWith(`failed to remove item`)
            expect(result.current[0]).toEqual(VALUE)
        })
    })
})