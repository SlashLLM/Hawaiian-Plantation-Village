import React from 'react';

export default function AdminConfirmButton({
  children,
  confirmMessage = 'Are you sure?',
  onConfirm,
  className = 'btn-secondary',
  style,
  disabled,
  label,
}) {
  function handleClick() {
    if (window.confirm(confirmMessage)) onConfirm();
  }

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  );
}
