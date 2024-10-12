import React from 'react';
import styles from './sidebar.module.css'; 

function Sidebar({ setSelectedCategory }) {
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles['sidebar-container']}>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className={styles['sidebar-button']}
            data-bs-toggle="collapse"
            data-bs-target="#collections-collapse"
            aria-expanded="false"
          >
            COLLECTIONS
            <span className="ms-2">
              <i className="bi bi-chevron-down"></i>
            </span>
          </button>

          <div className="collapse" id="collections-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <input
                  type="radio"
                  id="topwear"
                  name="category"
                  onChange={() => handleCategoryChange('topwear')}
                />
                <label htmlFor="topwear" className={styles['collapse-label']} style={{fontFamily:'Futura, sansSerif',marginBottom:'0.2rem',marginLeft:'0.2rem'}}>
                  TOPWEAR
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="bottomwear"
                  name="category"
                  onChange={() => handleCategoryChange('bottomwear')}
                />
                <label htmlFor="bottomwear" className={styles['collapse-label'] }style={{fontFamily:'Futura, sansSerif',marginLeft:'0.2rem'}}>
                  BOTTOMWEAR
                </label>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
