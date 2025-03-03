import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '70vh'
  },
  filterButton: {
    margin: 5,
    float: 'right',
    cursor: 'pointer'
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