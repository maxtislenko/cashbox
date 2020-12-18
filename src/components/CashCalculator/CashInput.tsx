import React, {ChangeEvent} from 'react';
import {Box, TextField} from '@material-ui/core';

type Props = {
  name: string,
  value: number | string,
  onChange:(e:ChangeEvent)=> void,
  disabled: boolean,
  currency: string
}

const CashInput = ({ name, value, onChange, disabled, currency } : Props) => {
  return (
    <Box display="flex" mb={2} justifyContent="space-between" alignItems="center">
      <TextField
        value={value}
        onChange={onChange}
        label={`${name} ${currency}`}
        type="number"
        name={name}
        variant="outlined"
        disabled={disabled}
        fullWidth
      />
    </Box>
  );
};

export default CashInput;
