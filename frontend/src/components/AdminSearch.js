import React, { useEffect } from 'react';

const AdminSearch = () => {
  useEffect(() => {
    const searchInput = document.getElementById("search-input");

    const handleSearch = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll("table tbody tr");

      rows.forEach((row) => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchTerm) ? "" : "none";
      });
    };

    searchInput.addEventListener("keyup", handleSearch);

    return () => {
      searchInput.removeEventListener("keyup", handleSearch);
    };
  }, []);

  return (
    <div className="group">
      <i className="bi bi-search"></i>
      <input id="search-input" type="search" name="search" placeholder="Pretraga..." />
    </div>
  );
};

export default AdminSearch;