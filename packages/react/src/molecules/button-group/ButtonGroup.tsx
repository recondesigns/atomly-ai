// import React from 'react';
// import { Button } from '../../atoms';
// import { ButtonGroupProps } from '@molecule-ui/types';

type Action = {
  label: string;
  action: () => void;
};

export type ButtonGroupProps = {
  actions: Action[];
};

const ButtonGroup = ({ actions }: ButtonGroupProps) => {
  return (
    <div>
      {actions &&
        actions.map((action, idx) => (
          <button key={idx} onClick={action.action}>
            {action.label}
          </button>
        ))}
      {/* {actions && actions.map((action) => <Button label={action.label} onClick={action.action} />)} */}
    </div>
  );
};

export default ButtonGroup;
