import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  title: {
    marginTop: '20px',
    textAlign: 'center',
  },
  creator: {
    textAlign: 'right',
  },
  createdAt: {
    textAlign: 'right',
  },
  content: {
    marginTop: '25px',
    padding: '25px',
    width: '100%',
    height: 'auto',
  }
}));
