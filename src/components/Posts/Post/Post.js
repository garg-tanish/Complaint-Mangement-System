import React from "react";
import moment from "moment";
import useStyles from "./styles";
import toast from "react-hot-toast";
import * as api from '../../../api/index.js';
import DeleteIcon from "@material-ui/icons/Delete";
import background from "../../../images/background.png";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";

import {
  Card,
  Menu,
  Button,
  MenuItem,
  CardMedia,
  Typography,
  CardActions,
  ListItemIcon,
  ListItemText
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
    feedback: post.complaint_response
  });

  const handleClose = () => setAnchorEl(null);
  const handleStateClose = () => setStateMenu(null)
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleStateClick = (event) => setStateMenu(event.currentTarget);

  const handleDeleteClick = () => {
    const deleteConfirm = window.confirm(`Are you sure to delete Complaint (${post.title})`)
    if (deleteConfirm) {
      dispatch(deletePost(post._id))
      toast.success('Deleted Successfully')
      history.push('/')
      window.location.reload()
    }
    else return
  }

  const StyledMenu = withStyles({})((props) => (
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
    dispatch(updatePost(post._id, {
      ...postData,
      priority: noPriority
    }));
    handleClose();
  };

  const handleState = async (status) => {
    const adminFeedback = prompt('Enter Feedback Below...');
    if (adminFeedback) {
      setPostData((prevData) => ({
        ...prevData,
        state: status,
        feedback: adminFeedback
      }));
      dispatch(updatePost(post._id, {
        ...postData,
        state: status,
        feedback: adminFeedback,
      }));
      handleStateClose();
      if (status === 'Resolved') {
        try {
          const emailData = {
            email: `${post.email}`,
            subject: `Complaint ${post.title} Resolved`,
            content: `Your Complaint ${post.title} is Resolved. 
            ${postData.feedback ? `Admin responded on your complaint:
            ${postData.feedback}` : ''}`,
            reciever: 'user'
          }
          await api.SendEmail(emailData);
        } catch (error) {
          toast.error(error)
        }
      }
      else if (status === 'Dismissed') {
        try {
          const emailData = {
            email: `${post.email}`,
            subject: `Complaint ${post.title} Dismissed`,
            content: `Your Complaint ${post.title} is Dismissed. 
            ${postData.feedback ? `The reason behind it:
            ${postData.feedback}` : ''}`,
            reciever: 'user'
          }
          await api.SendEmail(emailData);
        } catch (error) {
          toast.error(error)
        }
      }
    }
    else toast.error('Feedback is mandatory.')
  };

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
          {
            post.creator
          }
        </Typography>
        <Typography variant="body2">
          {
            moment(post.createAt).fromNow()
          }
        </Typography>
        <Typography variant="body1" color="textSecondary" component="h2">
          {
            `#${post._id} `
          }
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
          (user.result.isAdmin &&
            !(postData.state === 'Resolved' || postData.state === 'Dismissed')) &&
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
          disabled={!user.result.isAdmin || postData.state === 'Resolved' || postData.state === 'Dismissed'}
          fullWidth
        >
          {postData.state}
        </Button>

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