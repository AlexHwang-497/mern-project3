import React, {useState,useEffect,Fragment} from "react";
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
const ApexTreeMap = ({treeMapData,dateIndex,format,percentile}) => {

  console.log('[holdings.apexTreeMax.treeMapData',treeMapData[dateIndex].map((el)=>el.y))
  const arr=  treeMapData[dateIndex].map((el)=>el.y)
  let min =  Math.min(...arr)
  let max =  Math.max(...arr)
  console.log('[holdings.apexTreeMax.max',max)
  console.log('[holdings.apexTreeMax.min',min)
  console.log('[holdings.apexTreeMax.max-min*.5',((max-min)*.5)+min)
  console.log('[holdings.apexTreeMax.max-min*.5.01',((max-min)*.5)+min+.01)
  console.log('[holdings.apexTreeMax.format',format)
    
    const series = [
      // {
      //   data:monthlyDataData[0].slice(1)
      // },
      {
        data:treeMapData[dateIndex]
      }
      
        
    ]
    
    const options = {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        // text: 'Current Portfolio'
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
        },
        formatter: function(text, op) {
          console.log('[ApexTreeMap.op',op)
          if (format==='$'){
            return [text, '$'+op.value.toLocaleString(undefined, {minimumFractionDigits: 0,maximumFractionDigits: 0})]

          } else if(format==='annual') {
            return [text,(op.value).toFixed(1)+'%']
          }else {
            return [text, Number(op.value*100).toFixed(2)+'%']
          }
        },
        offsetY: -4
      },
      plotOptions: {
        treemap: {
          enableShades: true,
          shadeIntensity: 0.5,
          reverseNegativeShade: true,
          distributed: true,
          colorScale: {
            ranges: [
              {
                from: -Math.abs(min),
                to: ((max-min)*percentile)+min,
                color: '#CD363A'
                // color: '#1B8270'
              },
              {
                from: ((max-min)*percentile)+min+.000001,
                to:max,
                // color: '#CD363A'
                color: '#1B8270'
                // color: '#CD363A'
              }
            ]
          }
        }
      }
    }
    
    
    
    return(
      <Fragment>
        <Chart options={options} series={series} type="treemap" height={400} />
      </Fragment>
      
    )
}

export default ApexTreeMap

