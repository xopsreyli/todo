import useStatusFilter from "../../hooks/useStatusFilter/useStatusFilter.js";
import Filter from "../ui/Filter/Filter.jsx";

/** @module components/StatusFilter */

/**
 * Wrap component on {@link module:components/ui/Filter~Filter|Filter}
 *
 * Provides filter as current, setFilter as setCurrent, options as options, and fixed name 'status'
 * for {@link module:components/ui/Filter~Filter|Filter} component
 * from {@link module:contexts/StatusFilter/StatusFilter~StatusFilterContext|StatusFilterContext}.
 *
 * @returns {JSX.Element} component to filter tasks by status
 */
const StatusFilter = () => {
    const {
        filter,
        setFilter,
        options
    } = useStatusFilter()

    return (
        <Filter
            options={options}
            name={`status`}
            current={filter}
            setCurrent={setFilter}
        />
    );
};

export default StatusFilter;