import React from "react"
import PropTypes from "prop-types"

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    console.log(items, " this is items")
    const [itemsArray, newItems] = typeHandler(items)
    console.log(itemsArray)
    console.log(newItems, " this is newItems")
    return (
        <ul className="list-group">
            {itemsArray.map((item) => (
                <li
                    key={newItems[item][valueProperty]}
                    className={
                        "list-group-item" +
                        (newItems[item] === selectedItem ? " active" : "")
                    }
                    aria-current="true"
                    onClick={() => onItemSelect(newItems[item])}
                    role="button"
                >
                    {newItems[item][contentProperty]}
                </li>
            ))}
        </ul>
    )
}

const typeHandler = (items) => {
    if (Array.isArray(items)) {
        const newItems = {...items}
        return [Object.keys(newItems), newItems]
    }
    return [Object.keys(items), items]


}

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
}
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
}

export default GroupList
