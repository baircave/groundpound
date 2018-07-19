import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    formType: "Sign in",
    errors: state.errors.session.responseJSON || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formAction: (user) => dispatch(login(user)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
