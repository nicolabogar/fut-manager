export interface MenuOption {
  id: string;
  label: string;
  onClick: () => void | Promise<void>;
}

export class MenuHamburger {
  private container: HTMLElement;
  private isOpen: boolean = false;
  private options: MenuOption[];
  private onSignOut?: () => void | Promise<void>;

  constructor(container: HTMLElement, options: MenuOption[] = [], onSignOut?: () => void | Promise<void>) {
    this.container = container;
    this.options = options;
    this.onSignOut = onSignOut;
    this.render();
  }

  private render(): void {
    const button = document.createElement('button');
    button.className = 'menu-hamburger-btn';
    button.innerHTML = '☰';
    button.style.cssText = `
      position: fixed;
      top: 16px;
      left: 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 14px;
      cursor: pointer;
      font-size: 20px;
      z-index: 1000;
      transition: background 0.2s;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.background = '#0056b3';
    });
    button.addEventListener('mouseleave', () => {
      button.style.background = '#007bff';
    });

    button.addEventListener('click', () => this.toggleMenu());

    const menu = document.createElement('div');
    menu.className = 'menu-hamb-dropdown';
    menu.style.cssText = `
      position: fixed;
      top: 60px;
      left: 16px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      z-index: 999;
      min-width: 200px;
      display: none;
    `;

    const menuContent = document.createElement('div');
    menuContent.className = 'menu-hamb-content';

    this.options.forEach((option) => {
      const item = document.createElement('button');
      item.className = 'menu-hamb-item';
      item.textContent = option.label;
      item.style.cssText = `
        display: block;
        width: 100%;
        text-align: left;
        padding: 12px 16px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        transition: background 0.2s;
      `;

      item.addEventListener('mouseenter', () => {
        item.style.background = '#f5f5f5';
      });
      item.addEventListener('mouseleave', () => {
        item.style.background = 'none';
      });

      item.addEventListener('click', async () => {
        await option.onClick();
        this.closeMenu();
      });

      menuContent.appendChild(item);
    });

    if (this.onSignOut) {
      const signOutBtn = document.createElement('button');
      signOutBtn.className = 'menu-hamb-signout';
      signOutBtn.textContent = 'Sair';
      signOutBtn.style.cssText = `
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
      `;

      signOutBtn.addEventListener('mouseenter', () => {
        signOutBtn.style.background = '#fff5f5';
      });
      signOutBtn.addEventListener('mouseleave', () => {
        signOutBtn.style.background = 'none';
      });

      signOutBtn.addEventListener('click', async () => {
        await this.onSignOut!();
        this.closeMenu();
      });

      menuContent.appendChild(signOutBtn);
    }

    menu.appendChild(menuContent);
    this.container.appendChild(button);
    this.container.appendChild(menu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        !button.contains(e.target as Node) &&
        !menu.contains(e.target as Node)
      ) {
        this.closeMenu();
      }
    });
  }

  private toggleMenu(): void {
    this.isOpen = !this.isOpen;
    const menu = document.querySelector('.menu-hamb-dropdown') as HTMLElement;
    if (menu) {
      menu.style.display = this.isOpen ? 'block' : 'none';
    }
  }

  private closeMenu(): void {
    this.isOpen = false;
    const menu = document.querySelector('.menu-hamb-dropdown') as HTMLElement;
    if (menu) {
      menu.style.display = 'none';
    }
  }

  addOption(option: MenuOption): void {
    this.options.push(option);
    // Re-render the menu
    this.container.innerHTML = '';
    this.render();
  }

  removeOption(optionId: string): void {
    this.options = this.options.filter((opt) => opt.id !== optionId);
    this.container.innerHTML = '';
    this.render();
  }
}
