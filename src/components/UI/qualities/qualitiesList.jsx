import React, {useEffect} from "react"
import PropTypes from "prop-types"
import {useDispatch, useSelector} from "react-redux";
import {getQualitiesByIds, loadQualitiesList} from "../../../store/qualities";

const QualitiesList = ({qualities}) => {

    const qualitiesList = useSelector(getQualitiesByIds(qualities))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    return qualitiesList.map((quality) => {
        const cls = "badge bg-"
        return (
            <span
                style={{ marginRight: 7 }}
                key={quality._id}
                className={cls + quality.color}
            >
                    {quality.name}
            </span>
        )
    })
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList