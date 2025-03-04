import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '35.25%',
    backgroundBlendMode: 'darken',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    top: '30px',
    height: '100%',
    borderRadius: '15px',
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '25px',
    padding: '0 16px 8px 16px'
  },
  AddIcon: {
    color: 'white',
    backgroundColor: '#ff8c00',
    '&:hover': {
      backgroundColor: 'rgb(255,239,0)',
    }
  }
});