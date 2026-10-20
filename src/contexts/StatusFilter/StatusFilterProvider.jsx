import FilterContext from "./StatusFilter.js";
import {useMemo, useState} from "react";
import {
    ACTIVE,
    ALL,
    DONE,
} from "../../enums/statusFilter/statusFilter.enums.js";

/** @module contexts/StatusFilter/StatusFilterProvider */

/**
 * Provider for the {@link module:contexts/StatusFilter/StatusFilter~StatusFilterContext|StatusFilterContext}.
 *
 * Holds the current status statusFilter in state.
 * Exposes the current state value, a setter, and the available options.
 *
 * To access the value use {@link module:hooks/useStatusFilter~useStatusFilter|useStatusFilter()}
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} The context provider with provided value wrapping 'children'
 */
const StatusFilterProvider = ({ children }) => {
    const [filter, setFilter] = useState(ALL)

    const value = useMemo(() => ({
        filter,
        setFilter,
        options: [ALL, ACTIVE, DONE]
    }),[filter])

    return (
        <FilterContext value={value}>
            {children}
        </FilterContext>
    );
};

export default StatusFilterProvider;