import { rankingService } from '@domain/ranking/RankingService';
import { jogadorService } from '@domain/jogadores/JogadorService';
import { PlayerTag } from '@ui/components/PlayerTag';
import type { Estatistica, Jogador } from '@config/types';

export class RankingView {
  private static selectedJogadorId: string | null = null;
  private static selectedFiltroTipo: 'todos' | 'amistoso' | 'torneio' | 'dupla' = 'todos';
  private static selectedFiltroAdversario: string = '';

  static async render(container: HTMLElement): Promise<void> {
    const view = document.createElement('div');
    view.style.cssText = `
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    `;

    view.innerHTML = `
      <h1 style="margin-top: 0; font-size: 28px;">Ranking</h1>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
        <div id="ranking-list" style="background: white; border-radius: 8px; overflow: hidden; border: 1px solid #ddd;"></div>
        <div id="jogador-detalhes" style="background: white; border-radius: 8px; padding: 24px; border: 1px solid #ddd; display: none;">
          <h2 id="jogador-nome" style="margin-top: 0;"></h2>
          <div id="jogador-stats" style="margin-bottom: 24px;"></div>
          <div id="jogador-filters" style="margin-bottom: 16px;"></div>
          <div id="jogador-historico"></div>
        </div>
      </div>
    `;

    container.appendChild(view);

    await this.carregarRanking(view);
  }

  private static async carregarRanking(container: HTMLElement): Promise<void> {
    try {
      const estatisticas = await rankingService.getTodos();
      const rankingList = container.querySelector('#ranking-list') as HTMLElement;

      if (estatisticas.length === 0) {
        rankingList.innerHTML = '<p style="padding: 16px; text-align: center;">Nenhum jogador no ranking ainda.</p>';
        return;
      }

      rankingList.innerHTML = '';
      estatisticas.forEach((est, idx) => {
        const item = document.createElement('div');
        item.className = 'ranking-item';
        item.style.cssText = `
          padding: 16px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        `;

        item.addEventListener('mouseenter', () => {
          item.style.background = '#f5f5f5';
        });
        item.addEventListener('mouseleave', () => {
          item.style.background = 'transparent';
        });

        item.addEventListener('click', () => this.mostrarDetalhesJogador(container, est));

        const posicao = document.createElement('div');
        posicao.style.cssText = `
          font-weight: 700;
          font-size: 18px;
          color: #007bff;
          min-width: 30px;
          text-align: center;
        `;
        posicao.textContent = String(idx + 1);

        const info = document.createElement('div');
        info.style.cssText = `
          flex: 1;
        `;

        const nome = document.createElement('div');
        nome.style.cssText = `
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
        `;
        nome.textContent = est.nome;
        info.appendChild(nome);

        const stats = document.createElement('div');
        stats.style.cssText = `
          font-size: 12px;
          color: #666;
        `;
        stats.innerHTML = `
          ${est.vitorias}V ${est.empates}E ${est.derrotas}D | ${est.gp}GP ${est.gc}GC
        `;
        info.appendChild(stats);

        const pontos = document.createElement('div');
        pontos.style.cssText = `
          font-weight: 700;
          font-size: 16px;
          min-width: 50px;
          text-align: right;
        `;
        pontos.textContent = String(est.pontos);

        item.appendChild(posicao);
        item.appendChild(info);
        item.appendChild(pontos);
        rankingList.appendChild(item);
      });
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
    }
  }

  private static async mostrarDetalhesJogador(container: HTMLElement, est: Estatistica): Promise<void> {
    this.selectedJogadorId = est.jogadorId;
    this.selectedFiltroTipo = 'todos';
    this.selectedFiltroAdversario = '';

    const detalhesDiv = container.querySelector('#jogador-detalhes') as HTMLElement;
    detalhesDiv.style.display = 'block';

    const nomeH2 = container.querySelector('#jogador-nome') as HTMLElement;
    nomeH2.textContent = est.nome;

    this.renderizarStats(container, est);
    this.renderizarFiltros(container);
    await this.renderizarHistorico(container, est);
  }

  private static renderizarStats(container: HTMLElement, est: Estatistica): void {
    const statsDiv = container.querySelector('#jogador-stats') as HTMLElement;
    statsDiv.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div style="background: #e7f3ff; padding: 12px; border-radius: 4px; text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: #007bff;">${est.pontos}</div>
          <div style="font-size: 12px; color: #666;">Pontos</div>
        </div>
        <div style="background: #f0f0f0; padding: 12px; border-radius: 4px; text-align: center;">
          <div style="font-size: 24px; font-weight: 700;">${est.vitorias + est.empates + est.derrotas}</div>
          <div style="font-size: 12px; color: #666;">Jogos</div>
        </div>
        <div style="background: #d4edda; padding: 12px; border-radius: 4px; text-align: center;">
          <div style="font-size: 18px; font-weight: 700; color: #28a745;">${est.vitorias}</div>
          <div style="font-size: 12px; color: #666;">Vitórias</div>
        </div>
        <div style="background: #fff3cd; padding: 12px; border-radius: 4px; text-align: center;">
          <div style="font-size: 18px; font-weight: 700; color: #ffc107;">${est.empates}</div>
          <div style="font-size: 12px; color: #666;">Empates</div>
        </div>
        <div style="background: #f8d7da; padding: 12px; border-radius: 4px; text-align: center;">
          <div style="font-size: 18px; font-weight: 700; color: #dc3545;">${est.derrotas}</div>
          <div style="font-size: 12px; color: #666;">Derrotas</div>
        </div>
        <div style="background: #f0f0f0; padding: 12px; border-radius: 4px; text-align: center;">
          <div style="font-size: 18px; font-weight: 700;">${est.gp} - ${est.gc}</div>
          <div style="font-size: 12px; color: #666;">GP - GC</div>
        </div>
      </div>
    `;
  }

  private static renderizarFiltros(container: HTMLElement): void {
    const filtrosDiv = container.querySelector('#jogador-filters') as HTMLElement;
    filtrosDiv.innerHTML = `
      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: 500; margin-bottom: 8px;">Filtrar por Tipo:</label>
        <div style="display: flex; gap: 8px;">
          <button class="filter-btn" data-tipo="todos" style="
            padding: 6px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #007bff;
            color: white;
            cursor: pointer;
            font-size: 12px;
          ">Todos</button>
          <button class="filter-btn" data-tipo="amistoso" style="
            padding: 6px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: transparent;
            color: #333;
            cursor: pointer;
            font-size: 12px;
          ">Amistoso</button>
          <button class="filter-btn" data-tipo="torneio" style="
            padding: 6px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: transparent;
            color: #333;
            cursor: pointer;
            font-size: 12px;
          ">Torneio</button>
          <button class="filter-btn" data-tipo="dupla" style="
            padding: 6px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: transparent;
            color: #333;
            cursor: pointer;
            font-size: 12px;
          ">Dupla</button>
        </div>
      </div>

      <div>
        <label style="display: block; font-weight: 500; margin-bottom: 8px;">Buscar Adversário:</label>
        <input type="text" id="filter-adversario" placeholder="Nome do adversário" style="
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 12px;
          box-sizing: border-box;
        " />
      </div>
    `;

    container.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const tipo = (e.target as HTMLElement).dataset.tipo as string;
        this.selectedFiltroTipo = tipo as any;

        // Atualizar estilos
        container.querySelectorAll('.filter-btn').forEach((b) => {
          (b as HTMLElement).style.background = 'transparent';
          (b as HTMLElement).style.color = '#333';
        });
        (e.target as HTMLElement).style.background = '#007bff';
        (e.target as HTMLElement).style.color = 'white';

        await this.renderizarHistorico(container, {
          jogadorId: this.selectedJogadorId!,
          nome: (container.querySelector('#jogador-nome') as HTMLElement).textContent || '',
          vitorias: 0,
          empates: 0,
          derrotas: 0,
          gp: 0,
          gc: 0,
          pontos: 0,
        });
      });
    });

    const filterAdversario = container.querySelector('#filter-adversario') as HTMLInputElement;
    filterAdversario.addEventListener('change', async () => {
      this.selectedFiltroAdversario = filterAdversario.value;
      await this.renderizarHistorico(container, {
        jogadorId: this.selectedJogadorId!,
        nome: (container.querySelector('#jogador-nome') as HTMLElement).textContent || '',
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        gp: 0,
        gc: 0,
        pontos: 0,
      });
    });
  }

  private static async renderizarHistorico(container: HTMLElement, est: Estatistica): Promise<void> {
    const historicoDiv = container.querySelector('#jogador-historico') as HTMLElement;

    // Simulando histórico de jogos (em uma aplicação real, isso viria do banco de dados)
    const historicoJogos = [
      {
        id: '1',
        tipo: 'amistoso',
        adversarioNome: 'João',
        resultado: 'vitoria',
        gp: 2,
        gc: 1,
        data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        tipo: 'torneio',
        adversarioNome: 'Real Madrid',
        resultado: 'derrota',
        gp: 1,
        gc: 3,
        data: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        tipo: 'dupla',
        adversarioNome: 'Felipe & Pedro',
        resultado: 'empate',
        gp: 2,
        gc: 2,
        data: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ];

    const filtrados = historicoJogos.filter((j) => {
      if (this.selectedFiltroTipo !== 'todos' && j.tipo !== this.selectedFiltroTipo) return false;
      if (this.selectedFiltroAdversario && !j.adversarioNome.toLowerCase().includes(this.selectedFiltroAdversario.toLowerCase()))
        return false;
      return true;
    });

    historicoDiv.innerHTML = `
      <h3 style="margin-top: 0; margin-bottom: 12px;">Histórico de Jogos</h3>
      ${filtrados
        .map(
          (jogo) => `
        <div style="
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">
              ${jogo.adversarioNome} (${jogo.tipo})
            </div>
            <div style="font-size: 12px; color: #666;">
              ${jogo.data.toLocaleDateString('pt-BR')}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="
              font-weight: 700;
              font-size: 18px;
              color: ${jogo.resultado === 'vitoria' ? '#28a745' : jogo.resultado === 'derrota' ? '#dc3545' : '#ffc107'};
              margin-bottom: 4px;
            ">
              ${jogo.gp} - ${jogo.gc}
            </div>
            <div style="font-size: 12px; color: #666;">
              ${jogo.resultado === 'vitoria' ? 'Vitória' : jogo.resultado === 'derrota' ? 'Derrota' : 'Empate'}
            </div>
          </div>
        </div>
      `
        )
        .join('')}
      ${filtrados.length === 0 ? '<p style="text-align: center; color: #666;">Nenhum jogo encontrado.</p>' : ''}
    `;
  }
}
