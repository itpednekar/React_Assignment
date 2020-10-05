import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getHt, returnRegx, fakeLogin } from '../services'
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
          valid: true,
          errMsg: 'Email is not valid !'
        },
        {
          key: 'pass',
          type: 'password',
          val: '',
          required: true,
          valid: true,
          errMsg: ''
        }
      ],
      isFormValid: true,
      isFormSubmitted: false,
      disableButton: true,
      formErr: false,
      errMsg: '',
    }
  }
  validateForm() {
    for (let i = 0; i < this.state.login.length; i++) {
      if (!this.state.login[i].valid)
        return false
    }
    this.setState({ disableButton: false })
    return true
  }
  onChangeInpute(e, index) {
    let isValid = this.validate(e.target.value, index)
    let tempArray = this.state.login.slice(0)
    tempArray[index].val = e.target.value
    tempArray[index].valid = isValid
    this.setState({ login: tempArray })
    if (this.state.login[0].valid && this.state.login[1].valid)
      this.setState({ disableButton: false })
  }
  validate(val, index) {
    let { key, type, valid, required, regx } = this.state.login[index]
    let tempObj = this.state.login.slice(0)
    if (required) {
      if (!(val.length >= 0))
        return false
    }
    switch (type) {
      case 'none':
        if (regx)
          return val.match(regx) ? true : false
        return true
        break
      case 'password':
        if (val.length >= 6) {
          if (/[A-Z]/.test(val.slice(0, 1))) {
            let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            if (format.test(val))
              return true
            else {
              tempObj[1].errMsg = 'Password must contain atlest one special character!'
              this.setState({ login: tempObj })
              return false
            }
          }
          else {
            tempObj[1].errMsg = 'First letter of password must be Upper case!'
            this.setState({ login: tempObj })
            return false
          }

        }
        else {
          tempObj[1].errMsg = 'Password must be greater than 6 digits!'
          this.setState({ login: tempObj })
          return false
        }

      default:
        return val.match(returnRegx(type)) ? true : false
        break
    }

  }
  onSubmitForm(event) {
    event.preventDefault();
    let isFormValid = this.validateForm();
    let credentials = this.state.login
    if (isFormValid) {
      console.log(credentials)
      fakeLogin(credentials[0].val,
        credentials[1].val,
        (auth) => {
          console.log('auth', auth)
          this.props.login(true)
          this.setState({ isFormSubmitted: true, isFormValid: true, login: credentials })
        },
        (err) => {
          console.log('Error ', err)
          this.setState({ isFormSubmitted: false, formErr: true, errMsg: err })

        })
    }
  }
  render() {
    let { login, formErr, errMsg } = this.state;
    return (

      <div style={{ textAlign: 'center' }}>
        <form onSubmit={(e) => { this.onSubmitForm(e) }}>
          {(!this.state.isFormValid) &&
            <div style={{ color: 'red', padding: '5px' }}>Form is not valid! Scroll down for erros</div>}
          {(this.state.isFormValid && this.state.isFormSubmitted) &&
            <div style={{ color: 'green', padding: '5px' }}>Congratulations! Form submitted successfully!</div>}
          <div >
            {formErr && <div style={{ color: 'red', padding: '5px' }} >{errMsg}</div>}
            <h2>Sign In</h2>
            <div>
              <input onChange={(e) => { this.onChangeInpute(e, 0) }} style={Style.inpute} value={login[0].val} type="text" />
              {!this.state.login[0].valid && <div style={{ padding: '5px', color: 'red' }}> {this.state.login[0].errMsg}</div>}
            </div>
            <div>
              <input onChange={(e) => { this.onChangeInpute(e, 1) }} style={Style.inpute} value={login[1].val} type="password" />
              {!this.state.login[1].valid && <div style={{ padding: '5px', color: 'red' }}>{this.state.login[1].errMsg}</div>}
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
