import React from 'react';
import { login } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginGuest = this.loginGuest.bind(this);
    this.state = { username: "", password: "" };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.formAction(Object.assign({}, this.state)).then(
      () => this.props.closeModal()
    );
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  loginGuest() {
    this.props.login({username: "guest", password: "asdfasdf"}).then(
      () => this.props.closeModal()
    );
  }

  render() {
    return (
        <form className="session-form"
              onSubmit={this.handleSubmit}>
          { (this.props.formType === "Sign in") ?
            <h1>Sign in to Groundpound</h1> :
            <h1>Make your new Groundpound account</h1>
          }
          {Object.values(this.props.errors).map((error) => <span>{error}</span>)}
          <input
            onChange={this.updateField("username")}
            type="text"
            placeholder="Username *"
            value={this.state.username}
            autoFocus />
          <input
            onChange={this.updateField("password")}
            type="password"
            placeholder="Password *"
            value={this.state.password} />
          <button className="color-button">{this.props.formType}</button>
          <p>Do you remember that time I wrote out this entire paragraph element to simulate a whole bunch of legalese? Because I do. Groundpound is about as legally tight as 3 year old spanx owned by a sumo wrestler. Your boy is looking for all kinds of cease and desist action up in here</p>
          <div className="trans-button guest-login-button"
            onClick={this.loginGuest}>Guest Login</div>
        </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(null, mapDispatchToProps)(SessionForm);
