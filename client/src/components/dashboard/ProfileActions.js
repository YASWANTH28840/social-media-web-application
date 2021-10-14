import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const ProfileActions = () => {
  const styles = {
    link: {
      color: "#c3f277",
      fontSize: "24px",
      margin: "30px",
    }
  }
    return(
        <Container>
            <Link style={{textDecoration:"none"}} to='/edit-profile'>
              <i className="fas fa-user-circle text-info mr-1"></i> <Span>Edit Profile</Span>
            </Link>
            <Link style={{textDecoration:"none"}} to="/add-experience">
              <i className="fab fa-black-tie text-info mr-1"></i>
              <Span>Add Experience</Span>
            </Link>
            <Link style={{textDecoration:"none"}} to="/add-education">
              <i className="fas fa-graduation-cap text-info mr-1"></i>
              <Span>Add Education</Span>
            </Link>
          </Container>
    )
}

const Container = styled.div`
  width: 100%,
`;
const Span = styled.span`
  color: #558f29;
  font-weight:500;
  font-size: 20px;
  margin: 30px;
  padding: 5px;
  &:hover {
    color: #094001;
    border-radius: 5px;
    background-color: #c3f277
  }
`;

export default ProfileActions