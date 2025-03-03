import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    border: '2px solid black'
  },
  title: {
    marginTop: '20px',
    textAlign: 'center',
  },
  creator: {
    textAlign: 'center',
  },
  createdAt: {
    marginTop: 8,
    textAlign: 'right'
  },
  content: {
    textAlign: 'center',
    padding: '25px',
    marginTop: '25px',
    marginBottom: '25px'
  },
  mediaButton: {
    margin: 15
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  }
}));