const buttonStyle = {
    padding: '10px 20px',
    fontSize: '25px',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    backgroundColor: '#007bff',
    color: '#fff',
    margin: '10px',
};

const centerContentStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column', // Stack children vertically
    alignItems: 'center',
    minHeight: '100vh',
    margin: '50px',
};

const centerContentStyle2 = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const characterDisplayStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column', // Stack children vertically
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #333',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    maxWidth: '600px', // Adjust as needed
    width: '65%',
};

const buttonMultipleChoice = {
    margin: '10px',
    fontSize: '35px', // Adjust as needed
};

const char = {
    fontSize: '155px', // Adjust as needed
    margin: '10px 10px',
};


const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    padding: '7px',
    border: '2px solid #333',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    flexWrap: 'wrap',
    width: '56%',
    marginTop: '30px',
};

const squareStyle = (color, percentage) => ({
    width: '35px', // Adjust the size of the squares as needed
    height: '65px',
    margin: '1px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgb(199 199 199)',
    backgroundImage: `linear-gradient(to top, ${color} ${percentage}%, transparent ${percentage}%)`,
  });

  const bigCharStyle = {
    fontSize: '21px', // Adjust the size of the big character as needed
  };

  const smallNumberStyle = {
    fontSize: '11px', // Adjust the size of the small number as needed
  };

export { buttonStyle, centerContentStyles, centerContentStyle2, characterDisplayStyle, buttonMultipleChoice, char, containerStyle, squareStyle, bigCharStyle, smallNumberStyle };