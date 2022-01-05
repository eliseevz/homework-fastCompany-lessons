import React from "react"
import {useProfessions} from "../../hooks/useProfession";
import PropTypes from "prop-types"

const Profession = ({id}) => {
    const {isLoading, getProfession} = useProfessions()
    console.log(id, ' this is ID in profession<>')
    const prof = getProfession(id)
    console.log(prof)
    if (!isLoading) {
        return <p>{prof.name}</p>
        // return <p>Работа</p>
    } else {
        return "loading"
    }
}

Profession.propTypes = {
    id: PropTypes.string
}

export default Profession