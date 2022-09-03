import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipe found, please try again ;)';

  _generateMarkup() {
    return this._data.map(rec => previewView.render(rec, false)).join('');
  }
}

export default new ResultsView();
