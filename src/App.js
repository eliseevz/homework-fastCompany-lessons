import React, {useEffect, useState} from "react"
import Users from "./components/Users"
import api from "./API"
import Loader from "./components/Loader/Loader";

const App = () => {
    
    const [users, setUsers] = useState()

    useEffect(()=> {
        api.users.fetchAll()
            .then(data => {
                setUsers(data)
            })

    },[App])

    console.log(users)

    const getUserMark = (userId) => {
        console.log("marked or unmarked")
        const newArr = users.map((user) => {
            if (userId === user._id) {
                return {
                    ...user,
                    isMarked: !user.isMarked
                }
            }
            return user
        })
        setUsers(newArr)
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

    const qualitiesHundler = (qualities) => {
        return qualities.map((item, index) => {
            const cls = "badge bg-"
            return (
                <span
                    style={{ marginRight: 7 }}
                    key={index}
                    className={cls + item.color}
                >
                    {item.name}
                </span>
            )
        })
    }

    const removeHundler = (event) => {
        const deletedId = event.target.closest(".personElement").id
        const newUsers = []
        users.forEach((item) => {
            if (item._id !== deletedId) {
                newUsers.push(item)
            }
        })
        console.log(newUsers)
        setUsers(newUsers)
    }

    return (
        users
        ? <Users
            getUserMark={getUserMark}
            users={users}
            renderPhrase={renderPhrase}
            qualitiesHundler={qualitiesHundler}
            removeHundler={removeHundler}
        />
        : <Loader/>
    )
}

export default App
