import React from "react"
import User from "./User";
import PropTypes from "prop-types"
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import BookMark from "./Bookmark";

const UserTable = ({users, onSort, selectedSort, handleToggleBookMark, removeHundler, ...rest}) => {
    const columns = {
        name: {path: "name", name: "Имя"},
        qualities: {name: "Качества"},
        professions: {path: "profession.name", name: "Профессия"},
        completedMeetings: {path: "completedMeetings", name: "Встретился, раз"},
        rate: {path: "rate", name: "Оценка"},
        bookmark:
            {path: "bookmark", name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => handleToggleBookMark(user._id)}
                />)
            },
        delete: {component: (user) => (
                <button
                    onClick={() => {
                        removeHundler(user._id)
                    }}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            )}
    }
    return (
        <table className="table">
        <TableHeader
            {...{onSort, selectedSort, columns}}
        />
        <TableBody
            {...{columns, data: users}}
        />
        </table>
    )
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired
}

export default UserTable
