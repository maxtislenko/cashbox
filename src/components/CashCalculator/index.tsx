import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import './style.css';
import CashInput from './CashInput';

type FieldItem = {
  [propName:string]: number | string
}

const fieldList = ["1","2","5","10","20","50","100","200","500","1000"].reverse();
const fields:FieldItem = {
  income: ''
};
fieldList.forEach((fieldKey) => fields[fieldKey] = '');

const CashCalculator = () => {
  const formik = useFormik({
    initialValues: {...fields},
    onSubmit: values => console.log('submit',values),
  });

  const countSum = (values: FieldItem) => {
    let result: number = 0;

    for (let multiplier in values) {
      if(multiplier !== 'income') {
        const multiplierCount = values[multiplier];
        result += (parseFloat(multiplier) * Number(multiplierCount) )
      }
    }

    return result
  }

  const countDiff = (cashSum:number, income:number | string) => {
    if(!income) return '0'
    return cashSum - Number(income)
  }

  const cashSum = countSum(formik.values);
  const sumDiff = countDiff(cashSum, formik.values.income);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} style={{
        padding: '20px 15px 0',
        background: '#fff',
        boxShadow: '0 5px 30px #ddd'
      }}>
        <Grid item md={6} xs={12} className="sum-col">
          <TextField
            value={formik.values.income}
            onChange={formik.handleChange}
            label="Сумма-X"
            type="number"
            name="income"
            variant="outlined"
            fullWidth
          />
          <Box mt={2}>
            <TextField
              fullWidth
              label="Итог"
              value={cashSum}
              InputProps={{
                readOnly: true,
              }}/>
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <TextField
              fullWidth
              label="Разница"
              value={sumDiff}
              InputProps={{
                readOnly: true,
              }}/>
          </Box>
          <Box my={3} textAlign="right">
            <Button type="reset" variant="outlined" color="secondary" onClick={formik.handleReset}>
              Сброс
            </Button>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          {
            fieldList.map(fieldKey => (
              <CashInput key={fieldKey}
                         name={fieldKey}
                         currency="грн."
                         value={formik.values[fieldKey]}
                         onChange={formik.handleChange}
                         disabled={!formik.values.income} />
            ))
          }
        </Grid>
      </Grid>
    </form>
  );
};


export default CashCalculator;
