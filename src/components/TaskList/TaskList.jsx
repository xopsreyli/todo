import styles from "./TaskList.module.css";
import Task from "./Task/Task.jsx";
import {memo} from "react";

/** @module components/TaskList */

/**
 * Task list component
 *
 * Takes tasks as a parameter. If the list is empty, returns `null`, if not,
 * renders a list of {@link module:components/TaskList/Task~Task|Task}
 *
 * @param {Object} props
 * @param {string} props.label - Label for the list
 * @param {Array} props.tasks - List of tasks
 *
 * @returns {JSX.Element|null} List of tasks or `null`
 */
const TaskList = ({label, tasks}) => {
    if (tasks.length === 0) return null

    return (
        <ul
            className={styles.list}
            aria-label={label}
        >
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                />
            ))}
        </ul>
    );
};

export default memo(TaskList);