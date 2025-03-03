import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundBlendMode: 'darken',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    top: '30px',
    height: '100%',
    borderRadius: '15px',
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
    display: 'flex',
    padding: '0 16px 8px 16px',
    justifyContent: 'space-between',
  },
});