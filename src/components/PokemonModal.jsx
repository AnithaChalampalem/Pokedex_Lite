import { useState, useEffect } from 'react';
import { capitalize, getSpriteUrl, formatStatName } from '../utils/ImageLoader';
import { getTypeStyle } from '../utils/Colors';

function StatBar({ name, value }) {
  const pct = Math.min((value / 200) * 100, 100);
  const color = value >= 80 ? '#2e7d32' : value >= 50 ? '#f57f17' : '#c62828';
  return (
    <div className="stat-row">
      <span className="stat-name">{formatStatName(name)}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-bar-bg">
        <div className="stat-bar-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function PokemonModal({ pokemon, isFavorite, onToggleFavorite, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    if (!pokemon) return;
    setLoading(true);
    setError(false);
    setDetail(null);
    setImgLoaded(false);
    setActiveTab('stats');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then(r => r.json())
      .then(data => {
        setDetail(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [pokemon]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!pokemon) return null;

  const mainType = pokemon.types[0];
  const typeStyle = getTypeStyle(mainType);
  const spriteUrl = getSpriteUrl(pokemon.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        style={{ '--modal-accent': typeStyle.border, '--modal-bg': typeStyle.bg }}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="modal-hero" style={{ backgroundColor: typeStyle.bg }}>
          <div className="modal-img-wrap">
            {!imgLoaded && <div className="modal-img-skeleton" />}
            <img
              src={spriteUrl}
              alt={pokemon.name}
              className={`modal-img ${imgLoaded ? 'loaded' : ''}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
            />
          </div>
          <div className="modal-hero-info">
            <span className="modal-number">#{String(pokemon.id).padStart(3, '0')}</span>
            <h2 className="modal-name">{capitalize(pokemon.name)}</h2>
            <div className="modal-types">
              {pokemon.types.map(t => {
                const s = getTypeStyle(t);
                return (
                  <span key={t} className="type-badge" style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}>
                    {capitalize(t)}
                  </span>
                );
              })}
            </div>
            <button
              className={`modal-fav-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={() => onToggleFavorite(pokemon.id)}
            >
                 <span style={{color:`${isFavorite ? '#e53e3e' : '#0c0c0c'}`, fontSize:'14px'}}>&hearts;</span>
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        </div>

        {loading && (
          <div className="modal-loading">
            <div className="spinner" />
            <span>Loading details...</span>
          </div>
        )}

        {error && (
          <div className="modal-error">Could not load Pokémon details.</div>
        )}

        {!loading && !error && detail && (
          <div className="modal-content">
            {detail.height && (
              <div className="modal-quick-stats">
                <div className="quick-stat">
                  <span className="qs-label">Height</span>
                  <span className="qs-value">{(detail.height / 10).toFixed(1)} m</span>
                </div>
                <div className="quick-stat">
                  <span className="qs-label">Weight</span>
                  <span className="qs-value">{(detail.weight / 10).toFixed(1)} kg</span>
                </div>
                <div className="quick-stat">
                  <span className="qs-label">Base Exp</span>
                  <span className="qs-value">{detail.base_experience || '—'}</span>
                </div>
              </div>
            )}

            <div className="modal-tabs">
              <button
                className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
              >
                Base Stats
              </button>
              <button
                className={`tab-btn ${activeTab === 'abilities' ? 'active' : ''}`}
                onClick={() => setActiveTab('abilities')}
              >
                Abilities
              </button>
              <button
                className={`tab-btn ${activeTab === 'moves' ? 'active' : ''}`}
                onClick={() => setActiveTab('moves')}
              >
                Moves
              </button>
            </div>

            {activeTab === 'stats' && (
              <div className="tab-panel">
                {detail.stats.map(s => (
                  <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
                ))}
              </div>
            )}

            {activeTab === 'abilities' && (
              <div className="tab-panel abilities-panel">
                {detail.abilities.map(a => (
                  <div key={a.ability.name} className="ability-chip">
                    <span className="ability-name">{capitalize(a.ability.name.replace('-', ' '))}</span>
                    {a.is_hidden && <span className="hidden-badge">Hidden</span>}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'moves' && (
              <div className="tab-panel moves-panel">
                {detail.moves.slice(0, 20).map(m => (
                  <span key={m.move.name} className="move-chip">
                    {capitalize(m.move.name.replace('-', ' '))}
                  </span>
                ))}
                {detail.moves.length > 20 && (
                  <span className="more-moves">+{detail.moves.length - 20} more</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonModal;
