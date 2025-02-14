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
    flexGrow: 1,
    textAlign: 'center'
  },
  dashboard: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logout: {
    marginLeft: "20px",
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
    bottom: "20px",
    right: "20px",
    backgroundColor: "#f50057",
    color: "white",
    zIndex: 1000,
  },
}));