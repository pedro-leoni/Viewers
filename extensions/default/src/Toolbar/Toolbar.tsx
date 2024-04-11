import React from 'react';
import { Tooltip } from '@ohif/ui';
import classnames from 'classnames';
import { useToolbar } from '@ohif/core';

export function Toolbar({ servicesManager }) {
  const { toolbarButtons, onInteraction } = useToolbar({
    servicesManager,
  });

  if (!toolbarButtons.length) {
    return null;
  }
  return (
    <>
      {toolbarButtons.map(toolDef => {
        if (!toolDef) {
          return null;
        }

        const { id, Component, componentProps } = toolDef;
        const { disabled } = componentProps;

        const tool = (
          <Component
            key={id}
            id={id}
            onInteraction={onInteraction}
            servicesManager={servicesManager}
            className="h-full"
            {...componentProps}
          />
        );

        return disabled ? (
          <Tooltip
            key={id}
            position="bottom"
            content={componentProps.label}
            secondaryContent={'Not available on the current viewport'}
          >
            <div className="text-basic-white min-h-full">{tool}</div>
          </Tooltip>
        ) : (
          <div
            key={id}
            className="text-basic-white min-h-full"
          >
            {tool}
          </div>
        );
      })}
    </>
  );
}
