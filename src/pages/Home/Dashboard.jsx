import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { loadYelp, selectYelp, selectLoading, selectError } from '../../features/yelpSlice'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Logo from '../../components/Logo'
import RatingCard from '../../components/RatingCard'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

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
  const error = useSelector(selectError)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  //logs for testing application
  console.log(`loader: `, open)
  console.log(`Api Data: `, data)
  if (error) console.log(`Error: `, error)

  const handleClose = () => {
    setOpen(false);
  };

  //error handling
  useEffect(() => {
    if (error) setOpenError(true)
    else setOpenError(false)
  }, [error])

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };


  useEffect(() => {
    setOpen(loader)
  }, [loader])

  useEffect(() => {
    setData(yelpResults)
  }, [yelpResults])


  useEffect(() => {
    dispatch(loadYelp())
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Snackbar open={openError} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleErrorClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default Dashboard;