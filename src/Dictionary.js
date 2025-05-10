import React, { useState, useEffect } from 'react';
import './Dictionary.css'; // Import external CSS for better styling

const WordTypes = {
    WORD: 'Word',
    PHRASE: 'Phrase',
    KANJI: 'Kanji',
};

const Dictionary = () => {
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [englishWord, setEnglishWord] = useState('');
    const [japaneseWord, setJapaneseWord] = useState('');
    const [wordType, setWordType] = useState(WordTypes.WORD);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [notification, setNotification] = useState(''); // State for pop-up notification
    const [solutionEnabled, setSolutionEnabled] = useState(false); // State for enabling the solution button
    const [blockInput, setblockInput] = useState(false); // State for enabling the solution button
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
    const [wordToDelete, setWordToDelete] = useState(null); // Track the word to delete
    const [sound, setSound] = useState(''); // State for the sound input

    const romajiMap = {
        // Hiragana
        あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
        か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
        さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
        た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
        な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
        は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
        ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
        や: 'ya', ゆ: 'yu', よ: 'yo',
        ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
        わ: 'wa', を: 'wo', ん: 'n',
        が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
        ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
        だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
        ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
        ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
        きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
        しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
        ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho',
        にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
        ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo',
        みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
        りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
        ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
        じゃ: 'ja', じゅ: 'ju', じょ: 'jo',
        びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
        ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
    
        // Katakana
        ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o',
        カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko',
        サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so',
        タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to',
        ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no',
        ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho',
        マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo',
        ヤ: 'ya', ユ: 'yu', ヨ: 'yo',
        ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro',
        ワ: 'wa', ヲ: 'wo', ン: 'n',
        ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go',
        ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo',
        ダ: 'da', ヂ: 'ji', ヅ: 'zu', デ: 'de', ド: 'do',
        バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo',
        パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po',
        キャ: 'kya', キュ: 'kyu', キョ: 'kyo',
        シャ: 'sha', シュ: 'shu', ショ: 'sho',
        チャ: 'cha', チュ: 'chu', チョ: 'cho',
        ニャ: 'nya', ニュ: 'nyu', ニョ: 'nyo',
        ヒャ: 'hya', ヒュ: 'hyu', ヒョ: 'hyo',
        ミャ: 'mya', ミュ: 'myu', ミョ: 'myo',
        リャ: 'rya', リュ: 'ryu', リョ: 'ryo',
        ギャ: 'gya', ギュ: 'gyu', ギョ: 'gyo',
        ジャ: 'ja', ジュ: 'ju', ジョ: 'jo',
        ビャ: 'bya', ビュ: 'byu', ビョ: 'byo',
        ピャ: 'pya', ピュ: 'pyu', ピョ: 'pyo'
    };
    
    // Load words from local storage on component mount
    useEffect(() => {
        const storedWords = JSON.parse(localStorage.getItem('dictionaryWords')) || [];
        setWords(storedWords);
    }, []);

    // Save words to local storage whenever the words array changes
    useEffect(() => {
        localStorage.setItem('dictionaryWords', JSON.stringify(words));
    }, [words]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification('')
                setblockInput(false); // Re-enable input after 2 seconds
            }, 2000); // Clear notification after 2 seconds
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [notification]);

    const addWord = (event) => {
        event.preventDefault();
    
        if (!englishWord) {
            setErrorMessage('Please provide an English word.');
            return;
        }
    
        if (!japaneseWord) {
            setErrorMessage('Please provide a Japanese word.');
            return;
        }
    
        if (!sound) {
            setErrorMessage('Please provide a sound for the word.');
            return;
        }
    
        // Check if the Japanese word already exists
        const existingWordIndex = words.findIndex(
            (word) => word.translation.toLowerCase() === japaneseWord.trim().toLowerCase()
        );
    
        if (existingWordIndex !== -1) {
            // If the Japanese word exists, add the new English meaning to its meanings array
            const updatedWords = [...words];
            const existingWord = updatedWords[existingWordIndex];
    
            if (!existingWord.word.includes(englishWord.trim().toLowerCase())) {
                existingWord.word.push(englishWord.trim().toLowerCase());
            } else {
                setErrorMessage('This meaning already exists for the given Japanese word.');
                return;
            }
    
            setWords(updatedWords);
        } else {
            // If the Japanese word does not exist, create a new entry
            const newWord = {
                word: [englishWord.trim().toLowerCase()], // Store meanings as an array
                translation: japaneseWord.trim(),
                sound: sound.trim(),
                type: wordType,
                correctGuesses: 0,
                incorrectGuesses: 0,
            };
            setWords([newWord, ...words]);
        }
    
        setEnglishWord('');
        setJapaneseWord('');
        setSound('');
        setWordType(WordTypes.WORD);
        setErrorMessage('');
    };

    const deleteWord = (index) => {
        const updatedWords = words.filter((_, i) => i !== index);
        setWords(updatedWords);
    };

    const getRandomWord = () => {
        if (words.length === 0) {
            setErrorMessage('No words available. Please add some words first.'); // Set error message
            return;
        }
        const randomIndex = Math.floor(Math.random() * words.length);
        setCurrentWord(words[randomIndex]); // Set the current word
        setErrorMessage(''); // Clear any previous error message
        setSolutionEnabled(false); // Disable the solution button for the new word
        setNotification(''); // Clear any previous notification
    };

    const checkTranslation = (event) => {
        event.preventDefault();
        const userInput = event.target.elements.userTranslation.value.trim().toLowerCase();
        const updatedWords = [...words];
    
        setblockInput(true); // Block input while processing
    
        // Check if the user input matches any of the valid meanings
        if (currentWord.word.includes(userInput)) {
            setNotification({ message: 'Correct! 🎉', color: 'green' });
    
            // Increment correct guesses for the current word
            const wordIndex = updatedWords.findIndex((word) => word.translation === currentWord.translation);
            if (wordIndex !== -1) {
                updatedWords[wordIndex].correctGuesses += 1;
            }
    
            setSolutionEnabled(false);
            event.target.reset();
    
            // Timer for correct guess (0.5s)
            setTimeout(() => {
                setNotification('');
                setblockInput(false); // Re-enable input after notification clears
                getRandomWord(); // Fetch a new random word
            }, 500);
        } else {
            setNotification({ message: 'Incorrect. Try again.', color: 'red' });
    
            // Increment incorrect guesses for the current word
            const wordIndex = updatedWords.findIndex((word) => word.translation === currentWord.translation);
            if (wordIndex !== -1) {
                updatedWords[wordIndex].incorrectGuesses += 1;
            }
    
            setSolutionEnabled(true);
    
            // Timer for incorrect guess (2s)
            setTimeout(() => {
                setNotification('');
                setblockInput(false); // Re-enable input after notification clears
            }, 2000);
        }
    
        setWords(updatedWords); // Update the words state
    };

    const showSolution = () => {
        setNotification({ message: `The correct translation is: ${currentWord.translation}`, color: 'orange' });
    };

    const openDeleteModal = (index) => {
        setWordToDelete(index); // Set the word to delete
        setIsModalOpen(true); // Open the modal
    };

    const resetWinRates = () => {
        const updatedWords = words.map((word) => ({
            ...word,
            correctGuesses: 0,
            incorrectGuesses: 0,
        }));
        setWords(updatedWords); // Update the words state
        setNotification({ message: 'Win rates have been reset!', color: 'blue' }); // Show a notification
    };

    const getRomajiForChar = (char) => romajiMap[char] || char; // Return the character itself if no mapping exists

    return (
        <div className="dictionary-container">
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Are you sure you want to delete this word?</p>
                        <div className="modal-actions">
                            <button
                                onClick={() => {
                                    deleteWord(wordToDelete);
                                    setIsModalOpen(false);
                                }}
                                className="confirm-button"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="cancel-button"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <h1 className="dictionary-title">Language Learning Dictionary</h1>

            {/* Random Word Section */}
            <div className="random-word-section">
                {notification && (
                    <div
                        className="notification-popup"
                        style={{ backgroundColor: notification.color }}
                    >
                        <p>{notification.message}</p>
                    </div>
                )}
                <h2 className="section-title">Get a Random Word</h2>
                <button onClick={getRandomWord} className="random-word-button">Get Random Word</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                {currentWord.translation && (
                    <div className="random-word-display">
                        <h3 className="random-word">
                            {currentWord.translation.split('').map((char, index) => (
                                <span key={index} className="tooltip" data-tooltip={getRomajiForChar(char)}>
                                    {char}
                                </span>
                            ))}
                        </h3>
                        <form onSubmit={checkTranslation} className="check-translation-form">
                            <input
                                type="text"
                                name="userTranslation"
                                placeholder="Enter English Translation"
                                className="input-field"
                            />
                            <button
                                type="submit"
                                className="check-button"
                                disabled={blockInput} // Disable button while blocked
                            >
                                Check Translation
                            </button>
                        </form>
                        <button
                            onClick={showSolution}
                            className="solution-button"
                            disabled={!solutionEnabled} // Disable the button if not enabled
                        >
                            Show Solution
                        </button>
                    </div>
                )}
            </div>

            {/* Add Word Section */}
            <div className="form-container">
                <h2 className="section-title">Add a New Word</h2>
                <form onSubmit={addWord} className="add-word-form">
                    <input
                        type="text"
                        placeholder="Japanese Word"
                        value={japaneseWord}
                        onChange={(e) => setJapaneseWord(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Sound (e.g., kuma)"
                        value={sound}
                        onChange={(e) => setSound(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="English Word"
                        value={englishWord}
                        onChange={(e) => setEnglishWord(e.target.value)}
                        className="input-field"
                    />
                    <select
                        value={wordType}
                        onChange={(e) => setWordType(e.target.value)}
                        className="type-select"
                    >
                        <option value={WordTypes.WORD}>Word</option>
                        <option value={WordTypes.PHRASE}>Phrase</option>
                        <option value={WordTypes.KANJI}>Kanji</option>
                    </select>
                    <button type="submit" className="add-button">Add</button>
                </form>
            </div>

            {/* Dictionary Table Section */}
            <div className="dictionary-list-container">
                <h2 className="dictionary-list-title">Your Dictionary</h2>
                <div className="dictionary-controls">
                    <button onClick={resetWinRates} className="reset-button">Reset Win Rates</button>
                </div>
                <table className="dictionary-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Japanese</th>
                            <th>Sound</th> {/* New column for sound */}
                            <th>English</th>
                            <th>Win Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.map((word, index) => {
                            const totalGuesses = word.correctGuesses + word.incorrectGuesses;
                            const winRate = totalGuesses > 0 ? Math.round((word.correctGuesses / totalGuesses) * 100) : 0;

                            return (
                                <tr key={index}>
                                    <td>{word.type}</td>
                                    <td className="japanese-text">{word.translation}</td>
                                    <td>{word.sound}</td>
                                    <td>{word.word.join(', ')}</td> {/* Display all meanings as a comma-separated list */}
                                    <td>
                                        <div
                                            className="win-rate-box"
                                            style={{
                                                background: `linear-gradient(to right, green ${totalGuesses === 0 ? 100 : winRate}%, red ${totalGuesses === 0 ? 100 : winRate}%)`,
                                            }}
                                        >
                                            {winRate}% ({word.correctGuesses}/{totalGuesses})
                                        </div>
                                    </td>
                                    <td>
                                        <i
                                            className="delete-icon"
                                            onClick={() => openDeleteModal(index)}
                                            title="Delete"
                                        >🗑️</i>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dictionary;