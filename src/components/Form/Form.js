import React from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";

import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Grow,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../actions/post";

const Form = ({ setCurrentId }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [isPending, setIsPending] = React.useState(false);
  const [postData, setPostData] = React.useState({
    title: "",
    content: "",
    selectedFile: "",
    email: user?.result?.email,
    batch: user?.result?.batch,
    creator: user?.result?.name,
    department: user?.result?.department,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    dispatch(createPost(postData));
    clear();
    history.push("/dashboard");
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      email: "",
      title: "",
      batch: "",
      creator: "",
      content: "",
      department: "",
      selectedFile: "",
    });
    setIsPending(false);
  };

  return (
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
                  Create a Compliant Report
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
                    label="Describe problem or reason for Complaint"
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
                      type="image"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setPostData({ ...postData, selectedFile: base64 })
                      }
                    />
                  </div>
                  <Button
                    size="large"
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isPending}
                    className={classes.buttonSubmit}
                    fullWidth
                  >
                    {isPending ? "Submitting.." : "Submit"}
                  </Button>
                  <Button
                    size="large"
                    color="secondary"
                    variant="contained"
                    onClick={clear}
                    className={classes.buttonClear}
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
  );
};

export default Form;