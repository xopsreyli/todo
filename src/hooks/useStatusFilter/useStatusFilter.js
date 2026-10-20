import {useContext} from "react";
import StatusFilterContext from "../../contexts/StatusFilter/StatusFilter.js";

/** @module hooks/useStatusFilter */

/**
 * Custom hook to access the {@link module:contexts/StatusFilter/StatusFilter~StatusFilterContext|StatusFilterContext}.
 *
 * Checks if the context is used within its provider,
 * if yes - returns the context, if no - throws an error.
 *
 * @throws {Error} if used outside {@link module:contexts/StatusFilter/StatusFilterProvider~StatusFilterProvider|StatusFilterProvider}
 * @returns {module:contexts/StatusFilter/StatusFilter~StatusFilterContextValue} context value {@link module:contexts/StatusFilter/StatusFilter~StatusFilterContextValue|StatusFilterContextValue}
 */
const useStatusFilter = () => {
    const context = useContext(StatusFilterContext)

    if (!context) {
        throw new Error("useStatusFilter should be used within StatusFilterProvider")
    }

    return context
}

export default useStatusFilter