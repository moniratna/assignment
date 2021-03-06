import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import DatePicker from 'react-date-picker';
import moment from 'moment';
import {Card, CardContent, Typography, Button, TextField, Box} from "@material-ui/core"
import Content from './Content';
import { useNavigate } from 'react-router';
import { UIStore } from '../UIstore';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { Calendar } from "react-modern-calendar-datepicker";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  heading: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  btn:{
    display:'flex',
    justifyContent:'center',
  },
  daterange:{
    display:'flex',
    justifyContent:'center',
    marginTop:'20px',
  }

})

export default function Home() {
  const classes = useStyles();
    // const [value, onChange] = useState(new Date());
    const navigate = useNavigate()
    // const [value, setValue] = React.useState([null, null]);
    const [obj, setObj] = useState({})
    const [stDate, setStdate] = useState('')
    const [edDate, setEddate] = useState('')
    const [selectedDayRange, setSelectedDayRange] = useState({
      from: null,
      to: null
    });
    const [value, onChange] = useState([new Date(), new Date()]);
    console.log(value)
    // console.log(moment(selectedDayRange.from).format('YYYY-MM-DD'))
    useEffect(()=>{
        async function fetchapi() {
          const res = await axios.get("https://www.gov.uk/bank-holidays.json")
          setObj(res.data);
        }
        fetchapi()
      },[])
const handleYesterday = () =>{
    console.log(obj)
    const d = (moment().subtract(1, 'days').format('YYYY-MM-DD'))
    var sd = d
    var ed = d
    var result = obj["england-and-wales"].events.filter(d => d.date === d);
    var result2 = obj["northern-ireland"].events.filter(d => d.date === d);
      var result3 = obj["scotland"].events.filter(d => d.date === d);
      UIStore.update(s => {
        s.england = result;
        s.northernIreland = result2;
        s.scotland = result3;
      })
      navigate('/content')
    console.log(result)
}
const handleLastWeek =()=>{
    const sdate = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
  const edate = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');

    var sd = "2021-12-01"
    var ed = "2021-12-31"
    var result = obj["england-and-wales"].events.filter(d => {var time = d.date;
                                 return (sdate < time && time < edate);
                                });
    var result2 = obj["northern-ireland"].events.filter(d => {var time = d.date;
      return (sdate < time && time < edate);
      });
      var result3 = obj["scotland"].events.filter(d => {var time = d.date;
          return (sdate < time && time < edate);
          });
      console.log(result)
      UIStore.update(s => {
        s.england = result;
        s.northernIreland = result2;
        s.scotland = result3;
      })
      navigate('/content')
}
const handleLastMonth = () =>{
    const sdate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
    const edate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
  
      var sd = "2021-12-01"
      var ed = "2021-12-31"
      var result = obj["england-and-wales"].events.filter(d => {var time = d.date;
                                   return (sdate < time && time < edate);
                                  });
    var result2 = obj["northern-ireland"].events.filter(d => {var time = d.date;
    return (sdate < time && time < edate);
    });
    var result3 = obj["scotland"].events.filter(d => {var time = d.date;
        return (sdate < time && time < edate);
       });
        console.log(result)
        console.log(result2)
        console.log(result3)
        UIStore.update(s => {
            s.england = result;
            s.northernIreland = result2;
            s.scotland = result3;
          })
        navigate('/content')
}
const handleSelect=()=>{
  // console.log(); // native Date object
  // console.log(selectedDayRange.from, selectedDayRange.to)
  const start = moment(value[0]).format('YYYY-MM-DD')
  const end = moment(value[1]).format('YYYY-MM-DD')
  

  // const start = moment(selectedDayRange.from).subtract(1,'month').format('YYYY-MM-DD')
  // const end = moment(selectedDayRange.to).format('YYYY-MM-DD')
  // console.log("start",start);
  // const sdate = moment(selectedDayRange.from).format('YYYY-MM-DD')
  // const edate = moment(selectedDayRange.to).format('YYYY-MM-DD')
  // console.log(sdate)

  var result = obj["england-and-wales"].events.filter(d => {var time = d.date;
    return (start < time && time < end);
   });
   var result2 = obj["northern-ireland"].events.filter(d => {var time = d.date;
    return (start < time && time < end);
    });
    var result3 = obj["scotland"].events.filter(d => {var time = d.date;
        return (start < time && time < end);
       });
   console.log(result);
// var result2 = obj["northern-ireland"].events.filter(d => {var time = d.date;
// return (sdate < time && time < edate);
// });
// var result3 = obj["scotland"].events.filter(d => {var time = d.date;
// return (sdate < time && time < edate);
// });

UIStore.update(s => {
  s.england = result;
  s.northernIreland = result2;
  s.scotland = result3;
})
console.log(result);
navigate('/content')
}

  return (
    <>
    <div>
      <Typography variant="h4" gutterBottom className={classes.heading}>
        Search for Bank Holidays
      </Typography>
    </div>
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4} className={classes.btn}>
        <Button size="large" variant='contained' onClick={handleYesterday} color='primary'>Yesterday</Button>
        </Grid>
        <Grid item xs={4} className={classes.btn}>
        <Button size="large" variant='contained'onClick={handleLastWeek} color='primary' >Last week</Button>
        </Grid>
        <Grid item xs={4} className={classes.btn}>
        <Button size="large" variant='contained'onClick={handleLastMonth} color='primary'>Last Month</Button>
        </Grid>
      </Grid>
    </Box>
    </div>
    <div className={classes.daterange}>
    <Typography style={{marginRight:'20px'}}>Select Date Range</Typography>
    <DateRangePicker onChange={onChange} value={value} />
    <Button onClick={handleSelect} variant='contained' color='primary'>Submit</Button>
  </div>
    </>
    
  )
}
