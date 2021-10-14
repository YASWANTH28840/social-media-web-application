import React from 'react'
import classnames from 'classnames'


function SelectListGroup(props)
{
    const selectOptions = props.options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))

    return(
        <div className="form-group">
            <select type={props.type} 
            className={classnames('form-control form-control-lg',{
                    'is-invalid':props.errors
                })}
            name={props.name}
            value={props.value}
            onChange={props.onChange}>
                {selectOptions}
            </select>
        {props.errors && (<div className='invalid-feedback'>
        {props.errors}
        </div>)}
        </div>
    )
    
}

export default SelectListGroup;