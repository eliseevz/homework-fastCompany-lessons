import React from "react"
import {useMockData} from "../utils/mockData";

const Main = (props) => {

    const { error, initialize, progress, status} = useMockData()

    const handleClick = async () => {
        console.log('clicked')
        await initialize()
    }

    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {
                    error && <li>error: {error}</li>
                }

            </ul>
            <button onClick={handleClick} className="btn btn-primary">
                Инициализировать
            </button>
        </div>
    )
}

export default Main