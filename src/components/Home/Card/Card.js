import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
} from "@material-ui/core/";
import background from "../../../images/background2.png";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const CardItem = ({ title, link }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link to={link}>
        <CardMedia
          className={classes.media}
          image={background}
          title={title}
        />
      </Link>
      <div className={classes.overlay}>
        <Typography variant="h6">{title}</Typography>
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
