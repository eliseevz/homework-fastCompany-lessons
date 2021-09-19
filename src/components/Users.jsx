import React, { useEffect, useState } from "react"
import Phrase from "./Phrase"
import GroupList from "./groupList"
import api from "../API"
import Pagination from "./Pagination"
import paginate from "../utils/paginate"
import Loader from "./Loader/Loader";
import UserTable from "./UsersTable";
import _ from "lodash"

const Users = ({
    users,
    setUsers: setUsers,
    ...rest
}) => {

    const count = users.length
    const pageSize = 8
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({path: "name", order: "asc"})


    const handleToggleBookMark = (id) => {
        console.log("this handleToggleBookMark and ID: ", id)
        setUsers(
            users.map(item => {
                if (item._id === id) {
                    return {...item, bookmark: !item.bookmark}
                }
                return item
            })
        )
    }

    const renderPhrase = () => {
        if (
            users.length === 1 ||
            (users.length > 20 && users.length % 10 === 1)
        ) {
            return "человек"
        }
        if (
            (users.length >= 2 && users.length <= 4) ||
            (users.length > 20 && users.length % 10 >= 2 && users.length <= 4)
        ) {
            return "человека"
        }
        return "человек"
    }

    const removeHundler = (id) => {
        const newUsers = []
        users.forEach((item) => {
            if (item._id !== id) {
                newUsers.push(item)
            }
        })
        setUsers(newUsers)
    }

    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex)
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {

    }

    useEffect(() => {
        console.log("useEffect started")
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectedProf()
    }

    const handleProfessionSelect = (item) => {
        console.log(item, ' ITEM FROM HANDLER PROF')
        setSelectedProf(item)
    }

    return count > 0 ? (
        <div className="d-flex">
            {professions
                ? (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )
                : <Loader/>
            }
            <div className="d-flex flex-column">
                <Phrase renderPhrase={renderPhrase} users={filteredUsers} />
                <UserTable
                    users={userCrop}
                    onSort={setSortBy}
                    selectedSort={sortBy}
                    removeHundler={removeHundler}
                    handleToggleBookMark={handleToggleBookMark}
                    {...rest}
                />
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={filteredUsers.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    ) : (
        <Phrase
            renderPhrase={renderPhrase}
            users={users}
            isNullUsers={true}
        />
    )
}

export default Users
