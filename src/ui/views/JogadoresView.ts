import { jogadorService } from '@domain/jogadores/JogadorService';
import { Button } from '@ui/components/Button';
import { PlayerTag } from '@ui/components/PlayerTag';
import type { Jogador } from '@config/types';

export class JogadoresView {
  static async render(container: HTMLElement): Promise<void> {
    const view = document.createElement('div');
    view.style.cssText = `
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    `;

    view.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h1 style="margin: 0; font-size: 28px;">Jogadores</h1>
        <button id="btn-adicionar-jogador" style="
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        ">Adicionar</button>
      </div>

      <div style="margin-bottom: 16px;">
        <input type="text" id="search-jogador" placeholder="Buscar jogador..." style="
          width: 100%;
          max-width: 400px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        " />
      </div>

      <div id="jogadores-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;"></div>
    `;

    container.appendChild(view);

    const btnAdicionar = view.querySelector('#btn-adicionar-jogador') as HTMLButtonElement;
    btnAdicionar.addEventListener('click', () => this.abrirModal());

    const searchInput = view.querySelector('#search-jogador') as HTMLInputElement;
    searchInput.addEventListener('input', async () => {
      await this.carregarJogadores(view, searchInput.value);
    });

    await this.carregarJogadores(view);
  }

  private static async carregarJogadores(container: HTMLElement, filtro: string = ''): Promise<void> {
    try {
      let jogadores = await jogadorService.listar();

      if (filtro.trim()) {
        jogadores = jogadores.filter((j) => j.nome.toLowerCase().includes(filtro.toLowerCase()));
      }

      const jogadoresContainer = container.querySelector('#jogadores-container') as HTMLElement;

      if (jogadores.length === 0) {
        jogadoresContainer.innerHTML = '<p style="grid-column: 1/-1;">Nenhum jogador encontrado.</p>';
        return;
      }

      jogadoresContainer.innerHTML = '';
      for (const jogador of jogadores) {
        const card = this.criarCartaoJogador(jogador);
        jogadoresContainer.appendChild(card);
      }
    } catch (error) {
      console.error('Erro ao carregar jogadores:', error);
    }
  }

  private static criarCartaoJogador(jogador: Jogador): HTMLElement {
    const card = document.createElement('div');
    card.style.cssText = `
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
    `;

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
      card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    });

    const header = document.createElement('div');
    header.style.cssText = `
      padding: 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      gap: 12px;
    `;

    if (jogador.fotoUrl) {
      const foto = document.createElement('img');
      foto.src = jogador.fotoUrl;
      foto.style.cssText = `
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
      `;
      header.appendChild(foto);
    } else {
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #999;
      `;
      placeholder.textContent = '👤';
      header.appendChild(placeholder);
    }

    const headerContent = document.createElement('div');
    headerContent.style.cssText = `
      flex: 1;
    `;

    const nome = document.createElement('div');
    nome.style.cssText = `
      font-weight: 600;
      font-size: 16px;
    `;
    nome.textContent = jogador.nome;
    headerContent.appendChild(nome);

    if (jogador.email) {
      const email = document.createElement('div');
      email.style.cssText = `
        font-size: 12px;
        color: #666;
      `;
      email.textContent = jogador.email;
      headerContent.appendChild(email);
    }

    header.appendChild(headerContent);

    if (jogador.master) {
      const masterBadge = document.createElement('div');
      masterBadge.style.cssText = `
        background: #ffc107;
        color: #333;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
      `;
      masterBadge.textContent = '👑 Master';
      header.appendChild(masterBadge);
    }

    const content = document.createElement('div');
    content.style.cssText = `
      padding: 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;

    const idInfo = document.createElement('div');
    idInfo.style.cssText = `
      font-size: 12px;
      color: #666;
      word-break: break-all;
    `;
    idInfo.innerHTML = `<strong>ID:</strong> ${jogador.id}`;
    content.appendChild(idInfo);

    const buttons = document.createElement('div');
    buttons.style.cssText = `
      display: flex;
      gap: 8px;
      margin-top: auto;
    `;

    const btnEditar = Button.create({
      text: 'Editar',
      onClick: () => this.abrirModalEdicao(jogador),
      variant: 'primary',
      size: 'sm',
      fullWidth: true,
    });
    buttons.appendChild(btnEditar);

    const btnDeletar = Button.create({
      text: 'Deletar',
      onClick: () => this.deletarJogador(jogador.id),
      variant: 'danger',
      size: 'sm',
      fullWidth: true,
    });
    buttons.appendChild(btnDeletar);

    content.appendChild(buttons);
    card.appendChild(header);
    card.appendChild(content);

    return card;
  }

  private static abrirModal(): void {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 24px;
      max-width: 400px;
      width: 90%;
    `;

    content.innerHTML = `
      <h2 style="margin-top: 0;">Adicionar Jogador</h2>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-weight: 500; margin-bottom: 8px;">Nome:</label>
        <input type="text" id="input-nome" placeholder="Nome do jogador" style="
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        " />
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-weight: 500; margin-bottom: 8px;">Email:</label>
        <input type="email" id="input-email" placeholder="Email do jogador" style="
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        " />
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" id="chk-master" style="cursor: pointer;" />
          <span>Marcar como Master</span>
        </label>
      </div>

      <div style="display: flex; gap: 8px;">
        <button id="btn-criar-modal" style="
          flex: 1;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px;
          cursor: pointer;
          font-weight: 500;
        ">Adicionar</button>
        <button id="btn-cancelar-modal" style="
          flex: 1;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px;
          cursor: pointer;
          font-weight: 500;
        ">Cancelar</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    const btnCriar = content.querySelector('#btn-criar-modal') as HTMLButtonElement;
    btnCriar.addEventListener('click', async () => {
      const nome = (content.querySelector('#input-nome') as HTMLInputElement).value;
      const email = (content.querySelector('#input-email') as HTMLInputElement).value;
      const master = (content.querySelector('#chk-master') as HTMLInputElement).checked;

      if (!nome.trim()) {
        alert('Digite o nome do jogador');
        return;
      }

      try {
        await jogadorService.criar(nome, email || undefined, master);
        modal.remove();
        location.reload();
      } catch (error) {
        console.error('Erro ao criar jogador:', error);
        alert('Erro ao criar jogador');
      }
    });

    const btnCancelar = content.querySelector('#btn-cancelar-modal') as HTMLButtonElement;
    btnCancelar.addEventListener('click', () => {
      modal.remove();
    });
  }

  private static abrirModalEdicao(jogador: Jogador): void {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 24px;
      max-width: 400px;
      width: 90%;
    `;

    content.innerHTML = `
      <h2 style="margin-top: 0;">Editar Jogador</h2>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-weight: 500; margin-bottom: 8px;">Master:</label>
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" id="chk-master" ${jogador.master ? 'checked' : ''} style="cursor: pointer;" />
          <span>Marcar como Master</span>
        </label>
      </div>

      <div style="display: flex; gap: 8px;">
        <button id="btn-salvar-modal" style="
          flex: 1;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px;
          cursor: pointer;
          font-weight: 500;
        ">Salvar</button>
        <button id="btn-cancelar-modal" style="
          flex: 1;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px;
          cursor: pointer;
          font-weight: 500;
        ">Cancelar</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    const btnSalvar = content.querySelector('#btn-salvar-modal') as HTMLButtonElement;
    btnSalvar.addEventListener('click', async () => {
      const master = (content.querySelector('#chk-master') as HTMLInputElement).checked;

      try {
        await jogadorService.marcarMaster(jogador.id, master);
        modal.remove();
        location.reload();
      } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        alert('Erro ao atualizar jogador');
      }
    });

    const btnCancelar = content.querySelector('#btn-cancelar-modal') as HTMLButtonElement;
    btnCancelar.addEventListener('click', () => {
      modal.remove();
    });
  }

  private static async deletarJogador(id: string): Promise<void> {
    if (!confirm('Tem certeza que deseja deletar este jogador?')) return;

    try {
      await jogadorService.deletar(id);
      location.reload();
    } catch (error) {
      console.error('Erro ao deletar jogador:', error);
      alert('Erro ao deletar jogador');
    }
  }
}
