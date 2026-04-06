import { AuthService } from '@infrastructure/auth/AuthService';
import { HomeView } from '@ui/views/HomeView';
import { AmistososView } from '@ui/views/AmistososView';
import { TorneiosView } from '@ui/views/TorneiosView';
import { JogadoresView } from '@ui/views/JogadoresView';
import { RankingView } from '@ui/views/RankingView';
import { MenuHamburger } from '@ui/components/MenuHamburger';
import { router, type ViewType } from '@ui/Router';
import './styles/index.css';

/**
 * Entry point da aplicação
 * Inicializa Firebase, autenticação, rota para home e menu
 */

let currentUser: any = null;

function setupAuth(): void {
  const loginScreen = document.getElementById('login-screen');
  const appContainer = document.getElementById('app');
  const loginBtn = document.getElementById('login-btn');

  // Monitorar mudanças de autenticação
  AuthService.onAuthStateChange((user) => {
    (window as any).__AUTH_READY = true;

    if (user) {
      currentUser = user;
      // Usuário autenticado
      if (loginScreen) loginScreen.style.display = 'none';
      if (appContainer) appContainer.style.display = 'flex';
      console.log('Usuário autenticado:', user.email);
      // Inicializar app
      initializeApp(appContainer!);
    } else {
      // Usuário não autenticado
      if (loginScreen) loginScreen.style.display = 'flex';
      if (appContainer) appContainer.style.display = 'none';
    }
  });

  // Botão de login
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      try {
        await AuthService.signInWithGoogle();
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Tente novamente.');
      }
    });
  }

  // Fallback: se auth não estiver pronto em 5s, mostrar login
  setTimeout(() => {
    if (!(window as any).__AUTH_READY) {
      if (loginScreen && loginScreen.style.display === '') {
        loginScreen.style.display = 'flex';
      }
    }
  }, 5000);
}

async function initializeApp(appContainer: HTMLElement): Promise<void> {
  // Criar estrutura da app
  appContainer.innerHTML = `
    <div style="display: flex; height: 100vh;">
      <nav id="sidebar" style="
        width: 200px;
        background: #f8f9fa;
        border-right: 1px solid #ddd;
        padding-top: 60px;
        overflow-y: auto;
      ">
        <div id="nav-container"></div>
      </nav>
      <main id="content" style="
        flex: 1;
        overflow-y: auto;
        background: #fafafa;
      "></main>
      <div id="menu-hamburger-container"></div>
      <div id="user-menu-container"></div>
    </div>
  `;

  const navContainer = appContainer.querySelector('#nav-container') as HTMLElement;
  const contentContainer = appContainer.querySelector('#content') as HTMLElement;
  const menuHamburgerContainer = appContainer.querySelector('#menu-hamburger-container') as HTMLElement;
  const userMenuContainer = appContainer.querySelector('#user-menu-container') as HTMLElement;

  // Criar navegação
  const navItems: { label: string; view: ViewType }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Amistosos', view: 'amistosos' },
    { label: 'Torneios', view: 'torneios' },
    { label: 'Jogadores', view: 'jogadores' },
    { label: 'Ranking', view: 'ranking' },
  ];

  navContainer.innerHTML = navItems
    .map(
      (item) => `
    <button class="nav-btn" data-view="${item.view}" style="
      display: block;
      width: 100%;
      text-align: left;
      padding: 12px 16px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      border-left: 3px solid transparent;
      transition: all 0.2s;
    ">
      ${item.label}
    </button>
  `
    )
    .join('');

  navContainer.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const view = (e.target as HTMLElement).dataset.view as ViewType;
      await router.navegarPara(view);
      renderView(contentContainer, view);

      // Update active nav button
      navContainer.querySelectorAll('.nav-btn').forEach((b) => {
        (b as HTMLElement).style.borderLeftColor = 'transparent';
        (b as HTMLElement).style.background = 'transparent';
      });
      (e.target as HTMLElement).style.borderLeftColor = '#007bff';
      (e.target as HTMLElement).style.background = '#e7f3ff';
    });

    if ((btn as HTMLElement).dataset.view === 'home') {
      (btn as HTMLElement).style.borderLeftColor = '#007bff';
      (btn as HTMLElement).style.background = '#e7f3ff';
    }
  });

  // Criar Menu Hamburger com opções
  const hamburgerMenu = new MenuHamburger(
    menuHamburgerContainer,
    [
      {
        id: 'home',
        label: 'Home',
        onClick: async () => {
          await router.navegarPara('home');
          renderView(contentContainer, 'home');
        },
      },
      {
        id: 'amistosos',
        label: 'Amistosos',
        onClick: async () => {
          await router.navegarPara('amistosos');
          renderView(contentContainer, 'amistosos');
        },
      },
      {
        id: 'torneios',
        label: 'Torneios',
        onClick: async () => {
          await router.navegarPara('torneios');
          renderView(contentContainer, 'torneios');
        },
      },
      {
        id: 'jogadores',
        label: 'Jogadores',
        onClick: async () => {
          await router.navegarPara('jogadores');
          renderView(contentContainer, 'jogadores');
        },
      },
      {
        id: 'ranking',
        label: 'Ranking',
        onClick: async () => {
          await router.navegarPara('ranking');
          renderView(contentContainer, 'ranking');
        },
      },
    ],
    async () => {
      try {
        await AuthService.signOut();
        location.reload();
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  );

  // Criar botão de usuário
  const userButton = document.createElement('button');
  userButton.style.cssText = `
    position: fixed;
    top: 16px;
    right: 16px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 999;
  `;
  userButton.textContent = '👤';

  let userMenuOpen = false;
  const userMenu = document.createElement('div');
  userMenu.style.cssText = `
    position: fixed;
    top: 60px;
    right: 16px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 999;
    min-width: 200px;
    display: none;
  `;

  userMenu.innerHTML = `
    <div style="padding: 12px 16px; border-bottom: 1px solid #ddd; font-size: 12px; color: #666;">
      ${currentUser.email || currentUser.displayName || 'Usuário'}
    </div>
    <button id="btn-sign-out" style="
      display: block;
      width: 100%;
      text-align: left;
      padding: 12px 16px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      color: #dc3545;
      transition: background 0.2s;
    ">
      Sair
    </button>
  `;

  userButton.addEventListener('click', () => {
    userMenuOpen = !userMenuOpen;
    userMenu.style.display = userMenuOpen ? 'block' : 'none';
  });

  const signOutBtn = userMenu.querySelector('#btn-sign-out') as HTMLButtonElement;
  signOutBtn.addEventListener('click', async () => {
    try {
      await AuthService.signOut();
      location.reload();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  });

  document.addEventListener('click', (e) => {
    if (!userButton.contains(e.target as Node) && !userMenu.contains(e.target as Node)) {
      userMenuOpen = false;
      userMenu.style.display = 'none';
    }
  });

  userMenuContainer.appendChild(userButton);
  userMenuContainer.appendChild(userMenu);

  // Listen for custom navigation events
  window.addEventListener('navigate', (e: any) => {
    const view = e.detail as ViewType;
    renderView(contentContainer, view);
  });

  // Render home view by default
  await renderView(contentContainer, 'home');
}

async function renderView(container: HTMLElement, view: ViewType): Promise<void> {
  container.innerHTML = '';

  switch (view) {
    case 'home':
      await HomeView.render(container);
      break;
    case 'amistosos':
      await AmistososView.render(container);
      break;
    case 'torneios':
      await TorneiosView.render(container);
      break;
    case 'jogadores':
      await JogadoresView.render(container);
      break;
    case 'ranking':
      await RankingView.render(container);
      break;
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', setupAuth);

// Register service worker para PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch((err) => {
    console.log('Service Worker registration failed:', err);
  });
}
