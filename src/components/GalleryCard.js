import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const GalleryCard = ({ img, title, id, onClick }) => {
  return (
    <CardActionArea onClick={() => onClick(id)}>
    <Card
    sx={{ maxWidth: 345,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',}}
          >
      <CardMedia
        component="img"
        image={img}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
    </CardActionArea>
  );
}

export default GalleryCard;
