import React, { Component, useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import styled from 'styled-components'

function Login(){

  const {isAuthenticated, user} = useSelector(state => state.auth)

  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  var [errors, setErrors] = React.useState({
    email:'',
    password:''
  })

  function onChangeEmail(event){
    setEmail(event.target.value)
  }
  function onChangePassword(event){
    setPassword(event.target.value)
  }
  const dispatch = useDispatch()
  const selectErrors = useSelector(state=>state.errors)
  errors = selectErrors

  function onSubmit(event){
    event.preventDefault();
    const newUser = {
      email:email,
      password:password
    }
    dispatch(loginUser(newUser))
  }

  const styles = {
    main: {
      backgroundColor: "#FFFFFF",
        width: "600px",
        height: "400px",
        margin: "7em auto",
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
                type = "email"
                errors = {errors.email}
                placeholder = "Email Address"
                name = "email"
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

export default Login;