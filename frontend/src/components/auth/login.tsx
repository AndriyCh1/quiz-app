import "./styles.scss";
import { AuthFormPlaceholder } from "./common/enums";
import {Link, useNavigate} from "react-router-dom";
import FormInput from "../common/form-input/form-input";
import useInput from "../../hooks/useInput";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {authActions} from "../../store/auth";
import React, {useState} from "react";

const LogIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading } = useAppSelector(state => state.auth);
  const [loginError, setLoginError] = useState("");

  const emailInput = useInput("", { isEmpty: true, isEmail: true }); 
  const passwordInput = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 15,
  });

  const handleSubmit = (evnt: React.FormEvent) => {
    evnt.preventDefault()

    dispatch(authActions.login({email: emailInput.value, password: passwordInput.value}))
        .unwrap()
        .catch(e => {
          // TODO: make error handling more predictable (change e.response.data.message)
          setLoginError(e.response.data.message);
        })
  }

  if (isLoading) {
    return (
        <div>Loading...</div>
    )
  }

  if (isAuth) {
    navigate("/home")
  }

  return (
    <div className="auth-form-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Log In</h2>
        { loginError &&
          <div className="auth-form__submit-error">
            {loginError}
          </div>
        }
        <div className="auth-form__fieldset">
        <label className="auth-form__label">Email</label>
          <FormInput
            className={`form-input__input ${emailInput.isDirty && !emailInput.isValid && "error-input"}`}
            name="email"
            value={emailInput.value}
            icon={<i className="fa fa-at"></i>}
            placeholder={AuthFormPlaceholder.email}
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
            className={`form-input__input ${passwordInput.isDirty && !passwordInput.isValid && "error-input"}`}
            name="password"
            type="password"
            value={passwordInput.value}
            placeholder={AuthFormPlaceholder.password}
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
            !emailInput.isValid ||
            !passwordInput.isValid
          }>
          Log in
        </button>
        <p className="auth-form__text">
          Don`t have an account? <Link to={"/signup"}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
