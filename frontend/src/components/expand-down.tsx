import React, { useState } from 'react';
import { BsChevronDown as ExpandIcon } from 'react-icons/bs';

interface IProps {
  topic: string;
  extraInfo?: string;
  topicLink?: string;
  className?: string;
}

const ExpandDown: React.FC<IProps> = ({ topic, topicLink, extraInfo, className, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((state) => !state);

  return (
    <div className={`expand-down ${className || ''}`}>
      <div className="expand-down__top" onClick={toggleExpand}>
        {topicLink ? (
          <a className="expand-down__top__topic" href={topicLink} target="_blank">
            {topic}
          </a>
        ) : (
          <p className="expand-down__top__topic">{topic}</p>
        )}
        <div className="expand-down__top__right-group">
          {extraInfo ? (
            <p className="expand-down__top__right-group__extra-info">{extraInfo}</p>
          ) : null}
          <ExpandIcon
            className={`expand-down__top__right-group__icon ${isExpanded ? 'expanded' : ''}`}
          />
        </div>
      </div>
      {isExpanded && <div className="expand-down__body">{children}</div>}
    </div>
  );
};

export default ExpandDown;
