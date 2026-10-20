import styles from "./Tasks.module.css";
import useTasks from "../../hooks/useTasks/useTasks.js";
import {useMemo} from "react";
import TaskList from "../TaskList/TaskList.jsx";
import useStatusFilter from "../../hooks/useStatusFilter/useStatusFilter.js";
import { ALL, ACTIVE, DONE } from "../../enums/statusFilter/statusFilter.enums.js";

/** @module components/Tasks */

/**
 * Tasks component
 *
 * Splits tasks in active and completed. Handles the logic for rendering lists of active and completed tasks
 * with a divider between them based on filter value:
 *  - renders an active list when the filter value is `all` or `active`
 *  - renders a completed list when the filter value is `all` or `done`
 *  - renders a divider when both active and completed lists contain at least one task and the filter value is `all`
 *
 *  Uses tasks from {@link module:hooks/useTasks~useTasks|useTasks},
 *  and filter value from {@link module:hooks/useStatusFilter~useStatusFilter|useStatusFilter}.
 *  Renders a task list as a {@link module:components/TaskList~TaskList|TaskList}
 *
 * @returns {JSX.Element} List of active and completed tasks with a divider between them.
 */
const Tasks = () => {
    const { tasks } = useTasks()
    const { filter } = useStatusFilter()

    const activeTasks = useMemo(() => {
        return tasks.filter(task => !task.isCompleted)
    }, [tasks])
    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.isCompleted)
    }, [tasks])

    const renderActive = filter === ALL || filter === ACTIVE
    const renderDone = filter === ALL || filter === DONE
    const renderDivider = activeTasks.length > 0 && completedTasks.length > 0 && filter === ALL

    return (
        <section className={styles.tasks}>
            {renderActive && <TaskList tasks={activeTasks} label={`Active tasks`} />}
            {
                renderDivider &&
                <hr className={styles.tasks__divider} />
            }
            {renderDone && <TaskList tasks={completedTasks} label={`Done tasks`} />}
        </section>
    );
};

export default Tasks;