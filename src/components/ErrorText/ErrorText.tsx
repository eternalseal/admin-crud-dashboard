import classNames from 'classnames';
import React from 'react';

const ErrorText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <p className={classNames('text-red-600 text-sm', className)}>{text}</p>
  );
};

export default ErrorText;
