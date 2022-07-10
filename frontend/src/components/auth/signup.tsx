import "./styles.scss";
import { Placholders } from "./common/enums";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="auth-form-wrapper">
      <form className="auth-form">
        <h2 className="auth-form__title">Register</h2>
        <div className="auth-form__fieldset">
          <label className="auth-form__label">Email</label>
          <div className="auth-form__field">
            <i className="fa fa-at"></i>
            <input
              type="email"
              className="auth-form__input"
              placeholder={Placholders.email}
            />
          </div>
          <label className="auth-form__label">Your Name</label>
          <div className="auth-form__field">
            <i className="fa fa-user"></i>
            <input
              type="text"
              className="auth-form__input"
              placeholder={Placholders.username}
            />
          </div>
          <label className="auth-form__label">Your Password</label>
          <div className="auth-form__field">
            <i className="fa fa-lock"></i>
            <input type="password" className="auth-form__input" />
          </div>
        </div>
        <button className="auth-form__submit" type="submit">
          Register
        </button>
        <p className="auth-form__text">
          Already registered? <Link to={"/login"}>Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
