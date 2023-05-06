import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useInput from '../hooks/useInput';
import { formatDate } from '../utils/format-date';
import { MdOutlineModeEditOutline as EditIcon } from 'react-icons/md';
import Modal from './modal';
import { RiCloseFill as RemoveIcon } from 'react-icons/ri';
import ImageCropper from './image-cropper';
import Button from './button';
import FileInput from './file-input';
import FormInput from './form-input';
import { FaUser as UserIcon } from 'react-icons/fa';

interface IProps {
  fullName: string;
  avatar: string;
  joinedTime: Date;
  quizzesPassed: number;
  quizzesCreated: number;
}

let imageObjectUrl: string | null = null;

const ProfileHeader: React.FC<IProps> = (props) => {
  const { t } = useTranslation('', { keyPrefix: 'profileHeader' });

  const { fullName, avatar, joinedTime, quizzesPassed, quizzesCreated } = props;

  const usernameInput = useInput(fullName, { isEmpty: true, minLength: 2 });
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [cropper, setCropper] = useState<Cropper | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [selectedImageError, setSelectedImageError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleEditProfileModal = () => setShowEditProfileModal((state) => !state);

  const handleSelectFile = (file: File | undefined) => {
    if (file) {
      imageObjectUrl = URL.createObjectURL(file);
      setSelectedImage(imageObjectUrl);
    }
  };

  const resetUploadedFile = (): void => {
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }

    setCroppedImage(undefined);
    setSelectedImage(undefined);
  };

  const handleSaveCrop = () => {
    if (cropper !== undefined) {
      setCroppedImage(getCropDataURL(cropper));
    }
  };

  const handleCancelCrop = () => resetUploadedFile();

  const getCropDataURL = (cropper: Cropper): string => cropper.getCroppedCanvas().toDataURL();

  const handleSubmitEditProfile = () => {
    if (cropper !== undefined) {
      cropper.getCroppedCanvas().toBlob((blob): void => {
        console.log(blob, 'blob');
      });

      return;
    }
  };

  useEffect(() => {
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

  return (
    <Fragment>
      <div className="profile-info">
        <div className="profile-info__image-wrapper">
          <img src={avatar} alt="user-avatar" className="profile-info__image" />
        </div>
        <div className="profile-info__text">
          <p className="profile-info__text__username">{fullName}</p>
          <p className="profile-info__text__tests-passed">{`${t(
            'quizzesPassed',
          )}: ${quizzesPassed}`}</p>
          <p className="profile-info__text__tests-created">{`${t(
            'quizzesCreated',
          )}: ${quizzesCreated}`}</p>
          <p className="profile-info__text__join-time">{`${t('joinDate')} ${formatDate(
            new Date(joinedTime),
          )}`}</p>
          <div className="profile-info__edit-button" onClick={toggleEditProfileModal}>
            <EditIcon className="profile-info__edit-button__icon" />
          </div>
        </div>
      </div>
      <Modal
        className="profile-info__edit-modal"
        title="Edit profile"
        onClose={toggleEditProfileModal}
        show={showEditProfileModal}
        footer={true}
        onSubmit={handleSubmitEditProfile}
      >
        <form className="profile-info__edit-form">
          {/* Changing photo */}

          <div className="profile-info__edit-form__edit-avatar-wrapper">
            <label className="profile-info__edit-form__label">{t('photo')}</label>

            {/* If image is cropped, user can preview it */}

            {croppedImage && (
              <div className="profile-info__edit-form__avatar-image-wrapper">
                <img
                  className="profile-info__edit-form__avatar-image"
                  src={croppedImage}
                  alt="image"
                />
                <RemoveIcon
                  className="profile-info__edit-form__avatar-delete-icon"
                  onClick={resetUploadedFile}
                />
              </div>
            )}

            {/* If image is uploaded, image cropper appears */}

            {selectedImage && !croppedImage && (
              <>
                <ImageCropper image={selectedImage} onSave={(cropper) => setCropper(cropper)} />
                <div className="profile-info__edit-form__edit-avatar-actions">
                  <Button onClick={handleSaveCrop}>{t('cropPhoto')}</Button>
                  <Button onClick={handleCancelCrop}>{t('cancelCroppingPhoto')}</Button>
                </div>
              </>
            )}

            {/* If image is selected, file uploading input hides */}
            {selectedImage === undefined && (
              <FileInput
                name="avatar"
                onSelect={handleSelectFile}
                accept="image/*"
                currentRef={fileInputRef}
                maxFileLength={1024 * 1024}
                onError={(error) => setSelectedImageError(error)}
              />
            )}
            {selectedImageError && (
              <span className="profile-info__edit-form__error">{selectedImageError}</span>
            )}
          </div>

          {/* Entering new name */}

          <label className="profile-info__edit-form__label">{t('name')}</label>
          <FormInput
            className="profile-info__edit-form__input"
            name="username"
            type="text"
            value={usernameInput.value}
            icon={<UserIcon />}
            onChange={usernameInput.onChange}
            onBlur={usernameInput.onBlur}
          />
          {usernameInput.isDirty && usernameInput.isEmpty.value && (
            <span className="profile-info__edit-form__error">
              {usernameInput.isEmpty.errorMessage}
            </span>
          )}
          {usernameInput.isDirty &&
            !usernameInput.isEmpty.value &&
            usernameInput.minLengthError.value && (
              <span className="profile-info__edit-form__error">
                {usernameInput.minLengthError.errorMessage}
              </span>
            )}
        </form>
      </Modal>
    </Fragment>
  );
};

export default ProfileHeader;
