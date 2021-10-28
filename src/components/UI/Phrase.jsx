import React from "react"

const Phrase = (props) => {
    // eslint-disable-next-line react/prop-types
    if (!props.isNullUsers) {
        return (
            <span
                style={{ fontSize: 30, margin: 15 }}
                className="badge bg-primary"
            >
                {/* eslint-disable-next-line react/prop-types */}
                {props.users.length} {props.renderPhrase()} тусует сегодня{" "}
            </span>
        )
    } else {
        return (
            <span
                style={{ fontSize: 30, margin: 15 }}
                className="badge bg-danger"
            >
                Никто с тобой не тусует :({" "}
            </span>
        )
    }
}

export default Phrase
