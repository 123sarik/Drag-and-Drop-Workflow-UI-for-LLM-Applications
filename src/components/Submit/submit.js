import { useState } from "react";
import { useStore } from "../../store/store";
import './submit.css';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const submitPipeline = async () => {
        const { nodes, edges } = useStore.getState();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Pipeline Analysis:
                    - Number of Nodes: ${result.num_nodes}
                    - Number of Edges: ${result.num_edges}
                    - Is DAG: ${result.is_dag ? 'Yes' : 'No'}`);
            } else {
                alert('Error: ' + result.message || 'Failed to process pipeline.');
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('An error occurred while submitting the pipeline.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button className="submit-button" onClick={submitPipeline} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Pipeline'}
            </button>
        </div>
    );
}
