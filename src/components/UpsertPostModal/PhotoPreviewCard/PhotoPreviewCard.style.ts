const styles = {
  photoCard: {
    position: 'relative',
    width: 100,
    height: 100,
  },

  photoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  photoRemoveButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
};

export default styles;
