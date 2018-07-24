import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import DragDropArea from './DragDropArea';
import MyAppBar from './MyAppBar';

const theme = createMuiTheme({
    palette: {
        primary: grey,
    }
});

export default (props) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <MyAppBar />
            <DragDropArea />
        </MuiThemeProvider>
    );
}