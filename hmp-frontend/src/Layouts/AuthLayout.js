import React from 'react';
const AuthLayout = ({ children }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {children}
      </div>
    </div>
  );
};

// Styles
const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=1060&t=st=1728372929~exp=1728373529~hmac=8724d3355a5b4c814e96576dc9dcf8767d2099c8ef8db6bb547776959b35fdc4")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '500px',
    width: '100%',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
};

export default AuthLayout;
