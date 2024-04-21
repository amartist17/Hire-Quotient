import React from 'react';
import HoldingsTable from './components/HoldingsTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});
function App() {
  return (
    <div>
      <HoldingsTable />
      <footer style={{ textAlign: 'center', marginTop: '1rem' }}>Submitted by <a href="https://amartist.tech/">Amardeep Singh</a></footer>
    </div>
  );
}

export default App;