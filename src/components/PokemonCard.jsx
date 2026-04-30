import { useState } from 'react';
import { capitalize, getSpriteUrl } from '../utils/ImageLoader';
import { getTypeStyle } from '../utils/Colors';

function PokemonCard({ pokemon, isFavorite, onToggleFavorite, onClick }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const spriteUrl = getSpriteUrl(pokemon.id);
  const mainType = pokemon.types[0];
  const typeStyle = getTypeStyle(mainType);

  function handleFavClick(e) {
    e.stopPropagation();
    onToggleFavorite(pokemon.id);
  }

  return (
    <div
      className="pokemon-card"
      onClick={() => onClick(pokemon)}
      style={{ '--card-bg': typeStyle.bg, '--card-border': typeStyle.border }}
    >
      <button
        className={`card-fav-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={handleFavClick}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
      

        <span style={{color:`${isFavorite ? '#e53e3e' : '#0c0c0c'}`, fontSize:'14px'}}>&hearts;</span>
      </button>

      <div className="card-img-wrap">
        {!imgLoaded && !imgError && <div className="img-skeleton" />}
        {!imgError ? (
          <img
            src={spriteUrl}
            alt={pokemon.name}
            className={`card-img ${imgLoaded ? 'loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true); }}
          />
        ) : (
          <div className="img-fallback">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2C6.477 2 2 6.477 2 12"/>
            </svg>
          </div>
        )}
      </div>

      <div className="card-body">
        <span className="card-number">#{String(pokemon.id).padStart(3, '0')}</span>
        <h3 className="card-name">{capitalize(pokemon.name)}</h3>
        <div className="card-types">
          {pokemon.types.map(t => {
            const s = getTypeStyle(t);
            return (
              <span
                key={t}
                className="type-badge"
                style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
              >
                {capitalize(t)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
