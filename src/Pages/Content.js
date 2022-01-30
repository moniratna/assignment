import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import {Card, CardContent, Typography} from "@material-ui/core"
import { UIStore } from '../UIstore';
// import { experimentalStyled as styled } from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import {Paper} from '@material-ui/core';
import {Grid} from '@material-ui/core';

import { styled } from '@material-ui/core/styles';
import Cardcomponent from '../components/Cardcomponent';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Content(props) {
    console.log(props.value)
    const [obj, setObj] = useState({})
    const [value, onChange] = useState(new Date());
    // const [eng, setEng] = useState([])
    const eng =  UIStore.useState(s => s.england);
    const northernIre = UIStore.useState(s=>s.northernIreland);
    const scotland = UIStore.useState(s=>s.scotland);

    // console.log('ui store data', dd)

    console.log(value);
    // useEffect(()=>{
    // (async function(){
    //   const data = await axios.get('https://www.gov.uk/bank-holidays.json')
    //   setObj(data.data)
    // }())
    // },[])
    // console.log(obj)
    // (async function(){
    //     const data = await axios.get('https://www.gov.uk/bank-holidays.json')
    //     setObj(data.data)
    //   }())
   
    // const d = getd();
    // console.log(d)
   useEffect(()=>{
     async function fetchapi() {
       const res = await axios.get("https://www.gov.uk/bank-holidays.json")
       setObj(res.data);
     }
     fetchapi()
   },[])
  console.log(obj)
  // if(obj){
  //     var sd = "2017-01-02"
  //     var ed = "2022-01-31"
  //     var result = obj["england-and-wales"].events.filter(d => {var time = d.date;
  //                                return (sd < time && time < ed);
  //                               });
  //     console.log(result)
  // }
  
    function getLastWeek() {
      var today = new Date();
      var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      return lastWeek;
    }
    
    var lastWeek = getLastWeek();
    var lastWeekMonth = lastWeek.getMonth() + 1;
    var lastWeekDay = lastWeek.getDate();
    var lastWeekYear = lastWeek.getFullYear();
    
    var lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
    var lastWeekDisplayPadded = ("00" + lastWeekMonth.toString()).slice(-2) + "/" + ("00" + lastWeekDay.toString()).slice(-2) + "/" + ("0000" + lastWeekYear.toString()).slice(-4);
    
    console.log(lastWeekDisplay);
    console.log(lastWeekDisplayPadded);
    console.log(moment().subtract(1, 'month').startOf('month').format('YYYY/MM/DD'));
  console.log(moment().subtract(1, 'month').endOf('month').format('YYYY/MM/DD'));
  console.log(moment().subtract(1, 'days').format('YYYY/MM/DD'))
    // const objectFilter = (objt, predicate) => 
    //   Object.keys(objt)
    //         .filter( key => predicate(objt[key]) )
    //         .reduce( (res, key) => (res[key] = objt[key], res), {} );
  
    // // var filtered = objectFilter(obj["england-and-wales"].events, date => date === "2017-01-02"); 
    // // console.log(filtered);
    // const ss = obj["england-and-wales"].events.filter(i => i.date === "2017-01-02" )
    // console.log('f', ss)
    
  // console.log(result);
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Cardcomponent data={eng} region={"England and Walse"} />
        </Grid>
        <Grid item xs={4}>
        <Cardcomponent data={northernIre} region={"Northern Ireland"} />
        </Grid>
        <Grid item xs={4}>
        <Cardcomponent data={scotland} region={"Scotland"} />
        </Grid>
      </Grid>
    </Box>
    </>
    
  );
}
