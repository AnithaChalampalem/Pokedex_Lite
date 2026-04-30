import { allTypes, getTypeStyle } from '../utils/Colors';
import { capitalize } from '../utils/ImageLoader';

function TypeFilter({ selectedTypes, onTypeToggle, onClearTypes }) {
  return (
    <div className="type-filter-section">
      <div className="type-filter-header">
        <span className="type-filter-label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filter by type
        </span>
        {selectedTypes.length > 0 && (
          <button className="clear-types-btn" onClick={onClearTypes}>
            Clear ({selectedTypes.length})
          </button>
        )}
      </div>
      <div className="type-chips">
        {allTypes.map(type => {
          const style = getTypeStyle(type);
          const active = selectedTypes.includes(type);
          return (
            <button
              key={type}
              className={`type-chip ${active ? 'active' : ''}`}
              onClick={() => onTypeToggle(type)}
              style={active ? {
                backgroundColor: style.bg,
                color: style.text,
                borderColor: style.border,
              } : {}}
            >
              {capitalize(type)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TypeFilter;
