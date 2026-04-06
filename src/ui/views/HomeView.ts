export class HomeView {
  static async render(container: HTMLElement): Promise<void> {
    container.innerHTML = `
      <div style="padding: 16px;">
        <h1>Home</h1>
        <p>Dashboard - Em desenvolvimento</p>
      </div>
    `;
  }
}
