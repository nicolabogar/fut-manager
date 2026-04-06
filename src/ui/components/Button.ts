export interface ButtonConfig {
  text: string;
  onClick: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

export class Button {
  static create(config: ButtonConfig): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.textContent = config.text;
    btn.disabled = config.disabled || false;

    const baseStyle = `
      padding: ${this.getPadding(config.size)};
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: ${this.getFontSize(config.size)};
      font-weight: 500;
      transition: all 0.2s;
      white-space: nowrap;
      ${config.fullWidth ? 'width: 100%;' : ''}
      ${config.disabled ? 'opacity: 0.6; cursor: not-allowed;' : ''}
    `;

    const colorStyle = this.getColorStyle(config.variant);
    btn.style.cssText = baseStyle + colorStyle;

    if (!config.disabled) {
      btn.addEventListener('mouseenter', () => {
        btn.style.opacity = '0.9';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.opacity = '1';
      });

      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (config.loading) return;
        await config.onClick();
      });
    }

    return btn;
  }

  private static getPadding(size?: string): string {
    switch (size) {
      case 'sm':
        return '6px 12px';
      case 'lg':
        return '14px 24px';
      default:
        return '10px 16px';
    }
  }

  private static getFontSize(size?: string): string {
    switch (size) {
      case 'sm':
        return '12px';
      case 'lg':
        return '16px';
      default:
        return '14px';
    }
  }

  private static getColorStyle(variant?: string): string {
    switch (variant) {
      case 'secondary':
        return `
          background: #6c757d;
          color: white;
        `;
      case 'danger':
        return `
          background: #dc3545;
          color: white;
        `;
      case 'success':
        return `
          background: #28a745;
          color: white;
        `;
      default:
        return `
          background: #007bff;
          color: white;
        `;
    }
  }
}
