const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    overflowY: 'auto',
    paddingTop: 2,
  },

  formRow: {
    display: 'flex',
    gap: 2,
  },

  addPhotosButton: {
    marginBottom: 2,
  },

  errorText: {
    display: 'block',
    marginBottom: 1,
  },

  photoPreviewContainer: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
  },

  photoLimitWarning: {
    color: '#ed6c02',
    fontSize: '0.75rem',
    mt: 0.5,
    fontWeight: 500,
  },
};

export default styles;
