import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthFormPlaceholder } from './common/enums/auth';
import useInput from '../hooks/useInput';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { authActions } from '../store/auth';
import FormInput from '../components/form-input';
import Button from '../components/button';
import { MdAlternateEmail as EmailIcon } from 'react-icons/md';
import { AiFillLock as LockIcon } from 'react-icons/ai';
import { UserRoutes } from '../common/enums';

const LogIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);
  const [loginError, setLoginError] = useState('');

  const emailInput = useInput('', { isEmpty: true, isEmail: true });
  const passwordInput = useInput('', {
    isEmpty: true,
    minLength: 8,
    maxLength: 15,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(authActions.login({ email: emailInput.value, password: passwordInput.value }))
      .unwrap()
      .catch((e) => {
        // TODO: make error handling more predictable (change e.response.data.message)
        setLoginError(e.response.data.message);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    navigate(UserRoutes.Quizzes);
  }

  return (
    <div className="auth-form-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Log In</h2>
        {loginError && <div className="auth-form__submit-error">{loginError}</div>}
        <div className="auth-form__fieldset">
          <label className="auth-form__label">Email</label>
          <FormInput
            className={emailInput.isDirty && !emailInput.isValid ? 'error-input' : ''}
            name="email"
            value={emailInput.value}
            icon={<EmailIcon />}
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
            className={passwordInput.isDirty && !passwordInput.isValid ? 'error-input' : ''}
            name="password"
            type="password"
            value={passwordInput.value}
            placeholder={AuthFormPlaceholder.password}
            icon={<LockIcon />}
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
          disabled={!emailInput.isValid || !passwordInput.isValid}
        >
          Log in
        </Button>
        <p className="auth-form__text">
          Don`t have an account? <Link to={'/signup'}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
