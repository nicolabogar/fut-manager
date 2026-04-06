import type { Jogador, ClubePadrao, SelecaoPadrao } from '@config/types';

export interface SelectOption {
  id: string;
  nome: string;
  icon?: string;
  bandeira?: string;
  logo?: string;
}

export class SearchableSelect {
  private container: HTMLElement;
  private options: SelectOption[];
  private selectedIds: Set<string> = new Set();
  private searchQuery: string = '';
  private onSelectionChange: (ids: string[]) => void = () => {};
  private multiple: boolean = true;
  private maxSelections?: number;

  constructor(
    container: HTMLElement,
    options: SelectOption[],
    config: {
      multiple?: boolean;
      maxSelections?: number;
      onSelectionChange?: (ids: string[]) => void;
    } = {}
  ) {
    this.container = container;
    this.options = options;
    this.multiple = config.multiple ?? true;
    this.maxSelections = config.maxSelections;
    this.onSelectionChange = config.onSelectionChange || (() => {});
    this.render();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="searchable-select" style="position: relative;">
        <div class="search-input-container" style="margin-bottom: 12px;">
          <input
            type="text"
            class="search-input"
            placeholder="Buscar jogador ou time..."
            style="
              width: 100%;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 14px;
            "
          />
        </div>
        <div class="selected-tags" style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
        </div>
        <div class="options-list" style="
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        "></div>
      </div>
    `;

    const searchInput = this.container.querySelector('.search-input') as HTMLInputElement;
    const optionsList = this.container.querySelector('.options-list') as HTMLElement;

    searchInput.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
      this.renderOptions(optionsList);
    });

    this.renderOptions(optionsList);
    this.renderTags();
  }

  private renderOptions(optionsList: HTMLElement): void {
    const filtered = this.options.filter((opt) =>
      opt.nome.toLowerCase().includes(this.searchQuery)
    );

    optionsList.innerHTML = filtered
      .map(
        (opt) => `
      <div class="option-item" data-id="${opt.id}" style="
        padding: 12px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background 0.2s;
      ">
        <input
          type="${this.multiple ? 'checkbox' : 'radio'}"
          ${this.selectedIds.has(opt.id) ? 'checked' : ''}
          style="cursor: pointer;"
        />
        ${opt.bandeira ? `<span>${opt.bandeira}</span>` : ''}
        ${opt.logo ? `<span>${opt.logo}</span>` : ''}
        <span>${opt.nome}</span>
      </div>
    `
      )
      .join('');

    this.container.querySelectorAll('.option-item').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        (item as HTMLElement).style.background = '#f5f5f5';
      });
      item.addEventListener('mouseleave', () => {
        (item as HTMLElement).style.background = 'transparent';
      });
      item.addEventListener('click', () => this.toggleSelection(item as HTMLElement));
    });
  }

  private toggleSelection(item: HTMLElement): void {
    const id = item.dataset.id!;
    const isChecked = (item.querySelector('input') as HTMLInputElement).checked;

    if (!this.multiple) {
      this.selectedIds.clear();
      if (!isChecked) {
        this.selectedIds.add(id);
      }
    } else {
      if (isChecked) {
        this.selectedIds.delete(id);
      } else {
        if (this.maxSelections && this.selectedIds.size >= this.maxSelections) {
          return;
        }
        this.selectedIds.add(id);
      }
    }

    this.renderTags();
    this.renderOptions(this.container.querySelector('.options-list') as HTMLElement);
    this.onSelectionChange(Array.from(this.selectedIds));
  }

  private renderTags(): void {
    const tagsContainer = this.container.querySelector('.selected-tags') as HTMLElement;
    const selected = this.options.filter((opt) => this.selectedIds.has(opt.id));

    tagsContainer.innerHTML = selected
      .map(
        (opt) => `
      <div class="tag" data-id="${opt.id}" style="
        background: #007bff;
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
      ">
        ${opt.bandeira ? `<span>${opt.bandeira}</span>` : ''}
        ${opt.logo ? `<span>${opt.logo}</span>` : ''}
        <span>${opt.nome}</span>
        <button class="remove-tag" style="
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 16px;
          padding: 0;
          line-height: 1;
        ">×</button>
      </div>
    `
      )
      .join('');

    this.container.querySelectorAll('.remove-tag').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tag = (btn as HTMLElement).closest('.tag') as HTMLElement;
        const id = tag.dataset.id!;
        this.selectedIds.delete(id);
        this.renderTags();
        this.renderOptions(this.container.querySelector('.options-list') as HTMLElement);
        this.onSelectionChange(Array.from(this.selectedIds));
      });
    });
  }

  getSelectedIds(): string[] {
    return Array.from(this.selectedIds);
  }

  setSelectedIds(ids: string[]): void {
    this.selectedIds = new Set(ids);
    this.render();
  }

  reset(): void {
    this.selectedIds.clear();
    this.searchQuery = '';
    this.render();
  }
}
