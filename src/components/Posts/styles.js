import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    width: '300px',
    height: '100%',
    margin: '33.3%',
    textAlign: 'center',
  },
  filterButton: {
    margin: 5,
    float: 'right'
  },
  drawer: {
    width: 250,
  },
  closeButton: {
    padding: "10px",
    display: "flex",
    justifyContent: "flex-end"
  }
}));