import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    display: 'flex',
    flexDirection: 'column',
  },
  dashboard: {
      position: 'relative',
      left: '650px',
      padding: '10px',
  },
  link: {
    paddingLeft: '20px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  title: {
    marginLeft: '15px',
  },
  logout: {
    marginLeft: '20px',
  },
  avatar: {
    backgroundColor: '#f40057',
  }
}));
