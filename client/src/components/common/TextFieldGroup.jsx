import React from 'react'
import classnames from 'classnames'
 

function TextFieldGroup(props)
{
    const styles = {
        input: {
            width: "76%",
            color: 'rgb(38, 50, 56)',
            fontWeight: "700",
            fontSize: "14px",
            letterSpacing: "1px",
            background: "rgba(136, 126, 126, 0.04)",
            padding: "10px 20px",
            border: "none",
            borderRadius: "20px",
            outline: "none",
            boxSizing: "border-box",
            border: "2px solid rgba(0, 0, 0, 0.02)",
            // marginBottom: "50px",
            marginLeft: "46px",
            textAlign: "center",
            marginBottom: "27px",
        },
        invalid: {
            color: "red",
            marginLeft: "15%",
        }
    }

    return(
        <div className="form-group">
        <input 
        style={styles.input}
        type={props.type} 
        className={classnames('form-control form-control-lg',{
                'is-invalid':props.errors
            })} 
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange} />
        {props.errors && (<div style={styles.invalid}>
        {props.errors}
        </div>)}
        </div>
    )
    
}

export default TextFieldGroup;