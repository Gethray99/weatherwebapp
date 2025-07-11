function Header({ onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>Weather App</h1>
      </div>
      <div style={styles.center}>
        <input
          type="text"
          placeholder="Search your city"
          style={styles.searchInput}
          onKeyDown={handleKeyDown}
        />
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'black',
    borderRadius: '0 0 12px 12px',
    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1000,
  },
  left: {
    flexShrink: 1, 
  },
  center: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none', 
  },
  searchInput: {
    width: '80%',
    maxWidth: '400px',
    padding: '8px 16px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: '0 1px 3px rgba(255, 255, 255, 0.1)',
    pointerEvents: 'auto', 
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#e0e0e0',
  },
};


export default Header;