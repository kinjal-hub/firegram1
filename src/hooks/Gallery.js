import { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import GalleryCard from '../components/GalleryCard';
import ImageDetail from '../components/ImageDetail'; // Import the new component

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/images');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryData();
  }, []);

  const handleCardClick = (id) => {
    setSelectedImageId(id);
  };

  const handleBackClick = () => {
    setSelectedImageId(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" align="center">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" align="center" color="error">Error: {error.message}</Typography>
      </Container>
    );
  }

  if (selectedImageId) {
    return <ImageDetail imageId={selectedImageId} onBackClick={handleBackClick} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Image Gallery
      </Typography>
      <Grid container spacing={4}>
        {images.length > 0 ? (
          images.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <GalleryCard img={item.img} title={item.title} id={item.id} onClick={handleCardClick} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">No images found.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Gallery;
