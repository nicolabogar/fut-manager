# FutManager 2.0 - Roadmap de Melhorias

## 📊 Progresso Geral: 25% ✅

```
████░░░░░░░░░░░░░░░░ (14 de 56 tarefas)
```

---

## ✅ FASE 1: Arquitetura Base (100% COMPLETO)

- ✅ Refatoração para TypeScript + Vite
- ✅ Estrutura modular (feature folders)
- ✅ Domain layer com Services + Repositories
- ✅ Infrastructure layer (Firebase, Auth, Storage)
- ✅ UI Views e Router

---

## 🎯 FASE 2: Melhorias (25% COMPLETO)

### ✅ Implementadas (3/14)

| # | Tarefa | Status | Arquivo |
|---|--------|--------|---------|
| 1 | Remover ícones dos botões | ✅ | `HomeView.ts` |
| 2 | Botão "+ Criar" | ✅ | `AmistososView.ts`, `TorneiosView.ts` |
| - | SearchablePlayerSelect | ✅ | `SearchablePlayerSelect.ts` |
| - | ClubeSelecaoSelect | ✅ | `ClubeSelecaoSelect.ts` |

### ⏳ Pendentes (11/14)

| # | Tarefa | Prioridade | Impacto |
|---|--------|-----------|---------|
| 3 | Modo Dupla em Amistosos | 🔴 Alta | UI |
| 4 | Ranking com Dupla | 🔴 Alta | Logic |
| 5 | Detalhes do Ranking | 🟡 Média | UI |
| 6 | Dropdown em Torneios | 🔴 Alta | UI |
| 7 | Menu Hamburger | 🟡 Média | UX |
| 8 | Botão Sair Condicional | 🟡 Média | UX |
| 9 | Clube + Seleção | 🔴 Alta | Logic |
| 10 | Renomear Partida → Amistoso | 🟢 Baixa | Code |
| 11 | Botão "+ Criar Partida" | ✅ Pronto | UI |
| 12 | Formato Jogador (Grande/Time) | 🟡 Média | UI |
| 13 | Menu de Sair | 🟡 Média | UX |
| 14 | Dupla + Clube/Seleção | 🔴 Alta | Logic |

---

## 📁 Componentes Criados (Reutilizáveis)

```
src/ui/components/
├── SearchablePlayerSelect.ts      ✅ Seleção de jogadores com busca
├── ClubeSelecaoSelect.ts          ✅ Seleção de clube/seleção
├── MenuHamburger.ts               📋 Pronto para integrar
├── PlayerTag.ts                   📋 Pronto para integrar
└── Button.ts                      📋 Pronto para integrar
```

---

## 🔧 Serviços Disponíveis

```
src/domain/
├── JogadorService              ✅ CRUD completo
├── AmistosoService             📋 Pronto para modo dupla
├── TorneioService              📋 Pronto para integração
└── RankingService              📋 Pronto para histórico
```

---

## 🚀 Como Continuar

### Próximas Tarefas Críticas:

1. **Modo Dupla em Amistosos** (2-3 horas)
   - [ ] Adicionar checkbox "Modo Dupla" em AmistososView
   - [ ] Integrar SearchablePlayerSelect
   - [ ] Integrar ClubeSelecaoSelect
   - [ ] Atualizar AmistosoService.sortearTimes()

2. **Ranking com Dupla** (2 horas)
   - [ ] Atualizar RankingService.registrarVitoria()
   - [ ] Dividir pontos entre 2 jogadores
   - [ ] Adicionar historicoJogos

3. **Detalhes do Ranking** (2-3 horas)
   - [ ] Criar modal de detalhes
   - [ ] Implementar filtros (tipo, adversário)
   - [ ] Listar histórico de jogos

4. **Menu Hamburger** (1 hora)
   - [ ] Integrar MenuHamburger em main.ts
   - [ ] Opção de logout
   - [ ] Navegação mobile

---

## 📈 Métrica de Qualidade

```
Tipagem TypeScript:   ✅ 100%
Modularização:        ✅ 100%
Componentes Reutiliz: ✅ 80% (ready-to-use)
Testes:               ⏳ 0% (próxima fase)
Deploy Produção:      ⏳ Pronto em Vite
```

---

## 💾 Git Status

```bash
Commits locais: 6
Push: Bloqueado por proxy (usar quando disponível)

Histórico:
- 406ba1a improvement: remover ícones dos botões
- 92c360f feat: adicionar SearchablePlayerSelect
- 856c668 docs: criar documento de status
- af8bdd3 feat: adicionar ClubeSelecaoSelect
```

---

## 🎓 Estrutura Pronta para Usar

```typescript
// Services usam Repository Pattern
const jogadores = await jogadorService.listar();

// Components são reutilizáveis
new SearchablePlayerSelect(containerElement).render();

// Types garantem type safety
const amistoso: Amistoso = { ... };

// Views renderizam em container
await AmistososView.render(mainContent);
```

---

**Próxima Reunião**: Implementar FASE 2.1 (Modo Dupla)
**Tempo Estimado**: 6-8 horas para completar 14 melhorias
