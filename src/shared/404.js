import React from 'react';

const NoPage = () => {
  return (
    <div style={styles.railsDefaultErrorPage}>
      <div style={styles.dialog}>
        <div style={styles.dialogInner}>
          <h1>The page you were looking for doesn't exist.</h1>
          <p>You may have mistyped the address or the page may have moved.</p>
        </div>
        <p style={styles.bottomParagraph}>
          If you are the application owner check the logs for more information.
        </p>
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  railsDefaultErrorPage: {
    backgroundColor: '#EFEFEF',
    color: '#2E2F30',
    textAlign: 'center',
    fontFamily: 'arial, sans-serif',
    margin: 0,
  },
  dialog: {
    width: '95%',
    maxWidth: '33em',
    margin: '4em auto 0',
  },
  dialogInner: {
    border: '1px solid #CCC',
    borderRightColor: '#999',
    borderLeftColor: '#999',
    borderBottomColor: '#BBB',
    borderTop: '#B00100 solid 4px',
    borderTopLeftRadius: '9px',
    borderTopRightRadius: '9px',
    backgroundColor: 'white',
    padding: '7px 12% 0',
    boxShadow: '0 3px 8px rgba(50, 50, 50, 0.17)',
  },
  bottomParagraph: {
    margin: '0 0 1em',
    padding: '1em',
    backgroundColor: '#F7F7F7',
    border: '1px solid #CCC',
    borderRightColor: '#999',
    borderLeftColor: '#999',
    borderBottomColor: '#999',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    borderTopColor: '#DADADA',
    color: '#666',
    boxShadow: '0 3px 8px rgba(50, 50, 50, 0.17)',
  }
};

export default NoPage;