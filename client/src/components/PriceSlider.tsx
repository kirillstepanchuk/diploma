import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// @ts-ignore
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

interface PriceSliderProps {
  currMin: string | null,
  setCurrMin: React.Dispatch<React.SetStateAction<string | null>>,
  currMax: string | null,
  setCurrMax: React.Dispatch<React.SetStateAction<string | null>>,
}


const PriceSlider: React.FC<PriceSliderProps> = ({ currMin, setCurrMin, currMax, setCurrMax }) => {


  // const [currMin, setCurrMin] = React.useState<string | null>(null);
  // const [currMax, setCurrMax] = React.useState<string | null>(null);

  // const handleChange = (
  //   event: Event,
  //   newValue: number | number[],
  //   activeThumb: number,
  // ) => {
  //   if (!Array.isArray(newValue)) {
  //     return;
  //   }

  //   if (activeThumb === 0) {
  //     // setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
  //     setCurrMin(Math.min(newValue[0], currMax - minDistance));
  //   } else {
  //     // setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
  //     setCurrMax(Math.max(newValue[1], currMin + minDistance));
  //   }
  // };

  const onChangeMinPrice = (evt: any, value: string) => {
    setCurrMin(value);
  }
  const onChangeMaxPrice = (evt: any, value: string) => {
    setCurrMax(value);
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      {/* <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={[currMin, currMax]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      /> */}
      <CurrencyTextField
        // margin="dense"
        // label="Цена"
        emptyInputBehavior={'null'}

        variant="outlined"
        value={currMin}
        // fullWidth
        currencySymbol="от"
        outputFormat="string"
        onChange={onChangeMinPrice}
      />
      <Box sx={{ml: 1, mb:1}}></Box>
      <CurrencyTextField
        // margin="dense"
        emptyInputBehavior={'null'}
        // label="Цена"
        variant="outlined"
        value={currMax}
        // fullWidth
        currencySymbol="до"
        outputFormat="string"
        onChange={onChangeMaxPrice}
      />
    </Box>
  );
}

export default PriceSlider;
