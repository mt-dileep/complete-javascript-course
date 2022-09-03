import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  loadRecipe,
  loadSearchresults,
  state,
  getSearchResults,
  updateServings,
  addBoomark,
  deleteBoomark,
  uploadRecipe,
} from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import ResultsView from './views/ResultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

const showRecipe = async () => {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;
    recipeView.renderSpinner();
    ResultsView.update(getSearchResults());

    const { bookmarks } = state;
    bookmarksView.update(bookmarks);
    //1 loading
    await loadRecipe(recipeId);
    const { recipe } = state;
    // 2 rendering
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const loadSearchResults = async () => {
  try {
    ResultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await loadSearchresults(query);
    ResultsView.render(state.search.results);
    ResultsView.render(getSearchResults());
    paginationView.render(state.search);
  } catch (error) {
    console.log('err', error);
  }
};

const paginationControl = gotoPage => {
  ResultsView.render(getSearchResults(gotoPage));
  paginationView.render(state.search);
};

const controlServings = function (newServings) {
  updateServings(newServings);
  const { recipe } = state;
  recipeView.update(recipe);
};

const controlBookmark = function () {
  const { recipe, bookmarks } = state;
  if (!recipe.bookmarked) addBoomark(recipe);
  else deleteBoomark(recipe.id);
  recipeView.update(recipe);
  bookmarksView.render(bookmarks);
};

const controlBookmarkRender = function () {
  bookmarksView.render(state.bookmarks);
};

const controlAddRecipe = async function (recipe) {
  try {
    addRecipeView.renderSpinner();

    await uploadRecipe(recipe);

    recipeView.render(state.recipe);

    addRecipeView.renderMsg();

    bookmarksView.render(state.bookmarks);

    window.history.pushState(null, '', `#${state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleShow();
    }, 2500);
  } catch (e) {
    addRecipeView.renderError(e.message);
  }
};

const init = () => {
  bookmarksView.addHandlerBookmark(controlBookmarkRender);
  recipeView.addEventListener(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(loadSearchResults);
  paginationView.addHandlerClick(paginationControl);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
///////////////////////////////////////
