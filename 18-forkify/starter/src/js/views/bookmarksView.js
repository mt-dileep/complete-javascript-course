import View from './View';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No Bookmarks yet, find a recipe to bookmark ;)';

  _generateMarkup() {
    return this._data.map(rec => previewView.render(rec, false)).join('');
  }
  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
