import React, { Component } from 'react'
import SignUpLayout from '../Layout/SignUp/SignUp'
class Signup extends Component {
  render() {
    return (
      <div>
        <SignUpLayout modal={false}/>
      </div>
    )
  }
}
export default Signup