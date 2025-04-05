import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAll = ({ activeTab }) => {
  const [selectedType, setSelectedType] = useState('');
  const [countResult, setCountResult] = useState(null);


  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
    setCountResult(null);
  };

  const fetchCount = async () => {
    if (!selectedType) return;

    try {
      const res = await axios.get(`http://localhost:8800/api/category/count/${selectedType}`);
      setCountResult(res.data);
    } catch (err) {
      console.error('Greška pri preuzimanju:', err);
      setCountResult({ error: 'Došlo je do greške.' });
    }
  };

  return (
    <div className="p-4">
      <h3>Prebroj logove po tipu</h3>

      <div className="d-flex align-items-center gap-2 mb-3">
        <label htmlFor="logType">Odaberite tip loga:</label>
        <select
          id="logType"
          value={selectedType}
          onChange={handleSelectChange}
          className="p-2 border rounded mx-2"
        >
          <option value="">-- Izaberite --</option>
          <option value="ERROR">ERROR</option>
          <option value="WARNING">WARNING</option>
          <option value="INFO">INFO</option>
          <option value="DEBUG">DEBUG</option>
        </select>

        <button className="btn btn-primary" onClick={fetchCount} disabled={!selectedType}>
          Prebroj
        </button>
      </div>

      {countResult && (
        <div className="mt-3">
          <h5>Rezultat:</h5>
          <table className="table table-bordered text-white">
            <thead>
              <tr>
                <th>Tip loga</th>
                <th>Broj pojavljivanja</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(countResult).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAll;
