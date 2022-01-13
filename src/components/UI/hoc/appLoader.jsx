import React, {useEffect} from 'react';
import PropTypes from "prop-types"
import {useDispatch, useSelector} from "react-redux";
import {loadQualitiesList} from "../../../store/qualities";
import {loadProfessionsList} from "../../../store/professions";
import {getDataStatus, getLoginStatus, getUsersLoadingStatus, loadUsersList} from "../../../store/users";

const AppLoader = ({children}) => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getLoginStatus())
    const usersStatsLoading = useSelector(getUsersLoadingStatus())

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
        if (isLoggedIn) {
            dispatch(loadUsersList())
        }
    }, [isLoggedIn])

    if (usersStatsLoading) return "loading"
    return children
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AppLoader;
