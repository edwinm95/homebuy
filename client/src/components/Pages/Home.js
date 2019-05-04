import React, { Component } from 'react'
import styled from 'styled-components'
import MainImage from '../../assets/images/boston.jpg'
import {maxDeviceWidth} from '../DeviceLayout'
const HomeImage = styled.div`
    width: 100%;
    height: 600px;
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${MainImage}');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`
const Title = styled.h1`
  width: 50%;
  font-weight: 600;
  position: absolute;
  left: 25%;
  text-align: center;
  font-size: 60px;
  top: 15%;
  font-family: 'Playfair Display', serif;
  color: white;
  @media only screen and ${maxDeviceWidth.tablet} {
    font-size: 30px;
    width: 100%;
    text-align: center;
    left: 0;
  }
`
const SearchComponent = styled.div`
  width: 50%;
  height: 50px;
  top: 45%;
  position: absolute;
  left: 28%;
  border-width: 0px;
  cursor: pointer;
  @media only screen and ${maxDeviceWidth.tablet} {
    width: 90%;
    left:5%;
  }
`
const SearchTextBox = styled.input`
  width: 100%;
  height: 100%;
  float: left;
  font-size: 16px;
  -webkit-box-sizing:border-box;
  -moz-box-sizing:border-box;
  box-sizing:border-box;
  border: 0px;
  cursor: pointer;
  padding: 10px;
  @media only screen and ${maxDeviceWidth.tablet} {
    font-size: 14px;
  }
`
const SearchButton = styled.button`
  height: 90%;
  margin: 2px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 2px;
  font-size: 20px;
  padding: 5px;
  border: 0px;
  color: green;
  background-color: white;
`
class Home extends Component {
  render() {
    return (
     <HomeImage>
        <Title>Find the Perfect Home</Title>
        <SearchComponent>
          <SearchTextBox type='text' placeholder='Enter an address, neighborhood, city, or ZIP code' />
          <SearchButton>
            <i class="fal fa-search"></i>
          </SearchButton>
        </SearchComponent>
      </HomeImage>
    )
  }
}
export default Home
