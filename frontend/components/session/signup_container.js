import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
  return {
    formType: "Create account",
    errors: state.errors.session.responseJSON || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formAction: (user) => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
