export const typeColors = {
  normal: { bg: '#f5f0eb', text: '#6b6359', border: '#d4c9bc' },
  fire: { bg: '#fff0e6', text: '#c44d00', border: '#ffb380' },
  water: { bg: '#e6f2ff', text: '#0066cc', border: '#80c0ff' },
  electric: { bg: '#fffbe6', text: '#b38600', border: '#ffe066' },
  grass: { bg: '#edfaed', text: '#2e7d32', border: '#81c784' },
  ice: { bg: '#e6fbff', text: '#00838f', border: '#80deea' },
  fighting: { bg: '#ffeee6', text: '#bf360c', border: '#ffab91' },
  poison: { bg: '#f5e6ff', text: '#6a1b9a', border: '#ce93d8' },
  ground: { bg: '#faf0e6', text: '#795548', border: '#d7b896' },
  flying: { bg: '#eef2ff', text: '#3949ab', border: '#9fa8da' },
  psychic: { bg: '#ffe6f2', text: '#c2185b', border: '#f48fb1' },
  bug: { bg: '#f2fae6', text: '#558b2f', border: '#aed581' },
  rock: { bg: '#f5f0e6', text: '#5d4037', border: '#bcaaa4' },
  ghost: { bg: '#ede6ff', text: '#4527a0', border: '#b39ddb' },
  dragon: { bg: '#e6ecff', text: '#1a237e', border: '#7986cb' },
  dark: { bg: '#ede8e3', text: '#37474f', border: '#90a4ae' },
  steel: { bg: '#eff2f5', text: '#455a64', border: '#b0bec5' },
  fairy: { bg: '#ffe6f5', text: '#ad1457', border: '#f48fb1' },
};

export function getTypeStyle(typeName) {
  return typeColors[typeName] || { bg: '#f5f5f5', text: '#555', border: '#ccc' };
}

export const allTypes = Object.keys(typeColors);
