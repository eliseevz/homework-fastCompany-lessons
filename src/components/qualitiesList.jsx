import React from "react"
import PropTypes from "prop-types"

const QualitiesList = ({qualities}) => {
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

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList