import useStyles from "./styles";
import background from "../../../images/background2.png";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  CardActions
} from "@material-ui/core/";
import { Link } from "react-router-dom";

const CardItem = ({ title, link }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link to={link}>
        <CardMedia
          title={title}
          image={background}
          className={classes.media}
        />
      </Link>
      <div className={classes.overlay}>
        <Typography variant="h6">
          {
            title
          }
        </Typography>
      </div>
      <CardActions className={classes.cardActions}>
        <Link to={link}>
          <IconButton aria-label="add complaint" className={classes.AddIcon}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardItem;