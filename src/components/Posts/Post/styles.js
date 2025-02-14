import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    top: '30px',
  },
  overlay: {
    position: 'absolute',
    top: '30px',
    left: '30px',
    color: 'white',
    wordBreak: 'true'
  },
  overlay2: {
    position: 'absolute',
    top: '30px',
    right: '10px',
    color: 'white',
    wordBreak: 'true'
  },
  details: {
    display: 'flex',
    justifyContent: 'center',
    margin: '25px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
