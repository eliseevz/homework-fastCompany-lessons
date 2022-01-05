import React from "react"
import PropTypes from "prop-types"
import BookMark from "../common/Bookmark";
import QualitiesList from "./qualities/qualitiesList";
import Table, {TableBody, TableHeader} from "../common/Table";
import {Link} from "react-router-dom";
import Profession from "./profession";

const UserTable = ({users, onSort, selectedSort, handleToggleBookMark, removeHundler, qualitiesHundler}) => {
    const columns = {
        name: {path: "name", name: "Имя", component: (user) => <Link to={`/users/${user._id}`}> {user.name} </Link>},
        qualities: {name: "Качества", component: (user) => <QualitiesList qualities={user.qualities}/>},
        professions: {name: "Профессия", component: (user) => <Profession id={user.profession}/>},
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
