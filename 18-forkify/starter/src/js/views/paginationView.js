import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currPage = this._data.page;
    const numOfPage = Math.ceil(
      this._data.results.length / this._data.pageSize
    );
    console.log('pp, ', currPage, numOfPage);
    // 1page and more
    if (currPage === 1 && numOfPage > 1) {
      return `<button data-page="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // last page
    if (currPage === numOfPage && numOfPage > 1 && currPage > 1) {
      return `<button data-page="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>`;
    }
    if (currPage > 1 && currPage < numOfPage) {
      return ` <button data-page="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
      <button data-page="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    return '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const pageNum = +btn.dataset.page;
      console.log('page num : ', pageNum);
      handler(pageNum);
    });
  }
}

export default new PaginationView();
