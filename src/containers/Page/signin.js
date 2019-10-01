import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
// import Firebase from '../../helpers/firebase';
// import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import notifications from '../../components/feedback/notification';

const { login } = authAction;
class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    username: '',
    password: ''
  };
  // UNSAFE_componentWillReceiveProps(nextProps){
  //   if (
  //     this.props.isLoggedIn !== nextProps.isLoggedIn &&
  //     nextProps.isLoggedIn === true
  //   ) {
  //     this.setState({ redirectToReferrer: true });
  //   }
  // }
  handleLogin = () => {
    const { login, response } = this.props;
    const { username, password } = this.state
    if (username === '' || password === '') {
      notifications.warning({
        message: 'HKT Counter Info',
        description: 'Please input username & password',
        placement: "bottomRight",
        duration: 2,
      })
      return;
    } else {
      login({
        username: username,
        password: password
      });
      if (response.status !== 200) {
        notifications.warning({
          message: 'HKT Counter Info',
          description: response.message,
          placement: "bottomRight",
          duration: 2,
        })
      }
    }
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
              </div>

              <div className="isoInputWrapper">
                <Input type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
              {/* 
              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p> */}

              {/* <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>

                {Auth0.isValid &&
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signInAuth0" />
                  </Button>}

                {Firebase.isValid && <FirebaseLogin login={this.handleLogin} />}
              </div> */}

              {/* <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div> */}

              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>

                {/* <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null,
    response: state.Auth.response
  }),
  { login }
)(SignIn);
