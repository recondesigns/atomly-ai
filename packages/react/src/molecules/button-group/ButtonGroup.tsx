import React from 'react';
import { Button } from '../../atoms';
import { ButtonGroupProps } from '@molecule-ui/types';

const ButtonGroup = ({ actions }: ButtonGroupProps) => {
  return (
    <div>
      {actions && actions.map((action) => <Button label={action.label} onClick={action.action} />)}
    </div>
  );
};

export default ButtonGroup;
