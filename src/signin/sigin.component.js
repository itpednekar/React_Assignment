import React, { Component } from 'react';
import { getHt, returnRegx } from '../services'
import Style from './sigin.style'
class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: [
        {
          key: 'em',
          type: 'email',
          val: '',
          required: true,
          valid: true
        },
        {
          key: 'pass',
          type: 'password',
          val: '',
          required: true,
          valid: true
        }
      ],
      isFormValid: true,
      isFormSubmitted: false,
      disableButton: true
    }
  }
  validateForm() {
    for (let i = 0; i < this.state.login.length; i++) {
      if (!this.state.login[i].valid)
        return false
    }
    this.setState({disableButton : false})
    return true
  }
  onChangeInpute(e, index) {
    let isValid = this.validate(e.target.value, index)
    let tempArray = this.state.login.slice(0)
    tempArray[index].val = e.target.value
    tempArray[index].valid = isValid
    this.setState({ login: tempArray })
    if(this.state.login[0].valid && this.state.login[1].valid)
    this.setState({disableButton : false})
  }
  validate(val, index) {
    let { key, type, valid, required, regx } = this.state.login[index]
    if (required) {
      console.log(val.length > 0)
      if (!(val.length >= 0))
        return false
    }
    switch (type) {
      case 'none':
        if (regx)
          return val.match(regx) ? true : false
        return true
        break
      default:
        return val.match(returnRegx(type)) ? true : false
        break
    }

  }
  onSubmitForm(event) {
    event.preventDefault();
    let isFormValid = this.validateForm();
    if (isFormValid) {
      console.log(this.state.login)
      this.setState({ isFormValid: true, isFormSubmitted: true })
    }
    else {
      this.setState({ isFormValid: false, isFormSubmitted: false })
    }
  }
  render() {
    let { login } = this.state;
    return (

      <div style={{ textAlign: 'center' }}>
        <form onSubmit={(e) => { this.onSubmitForm(e) }}>
          {(!this.state.isFormValid) &&
            <div style={{ color: 'red', padding: '5px' }}>Form is not valid! Scroll down for erros</div>}
          {(this.state.isFormValid && this.state.isFormSubmitted) &&
            <div style={{ color: 'green', padding: '5px' }}>Congratulations! Form submitted successfully!</div>}
          <div >
            <h2>Sign In</h2>
            <div>
              <input onChange={(e) => { this.onChangeInpute(e, 0) }} style={Style.inpute} value={login[0].val} type="text" />
              {!this.state.login[0].valid && <div style={{ padding: '5px', color: 'red' }}>Email is not valid</div>}
            </div>
            <div>
              <input onChange={(e) => { this.onChangeInpute(e, 1) }} style={Style.inpute} value={login[1].val} type="password" />
              {!this.state.login[1].valid && <div style={{ padding: '5px', color: 'red' }}>Password is not valid</div>}
            </div>
            <div>
              {
                 <button type="submit" style={Style.btn} disabled={this.state.disableButton}> Sign In</button>
              }
             
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Signin;
