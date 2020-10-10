import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  paper:{
      display: "flex", justifyContent: "center",alignItems: "center", flexDirection:"column", padding: "2rem"
  },
  mB:{
    marginBottom:  theme.spacing(1),
  }
}));
