import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";

const App = () => {
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [textToCopy, setTextToCopy] = useState('');
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });
    const [savedNotes, setSavedNotes] = useState([]);

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    useEffect(() => {
        // Automatically update textToCopy when transcript changes
        setTextToCopy(transcript);
    }, [transcript]);

    const saveNote = () => {
        if (transcript) {
            setSavedNotes(prevNotes => [...prevNotes, transcript]);
            // You can also save the note to local storage or send it to a backend server here
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser does not support speech recognition.</p>;
    }

    return (
        <div className="container">
            <h2>Speech to Text Converter</h2>
            <p>A React hook that converts speech from the microphone to text and makes it available to your React components.</p>

            <div className="main-content">
                {transcript}
            </div>

            <div className="btn-style">
                <button onClick={setCopied}>
                    {isCopied ? 'Copied!' : 'Copy to clipboard'}
                </button>
                <button onClick={startListening}>Start Listening</button>
                <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                <button onClick={saveNote}>Save Note</button>
            </div>

            <div className="saved-notes-container">
              <h3 className="saved-notes-heading">Saved Notes</h3>
                <ul className="saved-notes-list">
                  {savedNotes.map((note, index) => (
                  <li key={index} className="saved-note-item">
                    {note}
                  </li>
                ))}
              </ul>
            </div>

        </div>
    );
};

export default App;


// lkdjlkajdfljl
