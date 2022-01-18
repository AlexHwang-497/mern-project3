import React, {Fragment, useState,useEffect} from 'react'
import {Grid, Paper,Card, Icon, Fab, Select, MenuItem, FormControl, InputLabel, Box, Divider,TextField} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import CollapsibleTable from '../CollapsableTable'
import VerticalBar from '../Charts/BarChart'
import BarGraph from '../Charts/BarGraph'
import LineGraph from '../Charts/LineGraph'
import { Line } from 'react-chartjs-2'
import DoughnutChart from '../Charts/DoughnutChart'
import SectorTable from './SectorTable'
import {useDispatch, useSelector} from 'react-redux'
import ApexTreeChart from '../PortfolioOverview/ApexTreeMap'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'


function Holdings({sector,assets,ownership, portfolioName,image, stockData,priceData ,yearArr}) {
    const [selectedLineChartData,setSelectedLineChartData] = useState('ytd')
    const [selectedPortfolioOverviewtData,setSelectedPortfolioOverviewtData] = useState('ytd')
    const [holdingsType,setHoldingsType] = useState('sector')
    const [dateType,setDateType] = useState('ytd')
    const [percentile,setPercentile] = useState(.50)
    // const [dateIndex,setDateIndex] = useState(0)
    if(yearArr.length===0 || !yearArr) return []

    // const dateLabels = ['1yr', '3yr', '5yr','6yr'];
    const dateLabels = yearArr.slice(1);
        const dates = dateLabels.map(label => {
            const yearNumber = parseInt(label.split('yr')[0]);
            return generateHistoricalDate(yearNumber);
        });
    
    
      
        const spxValue = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
            // console.log('[Holdings.spxValue.monReturn',data)
            // console.log('[Holdings.spxValue.monReturn',data)
            return data
        })
        const securityData = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const data = monthlyReturn(range).map((entry)=>entry)
            // console.log('[TotalReturn.pracsValue.monReturn',data)
            // console.log('[Holdings.pracsValue.monReturn',data)
            return data
        })
        
        const totalPortoflioValue = dates.map((date, index) => {
            // console.log('[Holdings.calculations.date',date)
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))
        // console.log('[Holdings.totalPortoflioValue.aggPortfolioValue',aggPortfolioValue)
        return aggPortfolioValue
        
      })
        const dateArr = dates.map((date, index) => {
            // console.log('[TotalReturn.calculations.date',date)
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
        // console.log('[Holdings.dateArr.data',data)
        return data
        
      })
    // console.log('[Holdings.securityData',securityData)

    let dateIndex=0
    switch(dateType){
        case 'ytd':
            dateIndex=0
            break;
        case '3yr':
            dateIndex=2
            break;
        case '5yr':
            dateIndex=4
            break;

        default:
            dateIndex=dateLabels.length-1
    }

    const dateTypeHandler = (e) => {
        
        setDateType(e.target.value)
    }
    
    
    
    
    let treeMapData=[]
    // let dateIndex = 0
    
    
    const holdingsDataHandler = (e) => {
        setHoldingsType(e.target.value)
    
      }
    //   console.log('[Holdings.holdingsData',securityData)
    
    let format
    let text =''
    let op = 0
    let result=[]
    switch(holdingsType){
        case 'currentPortfolioValue':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.finalPortfolioValue}}).slice(1))
            format ='$'
            break;
        case 'initialPortfolioValue':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.initialPortfolioValue}}).slice(1))
            format ='$'
            break;
        case 'cumulativeReturn':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.finalCumulativeReturn}}).slice(1))
            format ='%'
            break;
        case 'annualizedReturn':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.annualizedReturn}}).slice(1))
            format ='annual'
            break;
        case 'priceStandardDeviation':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.priceStDev}}).slice(1))
            format ='$'
            break;
        case 'returnStandardDeviation':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.returnStDev}}).slice(1))
            format ='%'
            break;
            
        default:

              treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.sector,'y':el.finalPortfolioValue}}).slice(1).reduce((acc,curr)=>{
                    if (!acc[curr.x]) {
                        acc[curr.x] = { x: curr.x, y: 0 };
                        result.push(acc[curr.x])
                      }
                      acc[curr.x].y += curr.y;
                      return acc;
            
                },{}))
                treeMapData=treeMapData.map((obj)=>Object.keys(obj).map((key)=>({x:key,y:obj[key].y})))
              format ='$'

              break;
            }
            
             console.log('[Holdings.treeMapData',treeMapData)

    const percentileHandler = (e) => {
        setPercentile((e.target.value)/100)

    }
    console.log('[Holdings.percentileHandler',percentile)
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <h1>Portfolio Sector Bifurcation</h1>
                    <SectorTable ownership={ownership} data={securityData} assets={assets} dateIndex={dateIndex} sector={sector} image={image}/>
                </Paper>

            </Grid>

            <Grid item sm={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
                            <Select
                                value={dateType}
                                onChange={dateTypeHandler}
                                label="Date"
                                >
                                <MenuItem value={'ytd'}>YTD</MenuItem>
                                <MenuItem value={'3yr'}>3-Yr</MenuItem>
                                <MenuItem value={'5yr'}>5-Yr</MenuItem>
                                <MenuItem value={'6yr'}>{dateLabels.length}-Yr</MenuItem>
                            </Select>
                            <TextField  
                                color='string' 
                                label="Percentile" 
                                variant="filled"
                                onChange={percentileHandler}
                            />
                                <InputLabel id="demo-simple-select-standard-label">DataType</InputLabel>
                                <Select
                                    value={holdingsType}
                                    onChange={holdingsDataHandler}
                                    label="Date"
                                    >
                                    <MenuItem value={'sector'}>Sector</MenuItem>
                                    <Divider style={{ margin: '20px 0' }} />
                                    <MenuItem value={'currentPortfolioValue'}>Current Portfolio Value($)</MenuItem>
                                    <MenuItem value={'initialPortfolioValue'}>Initial Portfolio Value($)</MenuItem>
                                    <Divider style={{ margin: '20px 0' }} />
                                    <MenuItem value={'cumulativeReturn'}>Cumulative Return(%)</MenuItem>
                                    <MenuItem value={'annualizedReturn'}>Annualized Return(%)</MenuItem>
                                    <Divider style={{ margin: '20px 0' }} />
                                    <MenuItem value={'priceStandardDeviation'}>Price Standard Deviation($)</MenuItem>
                                    <MenuItem value={'returnStandardDeviation'}>Return Standard Deviation(%)</MenuItem>
                                    <Divider style={{ margin: '20px 0' }} />
                                    {/* <MenuItem value={''}>Beta</MenuItem>
                                    <MenuItem value={''}>Alpha</MenuItem> */}
                                
                                </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            </FormControl>
                    <h1>Portfolio Tree Map</h1>
                    <ApexTreeChart format={format} treeMapData={treeMapData} dateIndex={dateIndex} percentile={percentile}/>
                </Paper>
            
            </Grid>

            
            
        </Grid>
        
    )
}

export default Holdings


