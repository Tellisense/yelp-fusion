import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const RatingCard = ({ companyImg, companyName, companyAddress, companyCity, companyState, companyRating, userName, userImg, companyComment }) => {
  const classes = useStyles()


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={companyName}
          height="140"
          image={companyImg}
          title={companyName}
        />
        <CardContent>
          <Typography variant="h5">
            {companyName}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {`${companyAddress} ${companyCity}, ${companyState}`}
          </Typography>

          <Avatar alt="user-image" src={userImg} className={classes.large} />
          <Typography variant="body1" color="textSecondary" component="p">
            {userName}
          </Typography>
          <Rating name="half-rating-read" defaultValue={companyRating} precision={0.5} readOnly />
          <Typography variant="body2" color="textSecondary" component="p">
            {companyComment}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default RatingCard
