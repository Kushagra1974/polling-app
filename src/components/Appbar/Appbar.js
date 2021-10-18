import { useContext } from 'react';

import { StatesContext } from "../StatesProvider/StatesProvider"

import { AppBar, Toolbar, Typography, Button } from "@mui/material"

import { makeStyles } from '@mui/styles';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    flexgrow: {
        flexGrow: 1
    }
})

function Appbar() {

    const classes = useStyles();

    const { login } = useContext(StatesContext)

    const history = useHistory();

    const loginHandler = () => {
        history.push("/")
    }

    const createPoll = () => {
        history.push("/poll")
    }


    return (
        <AppBar>
            <Toolbar>
                <Typography variant='h5' className={classes.flexgrow}>
                    Polling App
                </Typography>
                {login ? (<Button onClick={createPoll} variant="contained" color="secondary">create poll</Button>) : (<Button variant="contained" onClick={loginHandler} color="secondary">Log In</Button>)}
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
