import "./styles.scss";
import { Placholders } from "./common/enums";
import { Link } from "react-router-dom";
import FormInput from "../common/form-input/form-input";
import useInput from "../../hooks/useInput";

const SignUp = () => {
  const usernameInput = useInput("", { isEmpty: true, minLength: 8});
  const emailInput = useInput("", { isEmpty: true, isEmail: true});
  const passwordInput = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 15,
  });

  return (
    <div className="auth-form-wrapper">
      <form className="auth-form">
        <h2 className="auth-form__title">Register</h2>
        <div className="auth-form__fieldset">
          
          {/* USERNAME */}
          
          <label className="auth-form__label">Username</label>
          <FormInput
            name="username"
            value={usernameInput.value}
            icon={<i className="fa fa-user"></i>}
            placeholder={Placholders.username}
            onChange={usernameInput.onChange}
            onBlur={usernameInput.onBlur}
          />
          {usernameInput.isDirty && usernameInput.minLengthError.value && (
            <span className="auth-form__error">
              {usernameInput.minLengthError.errorMessage}
            </span>
          )}

          {usernameInput.isDirty && usernameInput.isEmpty.value && (
            <span className="auth-form__error">
              {usernameInput.isEmpty.errorMessage}
            </span>
          )}

          {/* EMAIL */}

          <label className="auth-form__label">Email</label>
          <FormInput
            name="email"
            value={emailInput.value}
            icon={<i className="fa fa-at"></i>}
            placeholder={Placholders.email}
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
          />
          {emailInput.isDirty && emailInput.isEmpty.value && (
            <span className="auth-form__error">
              {emailInput.isEmpty.errorMessage}
            </span>
          )}

          {emailInput.isDirty && emailInput.emailError.value && (
            <span className="auth-form__error">
              {emailInput.emailError.errorMessage}
            </span>
          )}

          {/* PASSWORD */}

          <label className="auth-form__label">Password</label>
          <FormInput
            name="password"
            type="password"
            value={passwordInput.value}
            placeholder={Placholders.password}
            icon={<i className="fa fa-lock"></i>}
            onChange={passwordInput.onChange}
            onBlur={passwordInput.onBlur}
          />
          {passwordInput.isDirty && passwordInput.isEmpty.value && (
            <span className="auth-form__error">
              {passwordInput.isEmpty.errorMessage}
            </span>
          )}

          {passwordInput.isDirty && passwordInput.minLengthError.value && (
            <span className="auth-form__error">
              {passwordInput.minLengthError.errorMessage}
            </span>
          )}

          {passwordInput.isDirty && passwordInput.maxLengthError.value && (
            <span className="auth-form__error">
              {passwordInput.maxLengthError.errorMessage}
            </span>
          )}
        </div>

        <button
          className="auth-form__submit"
          type="submit"
          disabled={
            !usernameInput.isValid ||
            !emailInput.isValid ||
            !passwordInput.isValid
          }
        >
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
