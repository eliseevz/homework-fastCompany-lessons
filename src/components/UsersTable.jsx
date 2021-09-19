import React from "react"
import PropTypes from "prop-types"
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import BookMark from "./Bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import {Link} from "react-router-dom";

const UserTable = ({users, onSort, selectedSort, handleToggleBookMark, removeHundler, qualitiesHundler, ...rest}) => {
    const columns = {
        name: {path: "name", name: "Имя", component: (user) => <Link to={`/users/${user._id}`}> {user.name} </Link>},
        qualities: {name: "Качества", component: (user) => <QualitiesList qualities={user.qualities}/>},
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

            <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}>
                <TableHeader
                    {...{onSort, selectedSort, columns}}
                />
                <TableBody
                    {...{columns, data: users}}
                />
            </Table>
    )
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired
}

export default UserTable
