import React, { useState } from 'react';
import axios from 'axios';

const AdminLogSearch = () => {
  const [filters, setFilters] = useState({
    type: '',
    searchText: '',
    from: '',
    to: '',
    sort: 'asc',
    limit: 10,
    offset: 0
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get('http://localhost:8800/api/logs/search', {
        params: filters
      });
      setResults(res.data);
    } catch (err) {
      console.error('Greška pri pretrazi logova:', err);
    }
  };

  return (
    <div className="p-4 text-white">
      <h3>Pretraga logova</h3>

      <div className="d-flex flex-column gap-2">
        <input name="searchText" onChange={handleChange} placeholder="Tekstualna pretraga" />
        <select name="type" onChange={handleChange}>
          <option value="">-- Tip loga --</option>
          <option value="ERROR">ERROR</option>
          <option value="WARNING">WARNING</option>
          <option value="INFO">INFO</option>
          <option value="DEBUG">DEBUG</option>
        </select>
        <label>Od:</label>
        <input name="from" type="datetime-local" onChange={handleChange} />
        <label>Do:</label>
        <input name="to" type="datetime-local" onChange={handleChange} />
        <label>Sortiranje:</label>
        <select name="sort" onChange={handleChange}>
          <option value="asc">Rastuće</option>
          <option value="desc">Opadajuće</option>
        </select>
        <input name="limit" type="number" onChange={handleChange} placeholder="Limit" />
        <input name="offset" type="number" onChange={handleChange} placeholder="Offset" />
        <button onClick={handleSearch} className="btn btn-success">Pretraži</button>
      </div>

      <h4 className="mt-4">Rezultati:</h4>
      <ul style={{color: "black"}}>
        {results.map((log, i) => (
          <li key={i}>{log.timestamp} | {log.level} | {log.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLogSearch;
