import React from "react";
import moment from "moment";
import useStyles from "./styles";

import {
  Box,
  Grid,
  Grow,
  Modal,
  Button,
  Container,
  Typography,
  IconButton
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Close } from "@material-ui/icons";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const classes = useStyles();

  const posts = useSelector((state) => state.postReducer);
  const post = posts.find((post) => post._id === id);

  const [openImage, setOpenImage] = React.useState(false);

  const handleClose = () => setOpenImage(false);

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
                    className={classes.createdAt}
                  >
                    {moment(post.createAt).fromNow()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" className={classes.title}>
                    Title: {post.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.creator}>
                    Registered By: {post.creator}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    className={classes.content}
                  >
                    Description of Complain:
                  </Typography>
                  <Typography variant="h4" >
                    {post.content}
                  </Typography>
                  {
                    post.feedback && (
                      <Typography variant="body2" color="gray">
                        Feedback: {post.feedback}
                      </Typography>
                    )}
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
              style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
            />
          </Box>
        </Modal>
      </Container>
    </Grow>
  );
};

export default PostDetails;