import { API_URL, API_KEY } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    pageSize: 10,
  },
  bookmarks: [],
};

const formatRecipe = data => {
  const {
    recipe: {
      id,
      title,
      publisher,
      source_url: sourceUrl,
      image_url: image,
      servings,
      cooking_time: cookingTime,
      ingredients,
      key,
    },
  } = data.data;
  return {
    id,
    title,
    publisher,
    sourceUrl,
    image,
    servings,
    ingredients,
    cookingTime,
    bookmarked: state.bookmarks.some(b => b.id === id),
    ...(key && { key }),
  };
};
export const loadRecipe = async recipeId => {
  try {
    const data = await AJAX(`${API_URL}/${recipeId}?key=${API_KEY}`);
    state.recipe = formatRecipe(data);
  } catch (err) {
    throw err;
  }
};

export const loadSearchresults = async query => {
  try {
    state.search.query = query;
    const res = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = res.data.recipes.map(
      ({ id, title, publisher, image_url, key }) => {
        return {
          id,
          title,
          publisher,
          image: image_url,
          ...(key && { key }),
        };
      }
    );
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.pageSize;
  const end = page * state.search.pageSize;
  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBoomark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};
export const deleteBoomark = function (id) {
  state.bookmarks.splice(
    state.bookmarks.findIndex(e => e.id == id),
    1
  );
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

export const getBookmarks = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
getBookmarks();

/**
 *
 * @param {*} newRecipe
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) {
          throw new Error('Wrong ingredients format');
        }
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = formatRecipe(data);
    addBoomark(state.recipe);
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};
