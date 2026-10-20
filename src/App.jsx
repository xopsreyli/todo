import './App.css'
import TasksProvider from "./contexts/Tasks/TasksProvider.jsx";
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import StatusFilter from "./components/StatusFilter/StatusFilter.jsx";
import Tasks from "./components/Tasks/Tasks.jsx";
import ClearDoneBtn from "./components/ClearDoneBtn/ClearDoneBtn.jsx";
import DeleteAllBtn from "./components/DeleteAllBtn/DeleteAllBtn.jsx";
import StatusFilterProvider from "./contexts/StatusFilter/StatusFilterProvider.jsx";

/** @module App */

/**
 * Root component of the application.
 *
 * Sets up the context providers and renders the application layout.
 *
 * @returns {JSX.Element} The application layout.
 */
function App() {
    return (
        <main>
            <TasksProvider>
                <TaskForm/>
                <StatusFilterProvider>
                    <StatusFilter/>
                    <Tasks/>
                </StatusFilterProvider>
                <div className='delete-box'>
                    <ClearDoneBtn/>
                    <DeleteAllBtn/>
                </div>
            </TasksProvider>
        </main>
    )
}

export default App
