import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "column",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: "15px"
  },
  heading: {
    flexGrow: 1
  },
  dashboard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    fontSize: 20,
    textDecoration: "none",
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  logout: {
    cursor: 'pointer'
  },
  avatar: {
    backgroundColor: "#f40057",
  },
  drawer: {
    width: 250,
  },
  closeButton: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
  },
  moveToTop: {
    position: "fixed",
    zIndex: 1000,
    right: "20px",
    bottom: "20px",
    color: "white",
    backgroundColor: "#f50057",
  },
  image: {
    width: '40px',
    height: '40px',
    aspectRatio: 2 / 3,
    objectFit: 'cover'
  }
}));