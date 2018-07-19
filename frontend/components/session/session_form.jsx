import React from 'react';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { username: "", password: "" };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.formAction(Object.assign({}, this.state));
    this.props.closeModal();
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  render() {
    return (
        <form className="session_form"
              onSubmit={this.handleSubmit}>
          { (this.props.formType === "Sign in") ?
            <h1>Sign in to Groundpound</h1> :
            <h1>Make your new Groundpound account</h1>
          }
          <span>{Object.values(this.props.errors)}</span>
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
          <button className="colorButton">{this.props.formType}</button>
          <p>Do you remember that time I wrote out this entire paragraph element to simulate a whole bunch of legalese? Because I do. Groundpound is about as legally tight as 3 year old spanx owned by a sumo wrestler. Your boy is looking for all kinds of cease and desist action up in here</p>
        </form>
    );
  }
}
