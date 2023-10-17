import React, {useCallback, useState} from 'react';
import Editor, {OnChange} from '@monaco-editor/react';

interface ExecutionResponse {
    result?: string;
    output?: string;
}



const MonacoMarkdownEditor: React.FC = () => {
    const [markdownText, setMarkdownText] = useState<string>('');
    const [executionResult, setExecutionResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleEditorChange: OnChange = useCallback((value) => {
        if (typeof value === 'string') {
            setMarkdownText(value);
        }
    }, []);

    const executeCode = async () => {
        setIsLoading(true);
        console.log("Executing code:", markdownText);

        try {
            const response = await fetch('http://localhost:5000/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code: markdownText}),
            });

            console.log("Server response:", response);

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data: ExecutionResponse = await response.json();
            console.log("Execution result:", data);
            setExecutionResult(data.result || data.output || 'No output returned.');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('An error occurred during execution:', error);
                setExecutionResult(`An error occurred: ${error.message}`);
            } else {
                console.error('An unexpected error occurred:', error);
                setExecutionResult('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{flex: 1, padding: '20px', display: 'flex', flexDirection: 'row',}}>
            <div style={{flex: 1, padding: '20px'}}>
                <h2 style={{marginBottom: '10px'}}>Python Code Input</h2>
                <Editor
                    language="python"
                    value={markdownText}
                    onChange={handleEditorChange}
                    height="40vh"
                    theme="vs-dark"
                    options={{
                        minimap: {enabled: false},
                    }}
                />
                <button
                    onClick={executeCode}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '18px',
                        backgroundColor: '#6200ee',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#3700b3';
                    }}
                    onMouseOut={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6200ee';
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Running...' : 'Run Code'}
                </button>
            </div>
            <div style={{flex: 1,flexDirection:"column" ,display:'flex',  padding: '20px', maxWidth: '50%'}}>
                <h2 style={{marginBottom: '10px'}}>Execution Output</h2>
                <div
                    style={{
                        whiteSpace: 'pre-wrap',
                        overflowY: 'scroll',
                        height: '40vh',
                        border: '1px solid #ccc',
                        padding: '10px',
                        fontSize: '16px',
                        color: executionResult.startsWith('An error') ? 'red' : 'green',
                    }}
                >
                    {executionResult}
                </div>
            </div>
        </div>

    );
};

export default MonacoMarkdownEditor;
