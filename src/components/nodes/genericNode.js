import { Handle } from 'reactflow';
import { useState } from 'react';
import { nodeConfigs } from './nodeConfig';
import './node.css';

export const GenericNode = ({ id, data, type, isSelected }) => {
  const config = nodeConfigs[type];
  const [variables, setVariables] = useState([]);
  const [nodeHeight, setNodeHeight] = useState(type === "databaseNode" ? 190 : type === "conditionalNode" ? 230 : 130);
  const [inputHeight, setInputHeight] = useState(30);

  const [state, setState] = useState(() => {
    const initialState = {};
    config.fields.forEach((field) => {
      initialState[field.key] =
        type === "text"
          ? `{{input}}`
          : data?.[field.key] ||
          (field.type === 'text'
            ? `${config.label}_${id.split('-').pop()}`
            : field.options?.[0]?.value || '');
    });
    return initialState;
  });

  if (!config) {
    return <div style={{ border: '1px solid red', padding: '10px' }}>Unknown node type: {type}</div>;
  }

  const handleInputChange = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));

    if (key === 'text') {
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      tempElement.style.whiteSpace = 'pre-wrap';
      tempElement.style.font = 'inherit';
      tempElement.style.width = '100%';
      tempElement.textContent = value;

      document.body.appendChild(tempElement);
      document.body.removeChild(tempElement);

      const textArea = document.getElementById(`${id}-textarea`);
      if (textArea) {
        const newInputHeight = Math.min(textArea.scrollHeight, 300);
        setInputHeight(newInputHeight);

        const newNodeHeight = newInputHeight + 120;
        setNodeHeight(Math.min(newNodeHeight, 340));
      }

      // Detect variables in the text (e.g., {{variableName}})
      const detectedVariables = Array.from(value.matchAll(/\{\{\s*(\w+)\s*\}\}/g)).map((match) => match[1]);
      setVariables(detectedVariables);
    }
  };

  return (
    <div
      className={`node-container ${isSelected ? 'selected' : ''}`}
      style={{ height: `${nodeHeight}px` }} // set node height and increase dynamically
    >
      <div className="node-header">
        <strong>{config.label}</strong>
      </div>

      {config.fields.map((field) => (
        <div key={field.key} className="node-field-container">
          <label className="node-label">
            {field.label}:
            {field.type === 'text' ? (
              type === 'text' ? (
                <textarea
                  id={`${id}-textarea`} // unique ID for precise height calculation
                  value={state[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="node-input"
                  style={{ height: `${inputHeight}px` }} // set height to input for increasing dynamically
                />
              ) : (
                <input
                  type="text"
                  value={state[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="node-input"
                />
              )
            ) : field.type === 'select' ? (
              <select
                value={state[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className="node-select"
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : null}
          </label>
        </div>
      ))}

      {config.description && <div className="node-description">{config.description}</div>}

      <div className="node-handle-container">
        {config.handles.map((handle) => (
          <Handle
            key={handle.id}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.id}`}
            isConnectable={true}
            style={{
              ...handle.style,
              width: '12px',   
              height: '12px',  
              backgroundColor: '#527acf', 
              border: '2px solid #ffffff', 
              borderRadius: '50%', 
              boxShadow: '0 0 8px rgba(78, 144, 210, 0.6)', 
              transition: 'transform 0.2s ease-in-out', 
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')} 
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} 
          />
        ))}

        {variables.map((variable, index) => (
          <Handle
            key={`${id}-var-${index}`}
            type="target"
            position="left"
            id={`${id}-var-${variable}`}
            style={{
              top: `${30 + index * 20}px`,
              width: '12px',   
              height: '12px',  
              backgroundColor: '#527acf', 
              border: '2px solid #ffffff', 
              borderRadius: '50%', 
              boxShadow: '0 0 8px rgba(78, 144, 210, 0.6)', 
              transition: 'transform 0.2s ease-in-out', 
            }}
            isConnectable={true}
          />
        ))}
      </div>
    </div>
  );
};
