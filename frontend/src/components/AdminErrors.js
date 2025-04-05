import React, { useState } from 'react';
import axios from 'axios';

const AdminErrors = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExtractErrors = async () => {
    setLoading(true);
    setStatusMessage('');
    try {
      const res = await axios.get('http://localhost:8800/api/treci/error_files');
      if (res.data?.uspjesno) {
        setStatusMessage('Uspjesno!');
      } else {
        setStatusMessage('Nije dobijena ocekivana potvrda');
      }
    } catch (err) {
      console.error('Greška:', err);
      setStatusMessage('Greska');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h4>Ekstrakcija ERROR logova</h4>
      <button className="btn btn-danger mb-3" onClick={handleExtractErrors} disabled={loading}>
        {loading ? 'Obrađujem...' : 'Pokreni proceduru'}
      </button>
      {statusMessage && (
        <div className="alert alert-info mt-3">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default AdminErrors;
