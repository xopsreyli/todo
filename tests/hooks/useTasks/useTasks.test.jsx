import TasksContext from "../../../src/contexts/Tasks/Tasks.js";
import {renderHook} from "@testing-library/react";
import useTasks from "../../../src/hooks/useTasks/useTasks.js";

describe(`hook useTasks`, () => {
    it(`returns context when used with Provider`, () => {
        const value = { number: 1 }
        const wrapper = ({ children }) => (
            <TasksContext value={value}>{children}</TasksContext>
        )
        const { result } = renderHook(() => useTasks(), { wrapper })

        expect(result.current).toBe(value)
    })

    it(`throws error when used without Provider`, () => {
        expect(() => renderHook(() => useTasks()))
            .toThrow(`useTasks should be used within TasksProvider`)
    })
})