import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
function groupByAssetClass(data) {
    return data.reduce((accumulator, item) => {
      // Get the value of asset_class from the current item
      const key = item.asset_class;
  
      // If the key doesn't exist yet in the accumulator, create a new array
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
  
      // Add the current item to the array for this key
      accumulator[key].push(item);
  
      return accumulator;
    }, {}); // Initialize the accumulator as an empty object
  }
const HoldingsTable = () => {
    const [holdings, setHoldings] = useState([]);
    useEffect(() => {
        axios.get('https://canopy-frontend-task.now.sh/api/holdings')
            .then(response => {
                let { payload } = response.data;
                payload= groupByAssetClass(payload);
                setHoldings(payload);
                console.log('Data fetched: ', payload);

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
        },[])
  

    return (
        <Box sx={{ margin: 3 }}> {/* Add margin around the TableContainer */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name of Holding</TableCell>
              <TableCell >Ticker</TableCell>
              <TableCell >Asset Class</TableCell>
              <TableCell >Average Price</TableCell>
              <TableCell >Market Price</TableCell>
              <TableCell >Latest Change %</TableCell>
              <TableCell >Market Value in Base CCY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
      {Object.entries(holdings).map(([assetClass, assets]) => (
        <React.Fragment key={assetClass}>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }} colSpan={7}>
              {assetClass} ({assets.length})
            </TableCell>
          </TableRow>
          {assets.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell>{row.ticker || "N/A"}</TableCell>
              <TableCell>{row.asset_class || "N/A"}</TableCell>
              <TableCell>{row.avg_price ? row.avg_price.toFixed(2) : "N/A"}</TableCell>
              <TableCell>{row.market_price ? row.market_price.toFixed(2) : "N/A"}</TableCell>
              <TableCell>{row.latest_chg_pct ? `${row.latest_chg_pct.toFixed(2)}%` : "N/A"}</TableCell>
              <TableCell>{row.market_value_ccy ? row.market_value_ccy.toFixed(2) : "N/A"}</TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      ))}
    </TableBody>
        </Table>
      </TableContainer>
    </Box>
    );
}

export default HoldingsTable;
