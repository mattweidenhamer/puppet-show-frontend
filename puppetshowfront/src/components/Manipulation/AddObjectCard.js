import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const styles = {
  card: {
    height: 327,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
};

const AddObjectCard = (props) => {
  return (
    <Card sx={{ ...styles.card, ...props.sx }}>
      <CardContent>
        <Typography variant="h5">Add {props.objName}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={props.onClickHandler}>
          <AddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AddObjectCard;
