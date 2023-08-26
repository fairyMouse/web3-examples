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
  const { uri, dadId, level, mumId, tokenId } = data;
  console.log(
    "dadId:",
    Number(dadId),
    Number(level),
    Number(mumId),
    Number(tokenId)
  );

  // 还差自己的ID、等级、父母ID信息展示
  return (
    <Card sx={{ maxWidth: 280, p: 2 }}>
      <CardMedia
        sx={{
          height: 240,
          backgroundSize: "contain",
        }}
        image={uri}
        title="green iguana"
      />

      <CardActions>
        <Button size="small" disabled>
          添加合成（即将上线）
        </Button>
      </CardActions>
    </Card>
  );
};

export default NFTCard;
