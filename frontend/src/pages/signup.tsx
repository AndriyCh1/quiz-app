import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import useInput from '../hooks/useInput';

import { UserRoutes } from '../common/enums';
import { AuthFormPlaceholder } from './common/enums/auth';
import { authActions } from '../store/auth';

import FormInput from '../components/form-input';
import Button from '../components/button';

import { MdAlternateEmail as EmailIcon } from 'react-icons/md';
import { AiFillLock as LockIcon } from 'react-icons/ai';
import { FaUser as UserIcon } from 'react-icons/fa';
import { RiCloseFill as RemoveIcon } from 'react-icons/ri';

import Modal from '../components/modal';
import ImageCropper from '../components/image-cropper';
import FileInput from '../components/file-input';

let imageObjectUrl: string | null = null;

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  const [signupError, setSignupError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [cropper, setCropper] = useState<Cropper | undefined>();
  const [showCropImageModal, setShowCropImageModal] = useState(false);
  const [selectedImageError, setSelectedImageError] = useState('');

  const usernameInput = useInput('', { isEmpty: true, minLength: 2 });
  const emailInput = useInput('', { isEmpty: true, isEmail: true });
  const passwordInput = useInput('', {
    isEmpty: true,
    minLength: 8,
    maxLength: 15,
  });

  useEffect(() => {
    // free memory when ever this component is unmounted
    return () => {
      if (imageObjectUrl !== null) {
        URL.revokeObjectURL(imageObjectUrl);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedImageError) {
      const imageErrorTimeout = setTimeout(() => setSelectedImageError(''), 2000);
      return () => clearTimeout(imageErrorTimeout);
    }
  }, [selectedImageError]);

  useEffect(() => {
    resetUploadedFile();
  }, [selectedImageError]);

  const handleSelectFile = (file: File | undefined) => {
    if (file) {
      imageObjectUrl = URL.createObjectURL(file);
      setSelectedImage(imageObjectUrl);
      setShowCropImageModal(true);
    }
  };

  const onCloseModal = (): void => {
    resetUploadedFile();
    setShowCropImageModal(false);
  };

  const resetUploadedFile = (): void => {
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }

    setCroppedImage(undefined);
  };

  const onSubmitModal = (): void => {
    if (cropper !== undefined) {
      setCroppedImage(getCropDataURL(cropper));
    }

    setShowCropImageModal(false);
  };

  const getCropDataURL = (cropper: Cropper): string => cropper.getCroppedCanvas().toDataURL();

  const handleSubmit = (evnt: React.FormEvent) => {
    evnt.preventDefault();

    const requiredUserData = {
      email: emailInput.value,
      password: passwordInput.value,
      fullName: usernameInput.value,
    };

    if (cropper !== undefined) {
      cropper.getCroppedCanvas().toBlob((blob): void => {
        dispatch(authActions.signup({ ...requiredUserData, avatar: blob || undefined }))
          .unwrap()
          .catch((e) => setSignupError(e.response.data.message));
      });

      return;
    }

    dispatch(authActions.signup(requiredUserData))
      .unwrap()
      .catch((e) => setSignupError(e.response.data.message));
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
        <h2 className="auth-form__title">Register</h2>
        {signupError && <div className="auth-form__submit-error">{signupError}</div>}
        <div className="auth-form__fieldset">
          {/* Entering username */}

          <label className="auth-form__label">
            Full name<span className="required">*</span>
          </label>
          <FormInput
            className={usernameInput.isDirty && !usernameInput.isValid ? 'error-input' : ''}
            name="username"
            type="text"
            value={usernameInput.value}
            icon={<UserIcon />}
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

          {/* Entering email */}

          <label className="auth-form__label">
            Email<span className="required">*</span>
          </label>
          <FormInput
            className={emailInput.isDirty && !emailInput.isValid ? 'error-input' : ''}
            name="email"
            type="email"
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

          {/* Entering password */}

          <label className="auth-form__label">
            Password<span className="required">*</span>
          </label>
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

          {/* Uploading user`s avatar */}

          <label className="auth-form__label">Photo</label>
          {croppedImage && (
            <div className="auth-form__avatar__image-wrapper">
              <img className="auth-form__avatar__image" src={croppedImage} alt="image" />
              <RemoveIcon className="auth-form__avatar__delete-icon" onClick={resetUploadedFile} />
            </div>
          )}
          <FileInput
            name="avatar"
            onSelect={handleSelectFile}
            accept="image/*"
            currentRef={fileInputRef}
            maxFileLength={1024 * 1024}
            onError={(error) => setSelectedImageError(error)}
          />
          {selectedImageError && <span className="auth-form__error">{selectedImageError}</span>}
        </div>

        {/* Submitting form */}

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

      {/* Crop image modal */}

      <Modal
        className="auth-form__modal"
        title="Crop avatar"
        show={showCropImageModal}
        footer={true}
        onClose={onCloseModal}
        onSubmit={onSubmitModal}
      >
        {selectedImage && (
          <ImageCropper image={selectedImage} onSave={(cropper) => setCropper(cropper)} />
        )}
      </Modal>
    </div>
  );
};

export default SignUp;
