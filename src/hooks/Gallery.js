import { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import GalleryCard from '../components/GalleryCard';
import ImageDetail from '../components/ImageDetail';

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

  // Use item._id instead of item.id when the data comes from Mongoose
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
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <GalleryCard
                img={item.img}
                title={item.title}
                id={item._id} // Pass the _id to the GalleryCard
                onClick={() => handleCardClick(item._id)} // Pass _id to the click handler
              />
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
