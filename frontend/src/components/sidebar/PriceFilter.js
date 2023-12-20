import * as React from 'react';
import { updateMaxPrice } from '../../Redux/Reducers/houseSlice';
import {useDispatch} from 'react-redux';
import { fetchHouses } from '../../Redux/Reducers/houseSlice';



export default function PriceFilter() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(10000000);


  const handleSliderChange = (e) => {
    setValue(Number(e.target.value));
    dispatch(updateMaxPrice(e.target.value));
    dispatch(fetchHouses())
  };


  return (
      <div>
        <p>${value}</p>
        <div>
        <input type="range" min = {0} max ={1000000} value = {value}
        onChange={handleSliderChange}/>
      </div>
      </div>
  );
}
