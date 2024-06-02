import React, { ChangeEventHandler } from "react"
import styled from "styled-components";
interface FromFieldProps {
    label?: string;
    name: string;
    value: string;
    type: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    errorMessage?: string | null;
}
const AppFormField: React.FC<FromFieldProps> = ({label, name, value, type, onChange, errorMessage}) =>{
    const classNameInput = `vs-form-input${errorMessage ? ' error' : ''}`;
    return (
        <AppFormFieldStyle>
            <div className='vs-form-field'>
                <label htmlFor={name} className='vs-form-label'>{label}</label>
                <input className={classNameInput} type={type} name={name} id={name} value={value} onChange={onChange} required />
                {errorMessage && (
                    <div className="vs-form-error-message">
                        {errorMessage}
                    </div>
                )}
            </div>
        </AppFormFieldStyle>
    )
}
export default AppFormField

const AppFormFieldStyle = styled.div `
    .vs-form-field {
        margin-bottom: 0.75rem;
    }
    .vs-form-label {
        color: var(--color-gray-400);
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 0.25rem;
    }
    .vs-form-input {
        display: block;
        width: 100%;
        padding: var(--p-2) var(--p-3);
        border-radius: var( --radius-1);
        background-color: rgba(85, 85, 85, 0.04);
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: var(--color-gray-700);
        outline: none;
    }
    .vs-form-input.error, .vs-form-input.error:focus {
        border: 1px solid red;
        box-shadow: 0 0 1px 3px rgba(255, 0, 0, 0.3);

    }

    .vs-form-input:focus {
        border: 1px solid var(--color-primary);
        box-shadow: 0 0 1px 3px rgba(var(--color-primary-rgb), 0.3);
    }
    .vs-form-error-message {
        color: red;
        font-size: 12px;
        margin-top: 0.5rem;
    }
`