import React, { Component } from 'react';
import SimpleBox from '../Components/SimpleBox';
import InputField from '../Components/InputField';
import FooterFormButton from '../Components/FooterFormButton';
import { login, getUser, loginWithGoogle, loginWithFacebook, loginWithTwitter, loginWithGithub } from '../Actions/UserActions';
import { connect } from 'react-redux';
import ErrorAlert from '../Components/ErrorAlert';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  componentWillMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/');
    }
  }

  submitLogin(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password).catch(err => {
      this.setState({
        error: err
      });
    });
  }

  signWithGoogle() {
    this.props.loginWithGoogle().then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      console.log('token', token);
      // The signed-in user info.
      const user = result.user;
      console.log('user', user);
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  signWithFacebook() {
    this.props.loginWithFacebook().then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      console.log('token', token);
      // The signed-in user info.
      const user = result.user;
      console.log('user', user);
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  signWithTwitter(){
    this.props.loginWithTwitter().then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      console.log('token', token);
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
      console.log('user', user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signWithGithub(){
    this.props.loginWithGithub().then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      console.log('token', token);
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
      console.log('user', user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  renderBody() {
    const errStyle = {
      borderColor: 'red'
    };

    return (
      <form onSubmit={event => { this.submitLogin(event); }}>
        <div>
          <InputField id="email" type="text" label="Email"
            inputAction={(event) => this.setState({ email: event.target.value })}
            style={this.state.error ? errStyle : null}
          />
          <InputField id="password" type="password" label="Password"
            inputAction={(event) => this.setState({ password: event.target.value })}
            style={this.state.error ? errStyle : null}
          />
          {this.state.error && <ErrorAlert>Your username/password is incorrect</ErrorAlert>}
          <FooterFormButton submitLabel="Sign in" otherLabel="Create Account"
            goToLink="/CreateAccount" {...this.props}
          />
          <br />
          <div className="container">
            <button type="button" className="btn btn-danger btn-block" onClick={this.signWithGoogle.bind(this)}>Sign in with Google</button>
            <button type="button" className="btn btn-success btn-block" onClick={this.signWithFacebook.bind(this)}>Sign in with facebook</button>
            <button type="button" className="btn btn-secondary btn-block" onClick={this.signWithTwitter.bind(this)}>Sign in with twitter</button>
            <button type="button" className="btn btn-warning btn-block" onClick={this.signWithGithub.bind(this)}>Sign in with Github</button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div>
        <SimpleBox title="Sign in" body={this.renderBody()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { login, getUser, loginWithGoogle, loginWithFacebook, loginWithTwitter, loginWithGithub })(Login);
