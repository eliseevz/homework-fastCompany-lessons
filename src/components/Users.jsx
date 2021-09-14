import React, { useEffect, useState } from "react"
import User from "./User"
import Phrase from "./Phrase"
import GroupList from "./groupList"
import api from "../API"
// eslint-disable-next-line import/no-duplicates,no-unused-vars
import Paginate from "../utils/paginate"
import Pagination from "./Pagination"
// eslint-disable-next-line import/no-duplicates
import paginate from "../utils/paginate"
import Loader from "./Loader/Loader";

const Users = ({
    users: AllUsers,
    renderPhrase,
    qualitiesHundler,
    removeHundler,
    getUserMark
}) => {
    const count = AllUsers.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()



    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex)
        setCurrentPage(pageIndex)
    }
    useEffect(() => {
        console.log("useEffect started")
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    console.log(AllUsers, " all users")
    const filteredUsers = selectedProf
        ? AllUsers.filter((user) => user.profession._id === selectedProf._id)
        : AllUsers
    const userCrop = paginate(filteredUsers, currentPage, pageSize)

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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Закладки</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user, index) => {
                            return (
                                <User
                                    selectedProf={selectedProf}
                                    getUserMark={getUserMark}
                                    key={index}
                                    user={user}
                                    qualitiesHundler={qualitiesHundler}
                                    removeHundler={removeHundler}
                                />
                            )
                        })}
                    </tbody>
                </table>
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
            users={AllUsers}
            isNullUsers={true}
        />
    )
}

export default Users
