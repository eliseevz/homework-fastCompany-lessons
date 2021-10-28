import React from 'react';
import PropTypes from "prop-types"

const SelectField = ({label, value, onChange, defaultOption, options, error}) => {

    const getInputClasses = () => {
        return 'form-select' + (error ? " is-invalid" : "")
    }

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    const optionsArray = !Array.isArray(options)&&typeof options === "object"
        ? Object.keys(options).map(optionName => ({name: options[optionName].name, value: options[optionName]._id}))
        : options

    console.log(optionsArray, " options array")

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">{label}</label>
            <select
                className={getInputClasses()}
                id="validationCustom04"
                name="profession"
                value={value}
                onChange={handleChange}
            >
                <option selected={value === ""} disabled value="">{defaultOption}</option>
                { optionsArray && optionsArray.map(profession =>
                    <option
                        value={profession.value}
                        key={profession.value}
                    >
                        {profession.name}
                    </option>
                )
                }
            </select>
            {error && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    );
};

SelectField.propTypes = {
    defaultOptions: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    option: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default SelectField;
