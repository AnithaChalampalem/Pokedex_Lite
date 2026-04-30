function LoadingGrid() {
  const skeletons = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="pokemon-grid">
      {skeletons.map(i => (
        <div key={i} className="pokemon-card skeleton-card">
          <div className="skeleton-img" />
          <div className="card-body">
            <div className="skeleton-line short" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line thin" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingGrid;
