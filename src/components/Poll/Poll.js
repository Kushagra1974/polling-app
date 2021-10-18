import { Container, Typography, TextField, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Stack, Radio } from "@mui/material"

import { makeStyles } from '@mui/styles';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useContext, useState } from "react";

import { StatesContext } from "../StatesProvider/StatesProvider";


import { useHistory } from "react-router";
const useStyles = makeStyles({
    btn: {
        width: 100,
        marginTop: "30px !important",
        marginRight: "20px !important"
    },
    mrgtp: {
        marginTop: '70px'
    }
})

export default function Poll(params) {

    const history = useHistory();

    const classes = useStyles();

    const { login, setCounters, setTimer, setActive } = useContext(StatesContext)

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [choice, setChoice] = useState("")

    if (!login) {
        history.push("/home")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (title && choice && category) {
            let yes = 0;
            let no = 0;
            if (choice === 'yes') {
                yes = 1;
            }
            if (choice === 'no') {
                no = 1;
            }
            let newobj = {
                title,
                category,
                yes,
                no,
            }
            console.log(newobj)
            let newstate;
            setCounters((prev) => {
                newstate = [...prev, newobj]
                setTimer((p) => {
                    return [...p, 100]
                });
                setActive((p) => {
                    return [...p, true]
                })
                return newstate;
            })

            localStorage.removeItem("keys")
            localStorage.setItem("keys", JSON.stringify(newstate))
            history.push("/home");
        }

    }

    return <Container className={classes.mrgtp}>
        <Typography variant="h4" color="textSecondary" gutterBottom>Create a new Poll</Typography>

        <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <Stack spacing={3}>
                <TextField
                    label="Title of the poll"
                    fullWidth
                    onChange={e => { setTitle(e.target.value) }}
                    value={title}
                />
                <FormControl fullWidth >
                    <FormLabel >Cast your vote</FormLabel>
                    <RadioGroup value={choice} onChange={e => { setChoice(e.target.value) }}>
                        <FormControlLabel value="yes" control={<Radio />} label="In favour" />
                        <FormControlLabel value="no" control={<Radio />} label="Against" />
                    </RadioGroup>
                </FormControl>

                <FormControl fullWidth >
                    <FormLabel >Category of the poll</FormLabel>
                    <RadioGroup value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <FormControlLabel value="private" control={<Radio />} label="private" />
                        <FormControlLabel value="public" control={<Radio />} label="public" />
                    </RadioGroup>
                </FormControl>

            </Stack>
            <Button className={classes.btn} variant="contained" color="secondary" type="submit" endIcon={<KeyboardArrowUpIcon />}>Submit</Button>
            <Button className={classes.btn} variant="contained" onClick={() => { history.push("/home") }} >back</Button>
        </form>
    </Container>
}
