import { Container, Stack, Card, CardContent, CardActions, Typography, Button } from '@mui/material'

import { makeStyles } from '@mui/styles'

import { useContext, useState, useEffect } from 'react';

import { StatesContext } from '../StatesProvider/StatesProvider';

const useStyle = makeStyles({
    margintop: {
        marginTop: "100px"
    },
    maxwidth: {
        width: "300px"
    },
    center: {
        justifyContent: "center",
        borderTop: "1px solid #ddd"
    }
})

export default function Home() {

    const classes = useStyle();

    const { login, counters, setCounters, timer, setTimer, active, setActive } = useContext(StatesContext)

    console.log(timer);

    useEffect(() => {

        active.map((data) => {
            let intv;
            if (data) {
                if (data) {
                    intv = setInterval(() => {
                        updateTimer();
                    }, 1000);
                }

                console.log(data);

            }
            console.log(data)
            return () => {
                clearTimeout(intv)
            }
        })

    }, [active])



    const updateTimer = () => {
        setTimer((prev) => {

            const newTimer = prev.map((data, index) => {
                {
                    if (data > 0) {
                        return data - 1;
                    }
                    if (data === 0) {
                        console.log("hel[");
                        setActive((p) => {
                            const newactive = p.map((d, i) => {
                                if (i === index) {
                                    return false;
                                }
                                return d
                            })
                            console.log(newactive)

                            return newactive;
                        });
                        return data
                    }
                }
            })
            return newTimer;
        })
    }

    console.log(timer)

    const disable = (i) => {
        setActive((prev) => {
            return prev.map((data, index) => {
                if (i === index) {
                    return false;
                }
                return data;
            })
        })
    }

    const infavourHandler = (i) => {
        console.log("infavour", i)
        disable(i);
        setCounters((prev) => {
            const newarr = prev.map((data, index) => {
                if (index === i) {
                    let newobj = data;
                    newobj.yes += 1;
                    return newobj;
                }
                else return data;
            })
            return newarr;
        })
    }

    const againstHandler = (i) => {
        console.log("against", i)
        disable(i);
        setCounters((prev) => {
            return prev.map((data, index) => {
                if (index === i) {
                    let newobj = data;
                    newobj.no += 1;
                    return newobj;
                }
                return data;
            })
        })
    }

    let pub = counters.filter((data, index) => {
        return data.category === 'public'
    })

    let display = pub;
    if (login) display = counters;

    return (
        <Container className={classes.margintop}>
            <Stack spacing={4} alignItems="center">
                {
                    display.map((data, index) => {
                        const val = active[index]
                        return (
                            <Card elevation={2} key={index} className={classes.maxwidth}>
                                <CardContent>
                                    <Typography color="textSecondary">{data.category}</Typography>
                                    <Typography variant='h5'>{data.title}</Typography>
                                    <Typography>In favour : {data.yes} | Against {data.no}</Typography>
                                    <Typography>Timer : {timer[index]}</Typography>
                                    {!timer[index] ? <Typography color="primary">{data.yes > data.no ? "Infavour" : "Against"}</Typography> : null}
                                </CardContent>
                                <CardActions className={classes.center}>
                                    <Button variant="contained" disabled={!val} onClick={() => { infavourHandler(index) }}>in favour</Button>
                                    <Button variant="contained" disabled={!val} onClick={() => { againstHandler(index) }}>against</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Stack>
        </Container>
    )
}
