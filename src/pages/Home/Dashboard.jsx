import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { loadYelp, selectYelp, selectLoading } from '../../features/yelpSlice'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Logo from '../../components/Logo'
import RatingCard from '../../components/RatingCard'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 100,
  },
  marginTop: {
    marginTop: '2rem'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Dashboard = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const yelpResults = useSelector(selectYelp)
  const loader = useSelector(selectLoading)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  console.log(`open: `, open)
  console.log(`data: `, data)
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(loader)
  }, [loader])

  useEffect(() => {
    setData(yelpResults)
  }, [yelpResults])

  useEffect(() => {
    dispatch(loadYelp())
  }, [yelpResults])

  const handleClick = () => {
    dispatch(loadYelp())
  }

  return (
    <Grid container className={classes.root} justify="center" alignItems="center" direction="column">
      <Grid container item xs={12} justify="center" alignItems="center">
        <Logo />
      </Grid>
      <Grid container item xs={12} justify="center" alignItems="center">
        <Box>
          <Button variant="contained" color="primary" onClick={handleClick}>Get Data</Button>
        </Box>
      </Grid>

      <Grid container spacing={6} className={classes.marginTop} justify="space-between" alignItems="center">

        {data && data.map(({ user = {}, image_url, name, location, id, rating, text }) => {
          const userImg = user && user.image_url
          const userName = user && user.name
          const address = location && location.address1
          const city = location && location.city
          const state = location && location.state
          return (
            <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
              <RatingCard companyImg={image_url} companyName={name} userImg={userImg} companyAddress={address} companyRating={rating} companyCity={city} companyState={state} companyComment={text} userName={userName} />
            </Grid>
          )
        })
        }
      </Grid>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default Dashboard;