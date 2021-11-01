import React from 'react';
import Select from "react-select";
import PropTypes from "prop-types"
import SelectField from "./selectField";

const MultiSelectField = ({options, onChange, name, label, value}) => {

    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.keys(options).map(optionName => ({label: options[optionName].name, value: options[optionName]}))
        : options

    let defaultOptions = []

    if (value) {
        value.forEach(quality => {
            defaultOptions.push({
                label: quality.name, value: quality
            })
        })
    }

    const handleChange = (value) => {
        console.log(value, " value on change")
        console.log(value.map(item => item.value), " value on change")
        onChange({name: name, value: value.map(item => item.value)})
    }

    return (
        <div className="mb-4">
            <label>
                {label}
            </label>
            <Select
                isMulti
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
                closeMenuOnSelect={false}
                defaultValue={value ? defaultOptions : []}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    option: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default MultiSelectField;
