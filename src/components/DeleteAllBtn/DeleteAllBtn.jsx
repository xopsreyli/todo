import useTasks from "../../hooks/useTasks/useTasks.js";
import styles from './DeleteAllBtn.module.css'

/** @module components/DeleteAllBtn */

/**
 * A button component.
 *
 * Handles deleting all tasks.
 * Gets tasks from {@link module:hooks/useTasks~useTasks|useTasks}.
 *
 * @returns {JSX.Element|null} A button element if at least 1 task exists,
 * and null, if not.
 */
const DeleteAllBtn = () => {
    const {
        tasks,
        deleteTasks
    } = useTasks()

    if (tasks.length === 0) return null

    return (
        <button
            className={styles.btn}
            onClick={deleteTasks}
        >Delete All</button>
    );
};

export default DeleteAllBtn;