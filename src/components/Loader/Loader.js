import useStyles from './styles'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <CircularProgress className={classes.progress} />
    </div>
  )
}

export default Loader