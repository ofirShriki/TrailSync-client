const styles = {
  root: {
    position: 'relative',
    marginBottom: 10,
  },

  filtersContainer: {
    padding: 3,
    paddingBottom: 0,
  },

  createButton: {
    display: 'flex',
    gap: 1,
    position: 'fixed',
    bottom: 32,
    right: 32,
    zIndex: 1000,
    transition: 'width 0.3s ease, padding 0.3s ease',

    '&:hover': {
      paddingRight: 2,
      backgroundColor: 'primary.main',
    },
  },

  searchContainer: {
    padding: 3,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'center',
  },

  searchIconWrapper: {
    position: 'absolute',
    right: 15,
    top: '55%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'primary.main',
  },

  searchInput: {
    width: '100%',
    padding: '12px 45px 12px 20px',
    fontSize: 16,
    lineHeight: '20px',
    borderRadius: 8,
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',

    '&:focus': {
      borderColor: 'primary.main',
      boxShadow: '0 0 5px rgba(0, 123, 255, 0.3)',
    },
  },

  searchWrapper: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
};

export default styles;
