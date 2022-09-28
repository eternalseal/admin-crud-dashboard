import classNames from 'classnames';
import React from 'react';

import ErrorText from '../ErrorText';

type Props = {
  label: string;
  children: React.ReactNode;
  optional?: boolean;
  message?: string;
  formErrorClass?: string;
  formWrapperClass?: string;
  labelClass?: string;
  textWrapperClass?: string;
};

const FormInput = ({
  label,
  children,
  optional = false,
  message,
  formErrorClass,
  formWrapperClass,
  labelClass,
  textWrapperClass,
}: Props) => {
  return (
    <div
      className={classNames(
        'relative',
        formWrapperClass != null ? formWrapperClass : null,
      )}
    >
      <label
        className={classNames(
          'flex flex-col gap-1',
          labelClass != null ? labelClass : null,
        )}
      >
        <span
          className={classNames(
            textWrapperClass != null ? textWrapperClass : null,
            'text-sm font-medium text-slate-700 inline-flex gap-1',
          )}
        >
          {label}
          {optional ? <p className="text-slate-400">(Optional)</p> : null}
        </span>
        {children}
      </label>
      {message != null ? (
        <ErrorText text={message} className={formErrorClass} />
      ) : null}
    </div>
  );
};

export default FormInput;
