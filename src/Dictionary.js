import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import './Dictionary.css';

const WordTypes = {
    WORD: 'Word',
    PHRASE: 'Phrase',
    KANJI: 'Kanji',
};

const Dictionary = () => {
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [wordType, setWordType] = useState(WordTypes.WORD);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [notification, setNotification] = useState(''); // State for pop-up notification
    const [solutionEnabled, setSolutionEnabled] = useState(false); // State for enabling the solution button
    const [blockInput, setblockInput] = useState(false); // State for enabling the solution button
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
    const [wordToDelete, setWordToDelete] = useState(null); // Track the word to delete
    const [solutionChecked, setSolutionChecked] = useState(false); // Track if the solution was checked
    const [recentWords, setRecentWords] = useState([]); // Track recently displayed words
    const [userTranslation, setUserTranslation] = useState(''); // State for user input
    const [addWordformData, setAddWordformData] = useState({
        englishWord: '',
        japaneseWord: '',
        sound: '',
        wordType: WordTypes.WORD,
    });

    useEffect(() => {
        // print user translation when it changes
        console.log('User Translation:', userTranslation);
    }
    , [userTranslation]);
    
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
        if (words.length > 0 && !currentWord.translation) {
            const randomIndex = Math.floor(Math.random() * words.length);
            setCurrentWord(words[randomIndex]); // Set a random word as the current word
            setSolutionEnabled(false); // Disable the solution button for the new word
            setNotification(''); // Clear any previous notification
            setSolutionChecked(false); // Reset the solutionChecked state
        }
    }, [words, currentWord.translation]); // Only run when `words` changes and no word is currently set    

    useEffect(() => {
        if (words.length > 0 && !words.some(word => word.translation === currentWord.translation)) {
            const randomIndex = Math.floor(Math.random() * words.length);
            setCurrentWord(words[randomIndex]); // Set a new random word if the current one is deleted
        }
    }, [words, currentWord]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification('')
                setblockInput(false); // Re-enable input after 2 seconds
            }, 2000); // Clear notification after 2 seconds
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [notification]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddWordformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const addWord = (event) => {
        event.preventDefault();

        const { englishWord, japaneseWord, sound } = addWordformData;

        if (!englishWord || !japaneseWord || !sound) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        const updatedWords = [...words];

        if (wordToDelete !== null) {
            // Update the existing word
            updatedWords[wordToDelete] = {
                ...updatedWords[wordToDelete],
                word: englishWord.split(',').map((w) => w.trim().toLowerCase()),
                translation: japaneseWord.trim(),
                sound: sound.trim(),
                type: wordType,
            };
            setWordToDelete(null); // Reset after editing
        } else {
            // Add a new word
            const newWord = {
                word: [englishWord.trim().toLowerCase()],
                translation: japaneseWord.trim(),
                sound: sound.trim(),
                type: wordType,
                correctGuesses: 0,
                incorrectGuesses: 0,
            };
            updatedWords.unshift(newWord);
        }

        setWords(updatedWords);
        setAddWordformData({
            englishWord: '',
            japaneseWord: '',
            sound: '',
            wordType: WordTypes.WORD,
        });
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

        // Determine the maximum number of recent words to track
        const maxRecentWords = Math.min(10, words.length - 1);

        // Filter out recently displayed words
        const availableWords = words.filter(
            (word) => !recentWords.includes(word.translation)
        );

        // If all words are in the recentWords list, reset the recentWords array
        if (availableWords.length === 0) {
            setRecentWords([]);
            return getRandomWord(); // Retry with an empty recentWords list
        }

        // Select a random word from the available words
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const selectedWord = availableWords[randomIndex];

        // Update the current word
        setCurrentWord(selectedWord);

        // Update the recentWords array
        setRecentWords((prevRecentWords) => {
            const updatedRecentWords = [...prevRecentWords, selectedWord.translation];
            if (updatedRecentWords.length > maxRecentWords) {
                updatedRecentWords.shift(); // Remove the oldest word if the limit is exceeded
            }
            return updatedRecentWords;
        });

        // Reset other states
        setErrorMessage(''); // Clear any previous error message
        setSolutionEnabled(false); // Disable the solution button for the new word
        setNotification(''); // Clear any previous notification
        setSolutionChecked(false); // Reset the solutionChecked state
    };

    const checkTranslation = (event) => {
        event.preventDefault();
        const userInput = userTranslation.trim().toLowerCase();
        const updatedWords = [...words];
    
        setblockInput(true); // Block input while processing

        if (currentWord.word.includes(userInput)) {
            if (!solutionChecked) {
                setNotification({ message: 'Correct! 🎉', color: 'green' });

                const wordIndex = updatedWords.findIndex((word) => word.translation === currentWord.translation);
                if (wordIndex !== -1) {
                    updatedWords[wordIndex].correctGuesses += 1;
                }
            } else {
                setNotification({ message: 'Correct, but you checked the solution first.', color: 'orange' });
            }

            setSolutionEnabled(false);
            setUserTranslation(''); // Clear the input field

            setTimeout(() => {
                setNotification('');
                setblockInput(false);
                getRandomWord();
            }, 500);
        } else {
            setNotification({ message: 'Incorrect. Try again.', color: 'red' });

            const wordIndex = updatedWords.findIndex((word) => word.translation === currentWord.translation);
            if (wordIndex !== -1) {
                updatedWords[wordIndex].incorrectGuesses += 1;
            }

            setSolutionEnabled(true);

            setTimeout(() => {
                setNotification('');
                setblockInput(false);
            }, 2000);
        }

        setWords(updatedWords);
    };

    const showSolution = () => {
        if (currentWord.word && currentWord.word.length > 0) {
            const englishMeanings = currentWord.word.join(', '); // Join all English meanings with commas
            setNotification({ message: `The correct translation is: ${englishMeanings}`, color: 'orange' });
            setSolutionChecked(true); // Mark that the solution was checked
        } else {
            setNotification({ message: 'No translation available.', color: 'red' });
        }
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

    // eslint-disable-next-line no-unused-vars
    const getRomajiForChar = (text) => {
        let romaji = '';
        for (let i = 0; i < text.length; i++) {
            // Check for digraphs (two-character combinations)
            const digraph = text.slice(i, i + 2); // Look at the current and next character
            if (romajiMap[digraph]) {
                romaji += romajiMap[digraph]; // Use the digraph mapping
                i++; // Skip the next character since it's part of the digraph
            } else {
                // Fallback to single-character mapping
                const char = text[i];
                romaji += romajiMap[char] || char; // Use the single-character mapping or the character itself
            }
        }
        return romaji;
    };

    const speakWord = (text) => {
        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP'; // Set the language to Japanese
        utterance.rate = 0.9; // Adjust the speaking rate (optional)
        utterance.pitch = 1; // Adjust the pitch (optional)

        window.speechSynthesis.speak(utterance);
    };

    const editWord = (index) => {
        const wordToEdit = words[index];
        setAddWordformData({
            englishWord: wordToEdit.word.join(', '),
            japaneseWord: wordToEdit.translation,
            sound: wordToEdit.sound,
            wordType: wordToEdit.type,
        });
        setWordToDelete(index);
    };

    const renderTranslationWithTooltips = (translation, romajiMap) => {
        const result = [];
        let i = 0;

        while (i < translation.length) {
            // Check if there are at least two characters left for a digraph
            if (i + 1 < translation.length) {
                const digraph = translation.slice(i, i + 2); // Look at the current and next character
                if (romajiMap[digraph]) {
                    // If a valid digraph is found
                    result.push(
                        <span
                            key={i}
                            className="tooltip digraph-highlight"
                            data-tooltip={romajiMap[digraph]}
                        >
                            {digraph}
                        </span>
                    );
                    i += 2; // Skip the next character since it's part of the digraph
                    continue; // Skip to the next iteration
                }
            }

            // Fallback to single-character mapping
            const char = translation[i];
            result.push(
                <span
                    key={i}
                    className="tooltip char-highlight"
                    data-tooltip={romajiMap[char] || char}
                >
                    {char}
                </span>
            );
            i++; // Move to the next character
        }

        return result;
    };

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
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                {currentWord.translation && (
                    <div className="random-word-display">
                        <h3 className="random-word">
                            {renderTranslationWithTooltips(currentWord.translation, romajiMap)}
                        </h3>
                        <button onClick={() => speakWord(currentWord.translation)} className="speaker-button">
                            🔊 Speak
                        </button>
                        <form onSubmit={checkTranslation} className="check-translation-form">
                            <Input
                                placeholder='Enter Japanese Translation'
                                value={userTranslation}
                                onChange={(e) => setUserTranslation(e.target.value)}
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
                <h2 className="section-title">
                    {wordToDelete !== null ? 'Edit Word' : 'Add a New Word'}
                </h2>
                <form
                    onSubmit={addWord}
                    className={`add-word-form ${wordToDelete !== null ? 'editing' : ''}`}
                >
                    <Input
                        name="japaneseWord"
                        placeholder='Japanese Word'
                        value={addWordformData.japaneseWord}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="sound"
                        placeholder="Sound (e.g., kuma)"
                        value={addWordformData.sound}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="englishWord"
                        placeholder="English Word"
                        value={addWordformData.englishWord}
                        onChange={handleInputChange}
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
                    <button type="submit" className="add-button">
                        {wordToDelete !== null ? 'Save Changes' : 'Add'}
                    </button>
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
                                            className="edit-icon"
                                            onClick={() => editWord(index)}
                                            title="Edit"
                                        >✏️</i>
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