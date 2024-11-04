import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme, size, color }) => ({
  margin: theme.spacing(1),
  '&.MuiButton-sizeLarge': {
    fontSize: '1.2rem',
  },
  ...(color === 'gradient' && {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: theme.palette.common.white,
    '&:hover': {
      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
    },
  }),
}));

const ActionButton = ({
  onClick,
  label,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  className,
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      color={color !== 'gradient' ? color : 'primary'}
      size={size}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
          {loadingText}
        </>
      ) : (
        label
      )}
    </StyledButton>
  );
};

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success', 'gradient']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  className: PropTypes.string,
};

export default ActionButton;
