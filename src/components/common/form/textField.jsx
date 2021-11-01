import React, {useState} from 'react';
import PropTypes from "prop-types"

const TextField = ({label, type, name, value, onChange, error, textarea = false, rows = 0}) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = ({target}) => {
        console.log(target, " target from textfield")
        onChange({name: target.name, value: target.value})
    }

    const getInputClasses = () => {
        return 'form-control' + (error ? " is-invalid" : "")
    }

    const togglePassword = () => {
        setShowPassword((prevState => !prevState))
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                {
                    textarea
                        ? <textarea
                            className={getInputClasses()}
                            type={showPassword ? "text" : type}
                            id={name}
                            name={name}
                            value={value}
                            rows={rows}
                            resize="none"
                            onChange={handleChange}
                        />
                        :<input
                            className={getInputClasses()}
                            type={showPassword ? "text" : type}
                            id={name}
                            name={name}
                            value={value}
                            onChange={handleChange}
                        />

                }
                {
                    type === "password" && (
                        <button
                            className="btn btn-outline-secondary"
                            role="button"
                            onClick={togglePassword}
                        >
                            <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
                        </button>
                    )
                }
                {
                    error && <div className="invalid-feedback">{error}</div>
                }
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
}
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default TextField;
