import { jogadorService } from '@domain/jogadores/JogadorService';
import type { Jogador } from '@config/types';

export class SearchablePlayerSelect {
  private container: HTMLElement;
  private selectedJogadores: Jogador[] = [];
  private allJogadores: Jogador[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
  }

  async render(): Promise<void> {
    // Carregar todos os jogadores
    this.allJogadores = await jogadorService.listar();

    this.container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Selecione Jogadores</label>
        <input type="text"
          id="search-input"
          placeholder="Buscar jogador..."
          style="
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 8px;
            font-size: 14px;
          "
        />
        <div id="jogadores-dropdown" style="
          border: 1px solid #ddd;
          border-radius: 4px;
          max-height: 200px;
          overflow-y: auto;
          background: white;
          display: none;
        "></div>
      </div>

      <div id="selected-jogadores" style="
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      "></div>
    `;

    const searchInput = this.container.querySelector('#search-input') as HTMLInputElement;
    const dropdown = this.container.querySelector('#jogadores-dropdown') as HTMLElement;

    // Atualizar dropdown ao digitar
    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();
      const filtered = this.allJogadores.filter((j) =>
        j.nome.toLowerCase().includes(query)
      );

      if (query && filtered.length > 0) {
        dropdown.style.display = 'block';
        dropdown.innerHTML = filtered
          .map(
            (j) => `
          <div data-id="${j.id}" style="
            padding: 12px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.2s;
          " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
            ${j.nome}
          </div>
        `
          )
          .join('');

        dropdown.querySelectorAll('div').forEach((item) => {
          item.addEventListener('click', () => {
            const id = item.dataset.id;
            const jogador = this.allJogadores.find((j) => j.id === id);
            if (jogador && !this.selectedJogadores.find((j) => j.id === id)) {
              this.selectedJogadores.push(jogador);
              this.atualizarTags();
              searchInput.value = '';
              dropdown.style.display = 'none';
            }
          });
        });
      } else {
        dropdown.style.display = 'none';
      }
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target as Node)) {
        dropdown.style.display = 'none';
      }
    });

    this.atualizarTags();
  }

  private atualizarTags(): void {
    const container = this.container.querySelector('#selected-jogadores') as HTMLElement;
    container.innerHTML = this.selectedJogadores
      .map(
        (j) => `
      <div style="
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        background: #e7f3ff;
        border: 1px solid #007bff;
        border-radius: 16px;
        font-size: 14px;
      ">
        ${j.nome}
        <button data-id="${j.id}" style="
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 0;
          color: #007bff;
        ">×</button>
      </div>
    `
      )
      .join('');

    container.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        this.selectedJogadores = this.selectedJogadores.filter((j) => j.id !== id);
        this.atualizarTags();
      });
    });
  }

  getSelectedIds(): string[] {
    return this.selectedJogadores.map((j) => j.id);
  }

  getSelected(): Jogador[] {
    return this.selectedJogadores;
  }
}
