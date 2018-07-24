import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MyAppBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" className={classes.root}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <span class={classes.flex} />
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };
}

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => state;

export default withStyles(styles)(connect(mapStateToProps)(MyAppBar));