import React from 'react';

function FilterBar({ search, setSearch, filter, setFilter }) {
  return (
    <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
      <input
        type="text"
        className="form-control mb-2 mb-md-0"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: '300px' }}
      />
      <div>
        <button className={`btn btn-outline-secondary me-2 ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn btn-outline-secondary me-2 ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
        <button className={`btn btn-outline-secondary ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
      </div>
    </div>
  );
}

export default FilterBar;
