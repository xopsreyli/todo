import styles from './TaskForm.module.css';
import { useState } from 'react';
import useTasks from "../../hooks/useTasks/useTasks.js";

/** @module components/TaskForm */

/**
 * A form component for task creation.
 *
 * Consists of a controlled text input and a `submit` button.
 * Handles task creation on a submission. Uses `createTask` from the {@link module:hooks/useTasks~useTasks|useTasks()}.
 *
 * @returns {JSX.Element} A form with a text input and a `submit` button.
 */
const TaskForm = () => {
    const [task, setTask] = useState('')
    const { createTask } = useTasks()

    const handleSubmit = (e) => {
        e.preventDefault()

        const filteredTask = task.trim()
        if (!filteredTask) return

        createTask(filteredTask)
        setTask('')
    }

    const handleChange = (e) => {
        setTask(e.target.value)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.form__input}
                type="text"
                id='taskInput'
                value={task}
                onChange={handleChange}
                placeholder="New task"
                aria-label={`Enter new task`}
            />
            <button
                className={styles.form__submit}
                type="submit"
                disabled={!task.trim()}
            >add</button>
        </form>
    );
};

export default TaskForm;