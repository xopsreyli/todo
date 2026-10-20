import TasksContext from "./Tasks.js"
import useLocalStorage from "../../hooks/useLocalStorage/useLocalStorage.js";

/** @module contexts/Tasks/TasksProvider */

/**
 * Provider for the {@link module:contexts/Tasks/Tasks~TasksContext|TasksContext}
 *
 * Syncs tasks with local storage and provides methods to manipulate them.
 *
 * To access the value use {@link module:hooks/useTasks~useTasks|useTasks()}
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} - The context provider with provided value wrapping 'children'
 *
 * @see {@link module:hooks/useLocalStorage|useLocalStorage}
 */
const TasksProvider = ({children}) => {
    const [tasks, setTasks, removeTasks] = useLocalStorage('tasks', [])

    const createTask = (task) => {
        const id = crypto.randomUUID()
        const newTask = {
            id,
            text: task,
            isCompleted: false
        }
        setTasks([...tasks, newTask])
    }

    const completeTask = (id) => {
        const updatedTasks = tasks.map(task => task.id === id ? {...task, isCompleted: true} : task)
        setTasks(updatedTasks)
    }

    const deleteTask = (id) => {
        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    const deleteCompletedTasks = () => {
        const filteredTasks = tasks.filter(task => !task.isCompleted)
        setTasks(filteredTasks)
    }

    return (
        <TasksContext
            value={{
                tasks,
                createTask,
                completeTask,
                deleteTask,
                deleteCompletedTasks,
                deleteTasks: removeTasks,
            }}
        >
            {children}
        </TasksContext>
    );
};

export default TasksProvider;