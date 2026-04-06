export type ViewType = 'home' | 'jogadores' | 'amistosos' | 'torneios' | 'ranking';

export class Router {
  private currentView: ViewType = 'home';
  private navigationListeners: ((view: ViewType) => void)[] = [];

  async navegarPara(view: ViewType): Promise<void> {
    if (this.currentView === view) return;

    this.currentView = view;
    console.log('Navegando para:', view);

    // Notificar listeners
    this.navigationListeners.forEach((listener) => listener(view));

    // Atualizar URL
    window.history.pushState({ view }, '', `#${view}`);
  }

  getCurrentView(): ViewType {
    return this.currentView;
  }

  onNavigate(listener: (view: ViewType) => void): void {
    this.navigationListeners.push(listener);
  }
}

export const router = new Router();
