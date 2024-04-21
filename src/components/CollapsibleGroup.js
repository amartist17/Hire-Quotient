import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow, IconButton, Collapse, Box } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

const NestedTableHead = () => (
  <TableRow>
    <TableCell>Name of Holding</TableCell>
    <TableCell>Ticker</TableCell>
    <TableCell>Average Price</TableCell>
    <TableCell>Market Price</TableCell>
    <TableCell>Latest Change %</TableCell>
    <TableCell>Market Value in Base CCY</TableCell>
  </TableRow>
);

const CollapsibleGroup = ({ assetClass, assets }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell style={{ fontWeight: 'bold' }} colSpan={5}>
          {assetClass} ({assets.length})
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="holdings">
                <NestedTableHead />
                <TableBody>
                  {assets.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell>{row.ticker || 'N/A'}</TableCell>
                      <TableCell>{row.avg_price ? `$${row.avg_price.toFixed(2)}` : 'N/A'}</TableCell>
                      <TableCell>{row.market_price ? `$${row.market_price.toFixed(2)}` : 'N/A'}</TableCell>
                      <TableCell>{typeof row.latest_chg_pct === 'number' ? `${row.latest_chg_pct.toFixed(2)}%` : 'N/A'}</TableCell>
                      <TableCell>{row.market_value_ccy ? `$${row.market_value_ccy.toFixed(2)}` : 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleGroup;
