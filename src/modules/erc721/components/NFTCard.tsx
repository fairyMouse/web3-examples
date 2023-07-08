import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface INFTCardProps {
  data: any;
}

const NFTCard = (props: INFTCardProps) => {
  const { data } = props;
  const { uri } = data;
  console.log("data:", data);

  // 还差自己的ID、等级、父母ID信息展示
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardMedia
        sx={{
          height: 240,
          backgroundSize: "contain",
        }}
        image={uri}
        title="green iguana"
      />

      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default NFTCard;
