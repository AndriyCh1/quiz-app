import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { authActions } from '../store/auth';

import FormInput from '../components/form-input';
import Button from '../components/button';

import { MdAlternateEmail as EmailIcon } from 'react-icons/md';
import { AiFillLock as LockIcon } from 'react-icons/ai';
import { UserRoutes } from '../common/enums';

import useInput from '../hooks/useInput';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loginError, setLoginError] = useState('');

  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  const emailInput = useInput('', { isEmpty: true, isEmail: true });
  const passwordInput = useInput('', {
    isEmpty: true,
    minLength: 8,
    maxLength: 15,
  });

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    dispatch(authActions.login({ email: emailInput.value, password: passwordInput.value }))
      .unwrap()
      .catch((e) => setLoginError(e.response.data.message));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    navigate(UserRoutes.Quizzes);
  }

  return (
    <div className="auth-form-wrapper">
      <form className="auth-form" onSubmit={handleSubmitForm}>
        <h2 className="auth-form__title">{t('login.title')}</h2>
        {loginError && <div className="auth-form__submit-error">{loginError}</div>}
        <div className="auth-form__fieldset">
          <label className="auth-form__label">
            {t('login.emailLabel')}
            <span className="required">*</span>
          </label>
          <FormInput
            className={emailInput.isDirty && !emailInput.isValid ? 'error-input' : ''}
            type="email"
            name="email"
            value={emailInput.value}
            icon={<EmailIcon />}
            placeholder="example@gmail.com"
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
          />
          {emailInput.isDirty && emailInput.isEmpty.value && (
            <span className="auth-form__error">{emailInput.isEmpty.errorMessage}</span>
          )}

          {emailInput.isDirty && !emailInput.isEmpty.value && emailInput.emailError.value && (
            <span className="auth-form__error">{emailInput.emailError.errorMessage}</span>
          )}

          <label className="auth-form__label">
            {t('login.passwordLabel')}
            <span className="required">*</span>
          </label>
          <FormInput
            className={passwordInput.isDirty && !passwordInput.isValid ? 'error-input' : ''}
            name="password"
            type="password"
            value={passwordInput.value}
            placeholder="Password"
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
          {t('login.logInButton')}
        </Button>
        <p className="auth-form__text">
          {t('login.noAccountCreated')}{' '}
          <Link to={'/signup'}>{t('login.noAccountCreatedSignUp')}</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
