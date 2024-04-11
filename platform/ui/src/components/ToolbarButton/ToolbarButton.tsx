import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconButton from '../IconButton';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

const ToolbarButton = ({
  id,
  icon,
  label,
  commands,
  onInteraction,
  dropdownContent,
  //
  className,
  disabled,
  size,
  toolTipClassName,
  disableToolTip = false,
  ...rest
  //
}) => {
  const shouldShowDropdown = !!dropdownContent;
  const iconEl = icon ? <Icon name={icon} /> : <div>{label || 'Missing icon and label'}</div>;

  const sizeToUse = size ?? 'toolbar';

  const setItem = () => {
    return label === ("Capture" || "Formato") ? localStorage.setItem('name', "") : localStorage.setItem('name', label)
  }

  return (
    <div key={id}>
      <Tooltip
        isSticky={shouldShowDropdown}
        content={shouldShowDropdown ? dropdownContent : label}
        secondaryContent={disabled ? 'Not available on the current viewport' : null}
        tight={shouldShowDropdown}
        isDisabled={disableToolTip}
      >
        <IconButton
          size={sizeToUse}
          onClick={() => {
            setItem()
            onInteraction({
              itemId: id,
              commands,
            });
          }}
          name={label}
          key={id}
          id={id}
          {...rest}
        >
          {iconEl}
        </IconButton>
      </Tooltip>
    </div>
  );
};

ToolbarButton.defaultProps = {
  dropdownContent: null,
};

ToolbarButton.propTypes = {
  /* Influences background/hover styling */
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  commands: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  onInteraction: PropTypes.func,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** Tooltip content can be replaced for a customized content by passing a node to this value. */
  dropdownContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  size: PropTypes.string,
  toolTipClassName: PropTypes.string,
  disableToolTip: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ToolbarButton;
