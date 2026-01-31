const styles = {
  root: {
    display: 'flex',
    gap: 1,
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  body: {
    flex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '16px',
  },
  username: {
    fontWeight: 600,
    fontSize: 14,
  },
  time: {
    color: 'text.secondary',
    fontSize: 12,
  },
  bubble: {
    backgroundColor: 'background.paper',
    borderRadius: 12,
    padding: '6px 16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  text: {
    fontSize: 15,
    color: 'text.primary',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
};

export default styles;
