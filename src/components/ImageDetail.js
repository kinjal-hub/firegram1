import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardMedia } from '@mui/material';

const ImageDetail = ({ imageId, onBackClick }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetail = async () => {
      if (!imageId) return;
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8000/api/images/${imageId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImage(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImageDetail();
  }, [imageId]);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center" color="error">Error: {error.message}</Typography>;
  }

  if (!image) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {image.title}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          image={image.img}
          alt={image.title}
          style={{ maxHeight: 600, objectFit: 'contain' }}
        />
        
      </Card>
      <button onClick={onBackClick} style={{ marginTop: '20px' }}>Back to Gallery</button>
    </Container>
  );
};

export default ImageDetail;
