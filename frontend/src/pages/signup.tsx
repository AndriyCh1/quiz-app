import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import useInput from '../hooks/useInput';

import { AuthFormPlaceholder } from './common/auth/enums';
import { authActions } from '../store/auth';

import FormInput from '../components/form-input';
import Button from '../components/button';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);
  const [signupError, setSignupError] = useState('');

  const usernameInput = useInput('', { isEmpty: true, minLength: 2 });
  const emailInput = useInput('', { isEmpty: true, isEmail: true });
  const passwordInput = useInput('', {
    isEmpty: true,
    minLength: 8,
    maxLength: 15,
  });

  const handleSubmit = (evnt: React.FormEvent) => {
    evnt.preventDefault();

    dispatch(
      authActions.signup({
        email: emailInput.value,
        password: passwordInput.value,
        fullName: usernameInput.value,
      }),
    )
      .unwrap()
      .catch((e) => {
        setSignupError(e.response.data.message);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    navigate('/home');
  }

  return (
    <div className="auth-form-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Register</h2>
        {signupError && <div className="auth-form__submit-error">{signupError}</div>}
        <div className="auth-form__fieldset">
          {/* USERNAME */}

          <label className="auth-form__label">Full name</label>
          <FormInput
            className={`form-input__input ${
              usernameInput.isDirty && !usernameInput.isValid && 'error-input'
            }`}
            name="username"
            value={usernameInput.value}
            icon={<i className="fa fa-user"></i>}
            placeholder={AuthFormPlaceholder.username}
            onChange={usernameInput.onChange}
            onBlur={usernameInput.onBlur}
          />

          {usernameInput.isDirty && usernameInput.isEmpty.value && (
            <span className="auth-form__error">{usernameInput.isEmpty.errorMessage}</span>
          )}

          {usernameInput.isDirty &&
            !usernameInput.isEmpty.value &&
            usernameInput.minLengthError.value && (
              <span className="auth-form__error">{usernameInput.minLengthError.errorMessage}</span>
            )}
          {/* EMAIL */}

          <label className="auth-form__label">Email</label>
          <FormInput
            className={`form-input__input ${
              emailInput.isDirty && !emailInput.isValid && 'error-input'
            }`}
            name="email"
            type="email"
            value={emailInput.value}
            icon={<i className="fa fa-at"></i>}
            placeholder={AuthFormPlaceholder.email}
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
          />
          {emailInput.isDirty && emailInput.isEmpty.value && (
            <span className="auth-form__error">{emailInput.isEmpty.errorMessage}</span>
          )}

          {emailInput.isDirty && !emailInput.isEmpty.value && emailInput.emailError.value && (
            <span className="auth-form__error">{emailInput.emailError.errorMessage}</span>
          )}

          {/* PASSWORD */}

          <label className="auth-form__label">Password</label>
          <FormInput
            className={`form-input__input ${
              passwordInput.isDirty && !passwordInput.isValid && 'error-input'
            }`}
            name="password"
            type="password"
            value={passwordInput.value}
            placeholder={AuthFormPlaceholder.password}
            icon={<i className="fa fa-lock"></i>}
            onChange={passwordInput.onChange}
            onBlur={passwordInput.onBlur}
          />
          {passwordInput.isDirty && passwordInput.isEmpty.value && (
            <span className="auth-form__error">{passwordInput.isEmpty.errorMessage}</span>
          )}

          {passwordInput.isDirty &&
            !passwordInput.isEmpty.value &&
            passwordInput.minLengthError.value && (
              <span className="auth-form__error">{passwordInput.minLengthError.errorMessage}</span>
            )}

          {passwordInput.isDirty &&
            !passwordInput.isEmpty.value &&
            passwordInput.maxLengthError.value && (
              <span className="auth-form__error">{passwordInput.maxLengthError.errorMessage}</span>
            )}
        </div>

        <Button
          className="auth-form__submit"
          type="submit"
          disabled={!usernameInput.isValid || !emailInput.isValid || !passwordInput.isValid}
        >
          Register
        </Button>
        <p className="auth-form__text">
          Already registered? <Link to={'/login'}>Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
