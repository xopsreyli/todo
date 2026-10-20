import {screen, render, within} from "@testing-library/react";
import Tasks from "../../../src/components/Tasks/Tasks.jsx";
import useTasks from "../../../src/hooks/useTasks/useTasks.js";
import useStatusFilter from "../../../src/hooks/useStatusFilter/useStatusFilter.js";
import {ACTIVE, ALL, DONE} from "../../../src/enums/statusFilter/statusFilter.enums.js";

vi.mock("../../../src/hooks/useTasks/useTasks.js")
vi.mock("../../../src/hooks/useStatusFilter/useStatusFilter.js")

describe(`component Tasks`, () => {
    const activeTask = {
        id: `1`,
        text: `active text`,
        isCompleted: false
    }
    const doneTask = {
        id: `2`,
        text: `done text`,
        isCompleted: true
    }

    const setup = (tasks, filter) => {
        useTasks.mockReturnValue({
            tasks: tasks
        })
        useStatusFilter.mockReturnValue({ filter: filter })

        render(<Tasks />)
    }

    describe(`elements task list`, () => {
        it(`renders active tasks in first list and done - in the second list`, () => {
            setup([ activeTask, doneTask ], ALL)

            const activeList = screen.getByRole(`list`, { name: `Active tasks` })
            const doneList = screen.getByRole(`list`, { name: `Done tasks` })

            expect(within(activeList).getByText(activeTask.text)).toBeInTheDocument()
            expect(within(activeList).queryByText(doneTask.text)).not.toBeInTheDocument()
            expect(within(doneList).getByText(doneTask.text)).toBeInTheDocument()
            expect(within(doneList).queryByText(activeTask.text)).not.toBeInTheDocument()
        })

        it(`renders only active list when filter is "active"`, () => {
            setup([ activeTask, doneTask ], ACTIVE)

            expect(screen.getByRole(`list`, { name: `Active tasks` })).toBeInTheDocument()
            expect(screen.queryByRole(`list`, { name: `Done tasks` })).not.toBeInTheDocument()
        })

        it(`renders only done list when filter is "done"`, () => {
            setup([ activeTask, doneTask ], DONE)

            expect(screen.queryByRole(`list`, { name: `Active tasks` })).not.toBeInTheDocument()
            expect(screen.getByRole(`list`, { name: `Done tasks` })).toBeInTheDocument()
        })
    })

    describe(`element divider`, () => {
        it(`renders when both active and completed tasks exists and filter value is "all"`, () => {
            setup([ activeTask, doneTask ], ALL)

            expect(screen.getByRole(`separator`)).toBeInTheDocument()
        })

        it.each([
            { tasks: [ activeTask, doneTask ], filter: ACTIVE, whenArrayText: `both active and done tasks provided` },
            { tasks: [ activeTask, doneTask ], filter: DONE, whenArrayText: `both active and done tasks provided` },
            { tasks: [ activeTask ], filter: ALL, whenArrayText: `only active tasks provided` },
            { tasks: [ doneTask ], filter: ALL, whenArrayText: `only done tasks provided` },
            { tasks: [], filter: ALL, whenArrayText: `no tasks provided` },
        ])(`does not render when $whenArrayText and filter value is "$filter"`, ({ tasks, filter }) => {
            setup(tasks, filter)

            expect(screen.queryByRole(`separator`)).not.toBeInTheDocument()
        })
    })
})