import React from "react";
import useStyles from "./styles";
import toast from 'react-hot-toast';
import FileBase from "react-file-base64";
import Loader from "../Loader/Loader.js";

import {
  Grow,
  Grid,
  Paper,
  Button,
  TextField,
  Container,
  Typography
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../actions/post";

const Form = ({ setCurrentId }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [loading, setLoading] = React.useState(false)
  const [postData, setPostData] = React.useState({
    title: "",
    content: "",
    selectedFile: "",
    email: user?.result?.email,
    batch: user?.result?.batch,
    creator: user?.result?.name,
    department: user?.result?.department,
  });

  const handleFileUpload = ({ base64, file }) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Your selected file is not an image file so it will be not be shown");
      setPostData({ ...postData, selectedFile: '' });
    }
    else {
      setLoading(true);
      setTimeout(() => {
        setPostData({ ...postData, selectedFile: base64 });
        setLoading(false);
      }, 1500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(createPost(postData));
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData((prev) => ({
      ...prev,
      title: "",
      content: "",
      selectedFile: "",
    }));
    setLoading(false);
    history.push("/");
  };

  return (
    <div>
      <Grow in>
        <Container>
          <Grid container justifyContent="center" alignItems="stretch">
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  className={`${classes.root} ${classes.form}`}
                >
                  <Typography
                    variant="h4"
                    color="secondary"
                    className={classes.header}
                  >
                    Register new Compliant
                  </Typography>
                  <Grid container spacing={2}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      variant="outlined"
                      label="First Name"
                      value={postData.creator}
                      disabled
                      fullWidth
                    />
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={postData.email}
                      disabled
                      fullWidth
                    />
                    <TextField
                      id="department"
                      name="department"
                      label="Department"
                      variant="outlined"
                      value={postData.department}
                      disabled
                      fullWidth
                    />
                    <TextField
                      id="batch"
                      name="batch"
                      label="Batch"
                      variant="outlined"
                      value={postData.batch}
                      disabled
                      fullWidth
                    />
                    <TextField
                      name="title"
                      label="Title"
                      variant="outlined"
                      value={postData.title}
                      onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                      }
                      required
                      fullWidth
                      autoFocus
                    />
                    <TextField
                      name="message"
                      variant="outlined"
                      label="Describe problem"
                      minRows={5}
                      value={postData.content}
                      onChange={(e) =>
                        setPostData({ ...postData, content: e.target.value })
                      }
                      required
                      fullWidth
                      multiline
                    />
                    <div className={classes.fileInput}>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={handleFileUpload}
                      />
                    </div>
                    <Button
                      size="medium"
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={classes.button}
                      fullWidth
                    >
                      Submit
                    </Button>
                    <Button
                      size="medium"
                      color="secondary"
                      variant="contained"
                      onClick={clear}
                      className={classes.button}
                      fullWidth
                    >
                      Clear
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      {
        loading && <Loader />
      }
    </div>
  );
};

export default Form;