import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';

interface IProps {
  className?: string;
  name: string;
  accept: string;
  maxFileLength?: number; // bytes
  currentRef?: React.LegacyRef<HTMLInputElement>;
  onError: (error: string) => void;
  onSelect: (file: File | undefined) => void;
}

const FileInput: React.FC<IProps> = ({
  currentRef,
  className = '',
  name,
  maxFileLength,
  onError,
  onSelect,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    if (!e.target.files || e.target.files.length === 0) {
      onError('File not found');
      return;
    }

    if (maxFileLength && e.target.files[0].size > maxFileLength) {
      onError(`File is too big. Max size - ${(maxFileLength / 1024).toFixed(1)} MB`);
      return;
    }

    const file = e.target.files[0];
    onSelect(file);
  };

  return (
    <input
      ref={currentRef}
      className={className}
      name={name}
      type="file"
      onChange={handleInputChange}
    />
  );
};

export default FileInput;
