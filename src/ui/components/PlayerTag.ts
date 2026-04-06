import type { Jogador } from '@config/types';

export class PlayerTag {
  static createTag(jogador: Jogador, onRemove?: (id: string) => void): HTMLElement {
    const tag = document.createElement('div');
    tag.className = 'player-tag';
    tag.style.cssText = `
      background: #007bff;
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
    `;

    const content = document.createElement('span');
    content.textContent = jogador.nome;

    if (jogador.fotoUrl) {
      const foto = document.createElement('img');
      foto.src = jogador.fotoUrl;
      foto.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        object-fit: cover;
      `;
      tag.insertBefore(foto, content);
    }

    if (onRemove) {
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '×';
      removeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        line-height: 1;
        margin-left: 4px;
        transition: opacity 0.2s;
      `;

      removeBtn.addEventListener('mouseenter', () => {
        removeBtn.style.opacity = '0.7';
      });
      removeBtn.addEventListener('mouseleave', () => {
        removeBtn.style.opacity = '1';
      });

      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onRemove(jogador.id);
      });

      tag.appendChild(removeBtn);
    }

    tag.appendChild(content);
    return tag;
  }

  static createTeamBadge(teamName: string, logoEmoji?: string): HTMLElement {
    const badge = document.createElement('div');
    badge.className = 'team-badge';
    badge.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      background: #f0f0f0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      color: #333;
    `;

    if (logoEmoji) {
      const logo = document.createElement('span');
      logo.textContent = logoEmoji;
      logo.style.fontSize = '14px';
      badge.appendChild(logo);
    }

    const name = document.createElement('span');
    name.textContent = teamName;
    badge.appendChild(name);

    return badge;
  }

  static createPlayerCard(
    jogador: Jogador,
    teamName?: string,
    logoEmoji?: string
  ): HTMLElement {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.style.cssText = `
      padding: 12px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;

    const nameDiv = document.createElement('div');
    nameDiv.style.cssText = `
      font-size: 16px;
      font-weight: 600;
      color: #333;
    `;
    nameDiv.textContent = jogador.nome;

    card.appendChild(nameDiv);

    if (teamName) {
      const teamDiv = document.createElement('div');
      teamDiv.style.cssText = `
        font-size: 12px;
        color: #666;
      `;
      teamDiv.appendChild(this.createTeamBadge(teamName, logoEmoji));
      card.appendChild(teamDiv);
    }

    if (jogador.fotoUrl) {
      const foto = document.createElement('img');
      foto.src = jogador.fotoUrl;
      foto.style.cssText = `
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 4px;
      `;
      card.appendChild(foto);
    }

    return card;
  }
}
