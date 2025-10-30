import React from 'react';

export default function Spinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', border: '4px solid #eee', borderTopColor: '#111', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div>Yükleniyor...</div>
    </div>
  );
}
