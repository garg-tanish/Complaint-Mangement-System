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
    creator: user?.result?.name,
    email: user?.result?.email,
    title: "",
    content: "",
    batch: user?.result?.batch,
    selectedFile: "",
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
      creator: "",
      email: "",
      title: "",
      content: "",
      batch: "",
      selectedFile: "",
      department: "",
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
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
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
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    disabled
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={postData.creator}
                  />
                  <TextField
                    variant="outlined"
                    disabled
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={postData.email}
                    autoComplete="email"
                  />
                  <TextField
                    name="department"
                    id="department"
                    disabled
                    variant="outlined"
                    label="Department"
                    fullWidth
                    autoComplete="department"
                    value={postData.department}
                  />
                  <TextField
                    name="batch"
                    id="batch"
                    disabled
                    variant="outlined"
                    label="Batch"
                    fullWidth
                    autoComplete="batch"
                    value={postData.batch}
                  />
                  <TextField
                    name="title"
                    required
                    variant="outlined"
                    label="Title"
                    fullWidth
                    autoFocus
                    autoComplete="title"
                    value={postData.title}
                    onChange={(e) =>
                      setPostData({ ...postData, title: e.target.value })
                    }
                  />

                  <TextField
                    name="message"
                    required
                    variant="outlined"
                    label="Describe problem or reason for Complaint"
                    fullWidth
                    multiline
                    minRows={5}
                    value={postData.content}
                    onChange={(e) =>
                      setPostData({ ...postData, content: e.target.value })
                    }
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
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isPending}
                    type="submit"
                    fullWidth
                  >
                    {isPending ? "Submitting.." : "Submit"}
                  </Button>
                  <Button
                    className={classes.buttonClear}
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={clear}
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
