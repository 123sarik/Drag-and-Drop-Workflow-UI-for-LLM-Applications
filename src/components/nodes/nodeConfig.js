import { Position } from "reactflow";

export const nodeConfigs = {
  customInput: {
    label: 'Input',
    fields: [
      { key: 'inputName', label: 'Name', type: 'text', defaultValue: 'Default Input Name' },
      {
        key: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text', // Default to "Text" option
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ],
      },
    ],
    handles: [
      { id: 'value', type: 'source', position: Position.Right },
    ],
  },
  llm: {
    label: 'LLM',
    description: 'This is a LLM.',
    fields: [],
    handles: [
      { id: 'system', type: 'target', position: Position.Left, style: { top: '33%' } },
      { id: 'prompt', type: 'target', position: Position.Left, style: { top: '66%' } },
      { id: 'response', type: 'source', position: Position.Right },
    ],
  },
  customOutput: {
    label: 'Output',
    fields: [
      { key: 'outputName', label: 'Name', type: 'text', defaultValue: 'Default Output Name' },
      {
        key: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text', // Default to "Text" option
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'Image' },
        ],
      },
    ],
    handles: [
      { id: 'value', type: 'target', position: Position.Left },
    ],
  },
  text: {
    label: 'Text',
    fields: [
      { key: 'text', label: 'Text', type: 'text', defaultValue: 'Default Text' },
    ],
    handles: [
      { id: 'output', type: 'source', position: Position.Right },
    ],
  },

  // New Nodes:

  customAction: {
    label: 'Action',
    fields: [
      { key: 'actionName', label: 'Action Name', type: 'text', defaultValue: 'Default Action' },
      {
        key: 'actionType',
        label: 'Action Type',
        type: 'select',
        defaultValue: 'Start',
        options: [
          { value: 'Start', label: 'Start' },
          { value: 'Pause', label: 'Pause' },
          { value: 'Stop', label: 'Stop' },
        ],
      },
    ],
    handles: [
      { id: 'control', type: 'source', position: Position.Right },
    ],
  },

  conditionalNode: {
    label: 'Conditional',
    fields: [
      { key: 'condition', label: 'Condition', type: 'text', defaultValue: 'True' },
      {
        key: 'actionOnTrue',
        label: 'Action if True',
        type: 'text',
        defaultValue: 'Proceed',
      },
      {
        key: 'actionOnFalse',
        label: 'Action if False',
        type: 'text',
        defaultValue: 'Abort',
      },
    ],
    handles: [
      { id: 'trueAction', type: 'source', position: Position.Right },
      { id: 'falseAction', type: 'source', position: Position.Left },
    ],
  },

  timerNode: {
    label: 'Timer',
    fields: [
      { key: 'timerName', label: 'Timer Name', type: 'text', defaultValue: 'Default Timer' },
      { key: 'duration', label: 'Duration (seconds)', type: 'number', defaultValue: 60 },
    ],
    handles: [
      { id: 'start', type: 'source', position: Position.Right },
      { id: 'timeout', type: 'target', position: Position.Left },
    ],
  },

  databaseNode: {
    label: 'Database',
    fields: [
      { key: 'dbName', label: 'Database Name', type: 'text', defaultValue: 'Default Database' },
      {
        key: 'dbType',
        label: 'Database Type',
        type: 'select',
        defaultValue: 'SQL',
        options: [
          { value: 'SQL', label: 'SQL' },
          { value: 'NoSQL', label: 'NoSQL' },
        ],
      },
      { key: 'connection', label: 'Connection String', type: 'text', defaultValue: 'localhost' },
    ],
    handles: [
      { id: 'query', type: 'source', position: Position.Right },
      { id: 'response', type: 'target', position: Position.Left },
    ],
  },

  networkNode: {
    label: 'Network',
    fields: [
      { key: 'networkName', label: 'Network Name', type: 'text', defaultValue: 'Default Network' },
      {
        key: 'protocol',
        label: 'Protocol',
        type: 'select',
        defaultValue: 'HTTP',
        options: [
          { value: 'HTTP', label: 'HTTP' },
          { value: 'HTTPS', label: 'HTTPS' },
          { value: 'FTP', label: 'FTP' },
        ],
      },
    ],
    handles: [
      { id: 'request', type: 'source', position: Position.Right },
      { id: 'response', type: 'target', position: Position.Left },
    ],
  },
};
