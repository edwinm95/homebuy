import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
const LisitingComponent = styled.div`
  position: absolute;
  width: 80%;
  left: 10%;
  height: 500px;
  background-color: yellow;
`

  const fields = {
    adresss:{
      required: true
    },
    leaseduration:{
      required: true
    },
    securitydeposit:{
      required: true
    },
    beds:{
      required: true
    },
    baths:{
      required: false
    },
    squarefeet:{
      required: true
    } ,
    contactinfoname:{
      required: true
    },
    contactinfoemail:{
      required: true
    },
    contactinfophone:{
      required: true
    },
    contactinforentby:{
      required: true
    },
    amenitiesoptional:{
      required: false
    },
    amenitieslaundry:{
      required: true
    },
    amenitiespets:{
      required: true
    },
    photos:{
      required: true
    },
    showingavaliability:{
      required: false
    }
  }


  class ListRental extends Component {
    state = {
      adresss:{
        value: null,
        errors: true
      },
      leaseduration:{
        value: null,
        errors: true
      },
      securitydeposit:{
        value: null,
        errors: true
      },
      beds:{
        value: null,
        errors: true
      },
      baths:{
        value: null,
        errors: true,
      },
      squarefeet: {
        value: null,
        errors: true,
      },
      contactinfoname:{
        value: null,
        errors: true
      },
      contactinfoemail:{
        value: null,
        errors: true
      },
      contactinfophone:{
        value: null,
        errors: true
      },
      contactinforentby:{
        value: null,
        errors: true
      },
      amenitiesoptional:{
        value: null,
        errors: true
      },
      amenitieslaundry:{
        value: null,
        errors: true
      },
      amenitiespets:{
        value: null,
        errors: true,
      },
      photos:{
        value: [],
        errors: true
      },
      showingavaliability:{
        value: null,
        errors: false
      }
    }
    renderRequired(){
      const RequiredComponent = styled.div`
        color: red;
        font-size: 0.7em;
        display: inline-block;
        padding: 0.5em;
      `
      return<RequiredComponent>*</RequiredComponent>
    }
    renderOptional(){
      const OptionalComponent = styled.div`
        display: inline-block;
        color: #ccc;
        font-size: 0.7em;
        padding: 0.5em;
      `
      return<OptionalComponent>(Optional)</OptionalComponent>
    }
    render(){
        return(
            <div>
              <LisitingComponent>

              </LisitingComponent>
            </div>
            )
    }
  }
    
  const mapStateToProps =  state => {
    return {token: state.token}
  }

  export default connect(mapStateToProps)(ListRental)
