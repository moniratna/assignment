import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core"

// import { experimentalStyled as styled } from '@material-ui/core/styles';


export default function Cardcomponent({data, region}) {
  return <>
  <Typography style={{fontSize:'24px', justifyContent:'center',display:'flex'}}>{region}</Typography>
  {data && data.length > 0 ? data.map(i=><Card sx={{ minWidth: 275 }} style={{width:'300px', marginTop:'50px', marginLeft:'80px'}}>
      
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {i.title}
        </Typography>
        <Typography variant="h5" component="div">
         {i.date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {i.notes}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      
    </Card>) : <Typography>No Data Available</Typography>}
  </>
}
