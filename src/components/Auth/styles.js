import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
  },
  submit: {
    fontSize: '16px',
    textTransform: 'none',
    margin: theme.spacing(3, 0, 2)
  },
  switchButton: {
    fontSize: '15px',
    textTransform: 'none',
    '&:hover': {
      color: 'blue',
    }
  }
}));