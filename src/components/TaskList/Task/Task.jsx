import styles from './Task.module.css';
import useTasks from "../../../hooks/useTasks/useTasks.js";

/** @module components/TaskList/Task */

/**
 * Task component
 *
 * Renders a list item that represents a task. Contain a task's text, status checkbox, and delete button.
 * Gets different styles if the task is completed.
 *
 * Handles the completion and deletion of the task
 * using methods `completeTask` and `deleteTask` from {@link module:hooks/useTasks~useTasks|useTasks}
 *
 * @param {Object} props
 * @param {Object} props.task - Task object
 *
 * @returns {JSX.Element} List item representing a task
 */
const Task = ({task}) => {
    const {
        id,
        text,
        isCompleted,
    } = task
    const {
        completeTask,
        deleteTask,
    } = useTasks()

    const handleCheck = () => {
        if (!isCompleted) completeTask(id)
    }

    const handleDelete = () => {
        deleteTask(id)
    }

    return (
        <li
            className={styles.task}
        >
            <label className={styles.task__status} htmlFor={id}>
                <input
                    type="checkbox"
                    id={id}
                    checked={isCompleted}
                    onChange={handleCheck}
                />
            </label>
            <span className={styles.task__text}>{text}</span>
            <button
                className={styles.task__delete}
                onClick={handleDelete}
                aria-label={`Delete task`}
            ></button>
        </li>
    );
};

export default Task;