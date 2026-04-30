

# Pokédex App

This is a simple Pokédex application built using React and Vite. The app allows users to browse Pokémon, search by name, and mark their favorites. Favorite selections are saved in local storage so they persist even after refreshing the page.

---

## Installation & Running the App

1. Clone the repository:

```
git clone <your-repo-url>
cd vite-react-starter
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open your browser and go to:

```
http://localhost:5173/
```

---

## Technologies Used

* **React (v18)**
  Used for building the UI with reusable components and managing state using hooks like `useState`.

* **Vite**
  Used as the build tool and development server. It is fast and provides instant hot reloading, which improves development speed.

* **Pure CSS**
  Styling is done using plain CSS instead of frameworks to keep the app lightweight and fully customizable.

* **ESLint**
  Helps maintain clean and consistent code.

* **PokeAPI**
  Used to fetch Pokémon data such as names, stats, and images.

---

## Features

* Search Pokémon by name
* Add/remove Pokémon to favorites
* Favorites stored using localStorage
* Display Pokémon stats with formatted labels
* Type-based color styling
* Responsive and clean UI

---

## Utility Functions

Some helper functions are used to simplify logic:

* `capitalize()` – capitalizes the first letter of a string
* `getPokemonId()` – extracts Pokémon ID from API URL
* `getSpriteUrl()` – returns official artwork image
* `getSmallSpriteUrl()` – returns smaller sprite
* `formatStatName()` – formats stat names (e.g., "hp" → "HP")
* `getTypeStyle()` – returns colors based on Pokémon type

---

## Challenges Faced

**1. Extracting Pokémon ID from URL**
The API provides a full URL instead of a direct ID. This was handled by splitting the URL string and taking the last value.

**2. Saving Favorites**
Keeping favorites after refresh required using localStorage. Error handling was added using try/catch to avoid crashes.

**3. Handling Empty or Invalid Data**
Some values could be undefined, so checks were added to prevent UI errors.

**4. Dynamic Styling Based on Type**
Each Pokémon type has different colors. This was handled using a centralized object that maps types to styles.

**5. Improving Search Experience**
Implemented a controlled input field with a clear button and focus styles for better usability.

---
