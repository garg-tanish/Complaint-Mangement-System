import React from "react";
import moment from "moment";
import useStyles from "./styles";
import toast from "react-hot-toast";
import * as api from '../../../api/index.js';
import DeleteIcon from "@material-ui/icons/Delete";
import FeedbackIcon from '@material-ui/icons/Feedback';
import background from "../../../images/background.png";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";

import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { deletePost, updatePost } from "../../../actions/post";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem("profile"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [stateMenu, setStateMenu] = React.useState(null);
  const [postData, setPostData] = React.useState({
    state: post.state,
    priority: post.priority,
    feedback: post.feedback
  });

  const handleClose = () => setAnchorEl(null);
  const handleStateClose = () => setStateMenu(null)
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleStateClick = (event) => setStateMenu(event.currentTarget);

  const handleDeleteClick = () => {
    const deleteConfirm = window.confirm(`Are you sure to this Complaint (${post.title})`)
    if (deleteConfirm) {
      dispatch(deletePost(post._id))
      toast.success('Deleted Successfully')
      history.push('/')
      window.location.reload()
    }
    else return
  }

  const StyledMenu = withStyles()((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const handlePriority = (noPriority) => {
    setPostData((prevData) => ({
      ...prevData,
      priority: noPriority
    }));
    dispatch(updatePost(post._id, postData));
    handleClose();
  };

  const handleState = (status) => {
    setPostData((prevData) => ({
      ...prevData,
      state: status
    }));
    dispatch(updatePost(post._id, postData));
    informUser(status);
    handleStateClose();
  };

  const handleFeedbackClick = async () => {
    const userFeedback = prompt('Enter Feedback Below...');
    setPostData((prevData) => ({
      ...prevData,
      feedback: userFeedback,
    }));
    dispatch(updatePost(post._id, postData));
    try {
      const emailData = {
        email: `${user?.result?.email}`,
        subject: `Feedback for ${post.title}.`,
        content: `${userFeedback}`,
        reciever: 'admin'
      }
      await api.SendEmail(emailData);
    } catch (error) {
      toast.error(error)
    }
    handleClose();
  };

  const informUser = async (status) => {
    if (status === 'Resolved') {
      const adminfeedback = prompt('Enter Feedback....')
      try {
        const emailData = {
          email: `${user?.result?.email}`,
          subject: `Your Complaint ${post.title} is Resolved`,
          content: `${adminfeedback}`,
          reciever: 'user'
        }
        await api.SendEmail(emailData);
      } catch (error) {
        toast.error(error)
      }
    }
    else if (status === 'Dismissed') {
      const adminfeedback = prompt('Enter the reason of dismissal....')
      try {
        const emailData = {
          email: `${user?.result?.email}`,
          subject: `Your Complaint ${post.title} is Dismissed`,
          content: `${adminfeedback}`,
          reciever: 'user'
        }
        await api.SendEmail(emailData);
      } catch (error) {
        toast.error(error)
      }
    }
  }

  return (
    <Card className={classes.card}>
      <Link to={`/details/${post._id}`}>
        <CardMedia
          image={background}
          title={post.title}
          className={classes.media}
        />
      </Link>
      <div className={classes.overlay}>
        <Typography variant="h6">
          {post.creator}
        </Typography>
        <Typography variant="body2">
          {moment(post.createAt).fromNow()}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="h2">
          {`#${post._id} `}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {
          (post.email === user.result.email && postData.state === 'Pending') &&
          <Button
            size="small"
            color="secondary"
            onClick={handleDeleteClick}
          >
            <DeleteIcon fontSize="medium" />
          </Button>
        }
      </div>
      <Typography
        variant="h5"
        component="h2"
        className={classes.details}
        gutterBottom
      >
        Title: {post.title}
      </Typography>
      <CardActions className={classes.cardActions}>
        {
          user.result.isAdmin &&
          <Button
            color="primary"
            variant="contained"
            aria-haspopup="true"
            aria-controls="customized-menu"
            onClick={handleClick}
            fullWidth
          >
            {
              !postData.priority
                ? "Low Priority"
                : postData.priority === 1
                  ? "Medium Priority"
                  : "High Priority"
            }
          </Button>
        }

        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          keepMounted
        >
          <StyledMenuItem onClick={() => handlePriority(2)}>
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="High Priority" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handlePriority(1)}>
            <ListItemIcon>
              <SettingsEthernetIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Medium Priority" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handlePriority(0)}>
            <ListItemIcon>
              <LowPriorityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Low Priority" />
          </StyledMenuItem>
        </StyledMenu>

        <Button
          color="secondary"
          variant="contained"
          aria-haspopup="true"
          aria-controls="status-menu"
          onClick={handleStateClick}
          disabled={!user.result.isAdmin}
          fullWidth
        >
          {postData.state}
        </Button>

        {!user.result.isAdmin &&
          (
            postData.state === 'Resolved' && postData.feedback === '' &&
            <div style={{ cursor: 'pointer' }}>
              <FeedbackIcon fontSize="large" onClick={handleFeedbackClick} />
            </div>
          )
        }

        <StyledMenu
          id="status-menu"
          anchorEl={stateMenu}
          open={Boolean(stateMenu)}
          onClose={handleStateClose}
          keepMounted
        >
          <StyledMenuItem onClick={() => handleState("Resolved")}>
            <ListItemIcon>
              <TrendingUpIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Resolved" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handleState("Pending")}>
            <ListItemIcon>
              <MoreHorizIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Pending" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handleState("Dismissed")}>
            <ListItemIcon>
              <NotInterestedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dismissed" />
          </StyledMenuItem>
        </StyledMenu>
      </CardActions>
    </Card>
  );
};

export default Post;