import React, { useState } from "react"
import User from "./User"
import Phrase from "./Phrase"
// eslint-disable-next-line import/no-duplicates,no-unused-vars
import Paginate from "../utils/paginate"
import Pagination from "./Pagination"
// eslint-disable-next-line import/no-duplicates
import paginate from "../utils/paginate"

const Users = ({
    // eslint-disable-next-line react/prop-types
    users: AllUsers,
    // eslint-disable-next-line react/prop-types
    renderPhrase,
    // eslint-disable-next-line react/prop-types
    qualitiesHundler,
    // eslint-disable-next-line react/prop-types
    removeHundler,
    // eslint-disable-next-line react/prop-types
    getUserMark
}) => {
    const count = AllUsers.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex)
        setCurrentPage(pageIndex)
    }

    const userCrop = paginate(AllUsers, currentPage, pageSize)

    return count > 0
        ? (
            <>
                <Phrase renderPhrase={renderPhrase} users={AllUsers}/>
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
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        )
        : (
            <Phrase
                renderPhrase={renderPhrase}
                users={AllUsers}
                isNullUsers={true}
            />
        )
}

export default Users
