import React, { useEffect, useState } from "react"
import Phrase from "../../UI/Phrase"
import GroupList from "../../common/groupList"
import api from "../../../API"
import Pagination from "../../common/Pagination"
import paginate from "../../../utils/paginate"
import Loader from "../../Loader/Loader";
import UserTable from "../../UI/UsersTable";
import _ from "lodash"
import SearchUser from "../../searchUser";

const UsersListPage = () => {
    const [users, setUsers] = useState()

    useEffect(()=> {
        api.users.fetchAll()
            .then(data => {
                setUsers(data)
            })
    },[])

    const pageSize = 8
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({path: "name", order: "asc"})
    const [search, setSearch] = useState("")


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

    const handleSearch = (e) => {
        console.log(e.target.value)
        if (e.target.value !== "") {
            clearFilter()
        }
        setSearch(e.target.value)
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

    useEffect(() => {
        console.log("useEffect started")
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])


    const handleProfessionSelect = (item) => {
        console.log(item, ' ITEM FROM HANDLER PROF')
        setSearch("")
        setSelectedProf(item)
    }

    const clearFilter = () => {
        setSelectedProf()
    }

    if (users) {

        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const searchedUsers = search
            ? users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
            : sortedUsers
        const userCrop = paginate(searchedUsers, currentPage, pageSize)

        return (
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
                    <SearchUser onSearch={handleSearch} search={search} />
                    <UserTable
                        users={userCrop}
                        onSort={setSortBy}
                        selectedSort={sortBy}
                        removeHundler={removeHundler}
                        handleToggleBookMark={handleToggleBookMark}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={search ? searchedUsers.length : filteredUsers.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            loading
        </div>
    )
    // ) : (
    //     <Phrase
    //         renderPhrase={renderPhrase}
    //         users={users}
    //         isNullUsers={true}
    //     />
    // )
}

export default UsersListPage