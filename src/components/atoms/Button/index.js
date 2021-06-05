import React from 'react';

import BootstrapButton from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Button = ({
  variant,
  type,
  size,
  isLoading,
  onClick,
  className,
  children,
}) => (
  <BootstrapButton
    variant={variant}
    type={type}
    size={size}
    disabled={isLoading}
    onClick={onClick}
    className={className}
  >
    {isLoading && <Spinner animation="border" variant="light" />} 
    {children}
  </BootstrapButton>
);

export default Button;
