import React from "react"
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import PropTypes from "prop-types"
import UserTable from "./UsersTable";

const Table = ({onSort, selectedSort, columns, data, children}) => {
    return (
        <table className="table">
            { children || <>
                <TableHeader
                    {...{onSort, selectedSort, columns}}
                />
                <TableBody
                    {...{columns, data}}
                />
            </>

            }

        </table>
    )
}

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
}

export default Table