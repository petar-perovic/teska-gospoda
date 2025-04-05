import React, { useState } from 'react';
import axios from 'axios';

const AdminFive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8800/api/drugi/zad2');
      setData(res.data.final_list || []);
    } catch (err) {
      console.error('Greška pri dohvaćanju statistike:', err);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h3>Statistika po fajlovima</h3>
      <button className="btn btn-primary mb-3" onClick={handleFetch} disabled={loading}>
        {loading ? 'Učitavanje...' : 'Pretraži'}
      </button>

      {data.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-white">
            <thead className="thead-dark">
              <tr>
                <th>Fajl</th>
                <th>Score</th>
                <th>Broj linija</th>
                <th>Error</th>
                <th>Warning</th>
                <th>Info</th>
                <th>Debug</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.file_name}</td>
                  <td>{item.score.toLocaleString()}</td>
                  <td>{item.no_line.toLocaleString()}</td>
                  <td style={{ color: 'red' }}>{item.error}</td>
                  <td style={{ color: 'orange' }}>{item.warning}</td>
                  <td style={{ color: 'lightblue' }}>{item.info}</td>
                  <td style={{ color: 'limegreen' }}>{item.debug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-muted">Nema rezultata za prikaz.</p>
      )}
    </div>
  );
};

export default AdminFive;
