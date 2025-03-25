import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '70%'
  },
  button: {
    marginTop: 5,
  },
  avatar: {
    backgroundColor: "#f40057",
    width: '70px',
    margin: '20px',
    height: '70px',
    '&:hover': {
      backgroundColor: '#f40099',
      cursor: 'pointer'
    }
  },
  image: {
    width: '70px',
    height: '70px',
    aspectRatio: 2 / 3
  }
}));