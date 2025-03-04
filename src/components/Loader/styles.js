import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(201, 222, 236, 0.4)',
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));
