import React from 'react';
import { Button } from '../../atoms';

type Props = {};

const ButtonGroup = (props: Props) => {
  return (
    <div>
      <Button label="One" />
      <Button label="Two" />
    </div>
  );
};

export default ButtonGroup;
