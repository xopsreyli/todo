import delayAction from "../../../src/utils/delayAction/delayAction.js";

const action = vi.fn()

describe(`util delayAction`, () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.useFakeTimers()
    })

    it(`returns the timeout ID`, () => {
        const id = delayAction(action, 2000)

        expect(id).toBeDefined()
        expect(vi.getTimerCount()).toBe(1)
    })

    it(`calls the action with delay`, () => {
        delayAction(action, 2000)

        expect(action).not.toHaveBeenCalled()

        vi.advanceTimersByTime(2000)

        expect(action).toHaveBeenCalledOnce()
    })
})