import React from "react"
import PropTypes from "prop-types"
import {useQualities} from "../../../hooks/useQualities";

const QualitiesList = ({qualities}) => {
    console.log(qualities, ' qualities list')
    const {findById} = useQualities()
    return qualities.map((id, index) => {
        const cls = "badge bg-"
        const item = findById(id)
        console.log(item, ' this is item, returned from findbyId')
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