import {screen, render, within} from "@testing-library/react";
import TaskList from "../../../src/components/TaskList/TaskList.jsx";

vi.mock("../../../src/components/TaskList/Task/Task.jsx", () => ({
    default: ({ task }) => <li key={task.id}>{task.text}</li>
}))

describe(`component TaskList`, () => {
    it(`renders nothing when no tasks provided`, () => {
        const { container } = render(<TaskList tasks={[]} />)

        expect(container).toBeEmptyDOMElement()
    })

    it(`renders list when tasks provided`, () => {
        const tasks = [
            { id: `1`, text: `test text 1` },
            { id: `2`,text: `test text 2` }
        ]

        render(<TaskList tasks={tasks} />)

        const list = screen.getByRole(`list`)

        expect(list).toBeInTheDocument()
        expect(within(list).getAllByRole(`listitem`)).toHaveLength(2)
        expect(screen.getByText(tasks[0].text)).toBeInTheDocument()
        expect(screen.getByText(tasks[1].text)).toBeInTheDocument()
    })
})