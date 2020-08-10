import React from 'react'
import logo from '../assets/logo.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: '15vmin',
    pointerEvents: 'none',
  }
}));

const Logo = () => {
  const classes = useStyles()
  return (
    <div>
      <img src={logo} className={classes.logo} alt="logo" />
    </div>
  )
}

export default Logo
