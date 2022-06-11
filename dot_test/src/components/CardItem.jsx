import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function CardItem({ data }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia component="img" image={data.media.m} alt="random" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {data.title}
          </Typography>
          <Typography>{data.tags}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
