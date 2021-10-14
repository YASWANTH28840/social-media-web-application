import React from 'react'
import classnames from 'classnames'


function InputGroup(props)
{
    return(
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={props.icon}/>
                </span>
            </div>
            <input 
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

export default InputGroup;