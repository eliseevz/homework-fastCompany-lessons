import React, {useState} from "react"
import PropTypes from "prop-types"

const TableHeader = ({onSort, selectedSort, columns}) => {

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const [sortType, setSortType] = useState({name: "name", order: "asc"})

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order==="asc"?"desc":"asc"
            })
            setSortType({name: item, order: selectedSort.order==="asc"?"desc":"asc"})
        } else {
            onSort({path: item, order: "asc"})
            setSortType({name: item, order: "asc"})
        }
    }

    return (
        <thead>
            <tr>
                { Object.keys(columns).map( (column) => (
                    <th
                        key={column}
                        onClick={columns[column].path ? ()=>handleSort(columns[column].path) : null}
                        {...{role: columns[column].path && "button"}}
                        scope="col">
                            {columns[column].name}
                            {sortType.name === columns[column].path
                                ? sortType.order === "asc" ?  <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>
                                : null
                            }
                    </th>
                )) }

                {/*<th scope="col">Качества</th>*/}
                {/*<th onClick={()=>handleSort("profession.name")} scope="col">Профессия</th>*/}
                {/*<th onClick={()=>handleSort("completedMeetings")} scope="col">Встретился, раз</th>*/}
                {/*<th onClick={()=>handleSort("rate")} scope="col">Оценка</th>*/}
                {/*<th onClick={()=>handleSort("bookmark")} scope="col">Закладки</th>*/}
                {/*<th scope="col"></th>*/}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableHeader