import { useState } from 'react';

function Header({ searchText, onSearchChange, favoritesCount, showFavoritesOnly, onToggleFavorites }) {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
      
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/330px-International_Pok%C3%A9mon_logo.svg.png" width="100px"/>
        </div>

        <div className="header-controls">
          <div className={`search-box ${inputFocused ? 'focused' : ''}`}>
            <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchText}
              onChange={e => onSearchChange(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="search-input"
            />
            {searchText && (
              <button className="clear-btn" onClick={() => onSearchChange('')} title="Clear">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          <button
            className={`favorites-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={onToggleFavorites}
            title={showFavoritesOnly ? 'Show all' : 'Show favorites'}
          >
           &hearts;
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="fav-badge">{favoritesCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
