import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _msg = 'Recipe added successfully :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleShow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleShow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleShow.bind(this));
    this._overlay.addEventListener('click', this.toggleShow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      handler(Object.fromEntries(data));
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
