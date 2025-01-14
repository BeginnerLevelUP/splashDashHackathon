import { useState, useEffect } from 'react';
import './App.css';
import OpenAI from 'openai';

function App() {
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    const getStreamedResponse = async () => {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      try {
        const stream = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: 'Tell me a story about a dragon.' }],
          stream: true,
        });

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            setResponse((prevResponse) => prevResponse + content);
          }
        }
        setIsStreaming(false);
      } catch (error) {
        console.error('Error fetching stream:', error);
        setIsStreaming(false);
      }
    };

    if (isStreaming) {
      getStreamedResponse();
    } else {
      setResponse('');
    }
  }, [isStreaming,apiKey]);

  return (
    <div className="App">
      <h1>Streaming Response</h1>
      <button onClick={() => setIsStreaming(!isStreaming)}>
        {!isStreaming ? "Start Streaming" : "Stop Streaming"}
      </button>
      <div>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
