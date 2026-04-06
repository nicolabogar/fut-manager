export type ViewType = 'home' | 'jogadores' | 'amistosos' | 'torneios' | 'ranking';

export class Router {
  private currentView: ViewType = 'home';

  async navegarPara(view: ViewType): Promise<void> {
    this.currentView = view;
    console.log('Navegando para:', view);

    // TODO: Renderizar view correspondente
    // Será implementado nas views individuais
  }

  getCurrentView(): ViewType {
    return this.currentView;
  }
}

export const router = new Router();
