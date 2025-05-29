import React from "react";
import moment from "moment";
import useStyles from "./styles";
import SendIcon from '@material-ui/icons/Send';

import {
  Box,
  Grid,
  Grow,
  Modal,
  Button,
  Container,
  TextField,
  Typography,
  IconButton
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { updateConvo } from "../../../actions/post";

const PostDetails = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.postReducer);
  const post = posts.find((post) => post._id === id);

  const [postData, setPostData] = React.useState({
    message : '',
    sender: user?.result?.email,
    title: post.title
  })
  const [openChat, setOpenChat] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);

  const handleClose = () => setOpenImage(false);
  const handleChatClose = () => setOpenChat(false);

  const sendMessage =()=>{
    dispatch(updateConvo(post._id, postData));
    setPostData({
      ...postData,
      message:''
    })
  }

  const sortedConversation = post.conversation?.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) || [];

  return (
    <Grow in>
      <Container maxWidth="md" className={classes.mainContainer}>
        <Grid container justifyContent="center" alignItems="stretch">
          <Grid item xs={12}>
            {
              post &&
              <Grid spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="Secondary"
                    className={classes.statusInfo}
                  >
                    {
                      moment(post.createAt).fromNow()
                    }
                  </Typography>
                  <Typography
                    variant="body2"
                    color="Secondary"
                    className={classes.statusInfo}
                  >
                    Status: {
                      post.state
                    }
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" className={classes.title}>
                    Title: {
                      post.title
                    }
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.info}>
                    {
                      `Registered By: ${post.creator} (${post.department}, ${post.batch})`
                    }
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.info}>
                    {
                      `Email ID: ${post.email}`
                    }
                  </Typography>
                </Grid>
                {
                  post.complaint_response &&
                  <Grid item xs={12}>
                    <Typography variant="h6" className={classes.info} color="grey">
                      Complaint Response: {post.complaint_response}
                    </Typography>
                  </Grid>
                }
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    className={classes.content}
                  >
                    Description of Complain:
                  </Typography>
                  <Typography variant="h5" className={classes.info}>
                    {
                      post.content
                    }
                  </Typography>
                </Grid>
                {
                  post.selectedFile &&
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.mediaButton}
                    onClick={() => setOpenImage(true)}
                  >
                    Show Media
                  </Button>
                }
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.mediaButton}
                    onClick={() => setOpenChat(true)}
                  >
                    Show Chat
                  </Button>

              </Grid>
            }
          </Grid>
        </Grid>

        <Modal open={openImage} onClose={handleClose}>
          <Box className={classes.box}>
            <IconButton
              onClick={handleClose}
              className={classes.closeButton}
            >
              <Close />
            </IconButton>
            <img
              alt="Full Screen"
              src={post.selectedFile}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "10px"
              }}
            />
          </Box>
        </Modal>

        <Modal open={openChat} onClose={handleChatClose}>
          <Box className={classes.chat_box}>
            <IconButton
              onClick={handleChatClose}
              className={classes.closeButton}
            >
              <Close />
            </IconButton>
            <div className={classes.card}>
              <h2 style={{textAlign:'center'}}>Conversation regardng '{post.title}'</h2>
              <div className={classes.chatMessages}>
                {
                sortedConversation.length === 0 ?
                <Typography>
                  No messages yet. Send a message to start.
                  </Typography>
               : 
                sortedConversation.map((convo, index) => (
                  <Box
                    key={index}
                    className={
                      convo.sender === user?.result?.email
                        ? classes.adminMessage
                        : classes.userMessage
                    }
                  >
                    <Typography variant="body2" className={classes.messageText}>
                      {convo.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {moment(convo.timestamp).format("MMM D, YYYY h:mm A")}
                    </Typography>
                  </Box>
                  ))
                  }
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '74dvw',
                  gap: 5,
                  padding: '10px'
                }}
                >
                  <TextField
                    fullWidth
                    placeholder="Enter Message"
                    variant="outlined"
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}
                    required
                  />
                  <IconButton disabled={!postData.message} onClick={sendMessage} >
                    <SendIcon fontSize="large" />
                  </IconButton>
                </div>
            </div>
          </Box>
        </Modal>
      </Container>
    </Grow>
  );
};

export default PostDetails;