import React from 'react'
import classnames from 'classnames'
import {useDispatch, useSelector} from 'react-redux'
import {registerUser} from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import { Redirect } from 'react-router'
import styled from 'styled-components'

function Register(){
  const dispatch = useDispatch()
  const [name,setName] = React.useState("")
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [password2,setPassword2] = React.useState('')
  const selectErrors = useSelector(state=>state.errors)
  var errors = selectErrors
 
  function onChangeName(event) {
    setName(event.target.value);
  }
  function onChangeEmail(event) {
    setEmail(event.target.value);
  }
  function onChangePassword(event) {
    setPassword(event.target.value);
  }
  function onChangePassword2(event) {
    setPassword2(event.target.value);
  }
  function onSubmit(event){
    event.preventDefault();
    const newUser = {
      name:name,
      email:email,
      password:password,
      password2:password2
    }
    dispatch(registerUser(newUser))
    Redirect('/')
  }
  const styles = {
    main: {
      backgroundColor: "#FFFFFF",
        width: "600px",
        height: "600px",
        margin: "10em auto",
        borderRadius: "1.5em",
        boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
    },
    sign: {
      paddingTop: "40px",
      color: "#80d43f",
      fontWeight: "bold",
      fontSize: "23px",
    },
    form1: {
      paddingTop: "40px",
      marginRight: "10%"
    },
    submit: {
      borderRadius: "5em",
        color:" #80d43f",
        fontWeight: "800",
        border: "0",
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "10px",
        paddingTop: "10px",
        marginLeft: "35%",
        fontSize: "18px",
        marginRight: "20%"
    }
  }
  return(
      <Container>
  <Content>
      <CTA>
        <div style={styles.main}>
          <p style={styles.sign} align="center">Sign in</p>
          <form style={styles.form1}noValidate onSubmit={onSubmit}>
          <TextFieldGroup
                  type = "text"
                  errors = {errors.name}
                  placeholder = "Username"
                  name = "username"
                  value = {name}
                  onChange = {onChangeName}
                />
                <TextFieldGroup
                  type = "email"
                  errors = {errors.email}
                  placeholder = "Email"
                  name = "Email"
                  value = {email}
                  onChange = {onChangeEmail}
                />
                <TextFieldGroup
                  type = "password"
                  errors = {errors.password}
                  placeholder = "Password"
                  name = "password"
                  value = {password}
                  onChange = {onChangePassword}
                />
                <TextFieldGroup
                  type = "password"
                  errors = {errors.password2}
                  placeholder = "Confirm Password"
                  name = "password2"
                  value = {password2}
                  onChange = {onChangePassword2}
                />
              <input 
              style={styles.submit}
              type="submit"/>
          </form>
        </div>
      </CTA>
  </Content>
</Container>
    )
}
const Container = styled.section`
overflow: hidden;
display: flex;
flex-direction: column;
text-align: center;
height: 100vh;
`;

const Content = styled.div`
margin-bottom = 10vh;
width: 100%;
position: relative;
min-height: 100vh;
box-sizing: border-box;
display:flex;
justify-content: center;
align-item: center;
flex-direction: column;
padding: 80px 40px;
height: 100%;
`;

const CTA = styled.div`
    margin-bottom: 2vw;
    max-width: 650px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 0;
    align-item: center;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    transition-timing-function: ease-out;
    transition: opacity 0.2s;
    width: 100%;
`;
export default Register;