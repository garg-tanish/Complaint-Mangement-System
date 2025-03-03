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
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
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
    right: "20px",
    zIndex: 1000,
    bottom: "20px",
    color: "white",
    backgroundColor: "#f50057",
  },
}));