const buttonStyle = {
    padding: '10px 20px',
    fontSize: '25px',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    backgroundColor: '#2e2e3e', // Dark gray background
    color: '#ccc', // Light gray text
    margin: '10px',
};

const centerContentStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column', // Stack children vertically
    alignItems: 'center',
    minHeight: '100vh',
    margin: '50px',
    backgroundColor: '#121212', // Dark background
    color: '#ccc', // Light gray text
};

const centerContentStyle2 = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1e1e2f', // Slightly lighter dark background
    color: '#ccc', // Light gray text
    padding: '20px',
    borderRadius: '10px',
};

const characterDisplayStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column', // Stack children vertically
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #444', // Darker border
    borderRadius: '10px',
    backgroundColor: '#1e1e2f', // Dark background
    maxWidth: '600px', // Adjust as needed
    width: '65%',
    color: '#ccc', // Light gray text
};

const buttonMultipleChoice = {
    margin: '10px',
    fontSize: '35px', // Adjust as needed
    backgroundColor: '#2e2e3e', // Dark gray background
    color: '#ccc', // Light gray text
    border: '2px solid #444', // Darker border
    borderRadius: '8px', // Rounded corners
    padding: '12px 10px', // Padding for button content
    cursor: 'pointer', // Cursor style
    transition: 'all 0.3s ease', // Smooth transition
};

const handleHover = (e) => {
    e.target.style.backgroundColor = '#444'; // Slightly lighter gray on hover
    e.target.style.borderColor = '#666'; // Darker border on hover
    e.target.style.color = '#fff'; // White text on hover
};

const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = '#2e2e3e'; // Restore original background color
    e.target.style.borderColor = '#444'; // Restore original border color
    e.target.style.color = '#ccc'; // Restore original text color
};

const char = {
    fontSize: '155px', // Adjust as needed
    margin: '10px 10px',
    color: '#ffffff', // White text for characters
};

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    padding: '7px',
    border: '2px solid #444', // Darker border
    borderRadius: '10px',
    backgroundColor: '#1e1e2f', // Dark background
    flexWrap: 'wrap',
    width: '56%',
    marginTop: '30px',
    color: '#ccc', // Light gray text
};

const squareStyle = (color, percentage) => ({
    width: '50px', // Adjust the size of the squares as needed
    height: '70px',
    padding: '5px',
    margin: '1px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e2e3e', // Dark gray background
    backgroundImage: `linear-gradient(to top, ${color} ${percentage}%, transparent ${percentage}%)`,
    color: '#ccc', // Light gray text
});

const bigCharStyle = {
    fontSize: '21px', // Adjust the size of the big character as needed
    color: '#ffffff', // White text
};

const smallNumberStyle = {
    fontSize: '11px', // Adjust the size of the small number as needed
    color: '#ccc', // Light gray text
};

const smallNumberStyleAdvanced = (show, value) => ({
    display: `${show ? '' : 'none'}`,
    color: `${value > 4000 ? 'red' : '#ccc'}`, // Red for high values, light gray otherwise
    fontSize: '11px',
});

const checkboxStyle = {
    marginRight: '10px',
    accentColor: '#007bff', // Blue checkbox
    cursor: 'pointer',
  };

  const inputStyle = {
    backgroundColor: '#2e2e3e', // Dark gray background
    color: '#ccc', // Light gray text
    border: '1px solid #444', // Subtle border
    borderRadius: '5px',
    padding: '5px',
    marginRight: '10px',
    fontSize: '16px',
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff', // Blue background
    color: '#ffffff', // White text
    marginRight: '10px',
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff4d4d', // Red background
    color: '#ffffff', // White text
  };

export {
    buttonStyle,
    smallNumberStyleAdvanced,
    centerContentStyles,
    centerContentStyle2,
    characterDisplayStyle,
    buttonMultipleChoice,
    char,
    containerStyle,
    squareStyle,
    bigCharStyle,
    smallNumberStyle,
    handleHover,
    handleMouseLeave,
    checkboxStyle,
    inputStyle,
    submitButtonStyle,
    resetButtonStyle,
};