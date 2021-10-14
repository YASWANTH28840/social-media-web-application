import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import {logUserOut} from '../../actions/authActions'
import styled from 'styled-components'
function Navbar(){

  const styles = {
    Brand: {
      letterSpacing: "12px",
      fontWeight: "650",
      color: "#80d43f",
      textDecoration: "none",
      fontSize: "24px"
    },
    NavMenu: {
      fontSize: "18px",
      letterSpacing: "1.42px",
      lineHeight: "1.08",
      padding: "2px 0",
      position: "relative",
      whiteSpace: "nowrap",
      textDecoration: "none",
      color: "#1b5e1c",
      padding: "25px"
    },
    NavMenuContainer: {
      alignItems: "center",
      flexflow: "row nowrap",
      height: "100%",
      margin: "10px",
      padding: "0px",
      position: "relative",
      marginRight: "auto",
      marginLeft: "25px",
      display: "flex",
    }
  }

  const {isAuthenticated,user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const style = {
    width: '25px',
    marginRight: '5px'
  }
  const authLinks = (
    <div style={styles.NavMenuContainer}>
        <Link style={styles.NavMenu} to="/dashboard">Dashboard</Link>
        <Link style={styles.NavMenu} to="/post">Posts</Link>
    <a style={styles.NavMenu} href="#" onClick = {() => {
      dispatch(logUserOut())
    }}>Logout</a>
  </div>
  )  
  const guestLinks = (
    <div style={styles.NavMenuContainer}>
      <Link style={styles.NavMenu} to="/register">SignUp</Link>
      <Link style={styles.NavMenu} to="/login">Login</Link>
    </div>   
  )

    return(
      <>
            <Nav>
                <Logo>
                  <Link style={styles.Brand} to="/">SOCIAL</Link>
                </Logo>
                <NavMenu>
                <Link style={styles.NavMenu} to="/profiles"> Developers</Link>
                {isAuthenticated ? authLinks : guestLinks }
                </NavMenu>
            </Nav>
      </>
    )
}
const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #f1fae8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    Link {
      letter-spacing: 15px;
      font-weight: 650;
      color: #80d43f;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;
    a {
        display: flex;
        align-item: center;
        padding: 0 12px;
        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0;
            position: relative;
            white-space: nowrap;
        }
    }
`;


export default Navbar;