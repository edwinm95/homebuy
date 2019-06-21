import React, { Component } from 'react'
import styled from 'styled-components'
import SignUp from '../../Layout/SignUp'
const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(255,255,255,0.8);
    position: fixed;
    top: 0;
    left: 0;
`
class SignUpModal extends Component {
  constructor(props){
      super(props)
      this.state = {

      }
      this.closeModal = this.closeModal.bind(this)
  }
  closeModal(){
      this.props.close()
  }
  componentDidMount(){
    window.addEventListener('click', this.handleClose, false)
}
componentWillUnmount(){
    window.removeEventListener('click',this.handleClose, false)
}
handleClose = (event) => {
  if(this.modalbackground === event.path[0]){
      this.closeModal()
  }
}
  render() {
    return (
      <ModalBackground ref={(ref) => this.modalbackground = ref}>
            <SignUp modal close={this.closeModal} />
      </ModalBackground>
    )
  }
}

export default SignUpModal
