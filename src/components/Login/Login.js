import { useContext } from 'react';

import { Card, CardContent, CardActions, TextField, Button } from '@mui/material'

import { makeStyles } from '@mui/styles';

import Stack from '@mui/material/Stack';

import { loginData } from '../../data/data';

import { StatesContext } from '../StatesProvider/StatesProvider';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        width: "600px",
        paddingTop: "18px"
    },
    center: {
        justifyContent: "center"
    },
    left: {
        justifyContent: "right"
    },
    font: {
        fontSize: "12px"
    },
    margin: {
        margin: "200px"
    }
})

export default function Login() {

    const classes = useStyles()

    const { setLogin } = useContext(StatesContext);

    const history = useHistory();

    let dataobj = { name: "", password: "" }

    const nameHandler = (e) => {
        dataobj.name = e.target.value;
    }

    const deleteHandler = (e) => {
        dataobj.password = e.target.value;
    }

    const loginHandler = () => {
        //console.log(login)
        if (dataobj.name && dataobj.password) {
            const ele = loginData.find((d) => d.name === dataobj.name && d.password === dataobj.password)
            if (ele) {
                setLogin(true);
                history.push("/home")
            }
        }
    }

    const withoutLoginHandler = () => {
        history.push("/home")
    }

    return (
        <Stack alignItems="center" className={classes.margin}>
            <Card className={classes.card} elevation={3}>
                <CardContent>
                    <TextField fullWidth label="Name" variant="outlined" onChange={nameHandler} />
                </CardContent>
                <CardContent>
                    <TextField type="password" fullWidth label="Password" variant="outlined" onChange={deleteHandler} />
                </CardContent>
                <CardActions className={classes.center}>
                    <Button variant="contained" onClick={loginHandler}>Login</Button>
                </CardActions>
                <CardActions className={classes.left}>
                    <Button onClick={withoutLoginHandler} className={classes.font} variant="text">continue without login</Button>
                </CardActions>
            </Card>
        </Stack>
    )
}
