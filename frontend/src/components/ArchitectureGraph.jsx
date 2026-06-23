import React, { useEffect } from 'react';
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 250, y: 50 },
    data: { label: 'UI (React)' },
    style: { background: 'var(--bg-sidebar)', color: 'var(--text-primary)', border: '2px solid var(--accent)', borderRadius: '8px', padding: '12px', fontWeight: 'bold' }
  },
  {
    id: '2',
    position: { x: 250, y: 180 },
    data: { label: 'API Gateway (FastAPI)' },
    style: { background: 'var(--bg-sidebar)', color: 'var(--text-primary)', border: '2px solid #10b981', borderRadius: '8px', padding: '12px', fontWeight: 'bold' }
  },
  {
    id: '3',
    position: { x: 50, y: 320 },
    data: { label: 'Vector Store (ChromaDB)' },
    style: { background: 'var(--bg-sidebar)', color: 'var(--text-primary)', border: '2px solid #f59e0b', borderRadius: '8px', padding: '12px', fontWeight: 'bold' }
  },
  {
    id: '4',
    position: { x: 450, y: 320 },
    data: { label: 'LLM Engine (Llama 3.2 1B)' },
    style: { background: 'var(--bg-sidebar)', color: 'var(--text-primary)', border: '2px solid #ef4444', borderRadius: '8px', padding: '12px', fontWeight: 'bold' }
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-2', source: '3', target: '2' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e4-2', source: '4', target: '2' },
  { id: 'e2-1', source: '2', target: '1' },
];

export default function ArchitectureGraph({ status }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setEdges(initialEdges.map((edge) => {
      let strokeColor = 'var(--text-secondary)'; // Default abu-abu
      let strokeWidth = 1.5;
      let filterStyle = 'none';
      let isAnimated = false; // Default: tidak beranimasi

      // 1. Fase Upload (UI -> API -> Vector Store)
      if (status === 'uploading' && (edge.id === 'e1-2' || edge.id === 'e2-3')) {
        strokeColor = '#f59e0b'; // Orange
        strokeWidth = 3;
        isAnimated = true;
      }

      // 2. Fase Retrieval (API -> Vector Store -> API -> LLM)
      else if (status === 'retrieving' && (edge.id === 'e2-3' || edge.id === 'e3-2' || edge.id === 'e2-4')) {
        strokeColor = '#3b82f6'; // Blue
        strokeWidth = 3;
        isAnimated = true;
      }

      // 3. Fase Generation (LLM -> API -> UI)
      else if (status === 'generating' && (edge.id === 'e4-2' || edge.id === 'e2-1')) {
        strokeColor = '#10b981'; // Green
        strokeWidth = 3;
        filterStyle = 'drop-shadow(0 0 5px #10b981)'; // Efek bersinar (Glow)
        isAnimated = true;
      }

      return {
        ...edge,
        animated: isAnimated, // Hanya bergerak saat ada aktivitas
        style: { stroke: strokeColor, strokeWidth, filter: filterStyle, transition: 'all 0.3s ease' },
        markerEnd: { type: MarkerType.ArrowClosed, color: strokeColor },
      };
    }));
  }, [status, setEdges]);

  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'var(--bg-main)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-header)', backdropFilter: 'blur(8px)', zIndex: 10 }}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: '0.75rem', color: 'var(--accent)' }}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Mission Control</h3>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="var(--border)" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
