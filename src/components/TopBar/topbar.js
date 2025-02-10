import './topbar.css';
import { SubmitButton } from '../Submit/submit';
import { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';

export const TopBar = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState('untitled file');

  const handleFileNameClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFileName(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <header className="header">
      <h5 className="header-title">Pipeline</h5>
      <div className="header-center">
        <FaFileAlt className="icon" />
        {isEditing ? (
          <input
            type="text"
            value={fileName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="file-name-input"
            autoFocus
          />
        ) : (
          <span className="file-name" onClick={handleFileNameClick}>
            {fileName}
          </span>
        )}
      </div>
      <SubmitButton />
    </header>
  );
};
