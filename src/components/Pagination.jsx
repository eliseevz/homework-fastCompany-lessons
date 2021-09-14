import React from "react"
import _ from "lodash"
import PropType from "prop-types"

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage } = props
    const pageCount = Math.ceil(itemsCount / pageSize)
    if (pageCount === 1) return null
    const pages = _.range(1, pageCount + 1)

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            "page-item " +
                            (page === currentPage ? "active" : "")
                        }
                    >
                        <a
                            onClick={() => props.onPageChange(page)}
                            className="page-link"
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    itemsCount: PropType.number.isRequired,
    pageSize: PropType.number.isRequired,
    currentPage: PropType.number.isRequired,
    onPageChange: PropType.func.isRequired
}

export default Pagination
