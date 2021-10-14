import React from 'react'
import classnames from 'classnames'


function TextAreaFieldGroup(props)
{
    return(
        <div className="form-group">
        <textarea 
        type={props.type} 
        className={classnames('form-control form-control-lg',{
                'is-invalid':props.errors
            })} 
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange} />
        {props.errors && (<div className='invalid-feedback'>
        {props.errors}
        </div>)}
        </div>
    )
    
}

export default TextAreaFieldGroup;