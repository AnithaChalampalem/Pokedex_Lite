import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import Pagination from './components/Pagination';
import LoadingGrid from './components/LoadingGrid';
import { getPokemonId, loadFavorites, saveFavorites } from './utils/ImageLoader';
import './App.css';

const PAGE_SIZE = 20;
const TOTAL_POKEMON = 1025;

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [typeMap, setTypeMap] = useState({});
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}&offset=0`)
      .then(r => r.json())
      .then(data => {
        const list = data.results.map(p => ({
          name: p.name,
          id: getPokemonId(p.url),
        }));
        setAllPokemon(list);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allPokemon.length === 0) return;

    const typeNames = [
      'normal','fire','water','electric','grass','ice',
      'fighting','poison','ground','flying','psychic','bug',
      'rock','ghost','dragon','dark','steel','fairy'
    ];

    async function fetchAllTypes() {
      setLoadingTypes(true);
      try {
        const results = await Promise.all(
          typeNames.map(t =>
            fetch(`https://pokeapi.co/api/v2/type/${t}`)
              .then(r => r.json())
              .catch(() => null)
          )
        );
        const map = {};
        results.forEach((data, i) => {
          if (!data) return;
          data.pokemon.forEach(p => {
            const id = getPokemonId(p.pokemon.url);
            if (!map[id]) map[id] = [];
            map[id].push(typeNames[i]);
          });
        });
        setTypeMap(map);
      } catch {
        // ignore
      }
      setLoadingTypes(false);
    }

    fetchAllTypes();
  }, [allPokemon]);

  const enrichedPokemon = useMemo(() => {
    return allPokemon.map(p => ({
      ...p,
      types: typeMap[p.id] || [],
    }));
  }, [allPokemon, typeMap]);

  const filteredPokemon = useMemo(() => {
    let list = enrichedPokemon;

    if (showFavoritesOnly) {
      list = list.filter(p => favorites.includes(p.id));
    }

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      list = list.filter(p =>
        p.name.includes(q) || String(p.id).includes(q)
      );
    }

    if (selectedTypes.length > 0) {
      list = list.filter(p =>
        selectedTypes.every(t => p.types.includes(t))
      );
    }

    return list;
  }, [enrichedPokemon, searchText, selectedTypes, favorites, showFavoritesOnly]);

  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / PAGE_SIZE));

  const currentPagePokemon = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPokemon.slice(start, start + PAGE_SIZE);
  }, [filteredPokemon, currentPage]);

  function handleSearchChange(text) {
    setSearchText(text);
    setCurrentPage(1);
  }

  function handleTypeToggle(type) {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  }

  function handleClearTypes() {
    setSelectedTypes([]);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleToggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      saveFavorites(next);
      return next;
    });
  }, []);

  function handleToggleFavoritesView() {
    setShowFavoritesOnly(prev => !prev);
    setCurrentPage(1);
  }

  return (
    <div className="app">
      <Header
        searchText={searchText}
        onSearchChange={handleSearchChange}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={handleToggleFavoritesView}
      />

      <main className="main-content">
        <TypeFilter
          selectedTypes={selectedTypes}
          onTypeToggle={handleTypeToggle}
          onClearTypes={handleClearTypes}
        />

        {error ? (
          <div className="error-state">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            <h3>Failed to load Pokémon</h3>
            <p>Please check your internet connection and reload the page.</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : loading ? (
          <LoadingGrid />
        ) : (
          <>
            <div className="results-bar">
              <span className="results-count">
                {filteredPokemon.length === 0
                  ? 'No Pokémon found'
                  : `${filteredPokemon.length} Pokémon`}
                {loadingTypes && (
                  <span className="types-loading-note"> · loading types...</span>
                )}
              </span>
              {filteredPokemon.length > 0 && (
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>

            {filteredPokemon.length === 0 ? (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <h3>No Pokémon found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="pokemon-grid">
                {currentPagePokemon.map(pokemon => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    isFavorite={favorites.includes(pokemon.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onClick={setSelectedPokemon}
                  />
                ))}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

export default App;
