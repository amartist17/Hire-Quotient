import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer,IconButton, Collapse, TableHead, TableRow, Paper, Box } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import CollapsibleGroup from './CollapsibleGroup';


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
          
          <TableBody>
          {Object.entries(holdings).map(([assetClass, assets]) => (
            <CollapsibleGroup key={assetClass} assetClass={assetClass} assets={assets} />
          ))}
    </TableBody>
        </Table>
      </TableContainer>
    </Box>
    );
}

function groupByAssetClass(data) {
    return data.reduce((accumulator, item) => {
      const key = item.asset_class;
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
        accumulator[key].push(item);
      return accumulator;
    }, {}); 
  }

export default HoldingsTable;
