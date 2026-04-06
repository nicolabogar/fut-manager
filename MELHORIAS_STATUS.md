# Pacote de Melhorias - Status

## ✅ Implementadas

1. **✅ Remover ícones dos botões**
   - Buttons agora mostram apenas texto (ex: "+ Criar")
   - Arquivo: `src/ui/views/HomeView.ts`, `AmistososView.ts`, `TorneiosView.ts`

2. **✅ Componente SearchablePlayerSelect**
   - Dropdown pesquisável para selecionar jogadores
   - Arquivo: `src/ui/components/SearchablePlayerSelect.ts`

## ⏳ Em Progresso / Pendentes

3. **Modo Dupla** - Quando criar amistoso/torneio:
   - [ ] Opção checkbox para ativar "Modo Dupla"
   - [ ] Se dupla: permite escolher dupla manual ou sortear
   - [ ] Dupla + Time: dropdown pesquisável para times ou sortear
   - Arquivo: `src/ui/views/AmistososView.ts`

4. **Ranking com Dupla**
   - [ ] Contabilizar pontos quando jogar em dupla
   - [ ] Dividir pontos entre 2 jogadores
   - Arquivo: `src/domain/ranking/RankingService.ts`

5. **Detalhes do Ranking**
   - [ ] Clicar no jogador → mostrar histórico de jogos
   - [ ] Filtrar por tipo: amistoso | torneio | dupla
   - [ ] Filtrar por adversário
   - Arquivo: `src/ui/views/RankingView.ts`

6. **Dropdown Pesquisável - Torneios**
   - [ ] Ao criar torneio: dropdown pesquisável para jogadores
   - [ ] Mostrar seleção como tags/chips
   - [ ] Permitir remover tags se torneio não iniciou
   - Arquivo: `src/ui/views/TorneiosView.ts`

7. **Menu Hamburger**
   - [ ] Botão no canto superior esquerdo
   - [ ] Abrir opções ao clicar
   - [ ] Mostrar menu de navegação
   - Arquivo: `src/main.ts`, novo componente

8. **Botão Sair Condicional**
   - [ ] Mostrar "Sair" apenas ao clicar no usuário logado
   - [ ] Menu dropdown no perfil do usuário
   - Arquivo: `src/main.ts`

9. **Amistoso + Seleção + Clube**
   - [ ] Permitir selecionar Clube OU Seleção
   - [ ] Sorteio sempre: clube x clube OU seleção x seleção
   - [ ] Não misturar tipos
   - Arquivo: `src/ui/views/AmistososView.ts`, `AmistosoService.ts`

10. **Renomear "Partida" → "Amistoso"**
    - [ ] Remover referências a "partida"
    - [ ] Usar apenas "Amistoso" em toda aplicação
    - Arquivo: Múltiplos

11. **Botão "+ Criar Partida"** (Amistoso)
    - [ ] Criar botão similar ao de Torneios
    - [ ] Aparecer no topo da view
    - Arquivo: `src/ui/views/AmistososView.ts` ✅ Parcialmente pronto

12. **Formatação de Jogador em Partidas**
    - [ ] Nome do jogador: GRANDE, em cima
    - [ ] Nome do time: menor, logo após
    - [ ] Escudo do time: emoji ou imagem
    - Arquivo: `src/ui/views/AmistososView.ts`

13. **Menu de Sair do Perfil** ✅ Parcialmente pronto
    - [ ] Clicar ícone do usuário → abrir menu
    - [ ] Opção "Sair" no menu
    - Arquivo: `src/main.ts`

14. **Dupla + Clube + Seleção**
    - [ ] Combinar modos: dupla + (clube OU seleção)
    - [ ] Sorteio mantém tipo consistente
    - Arquivo: `src/domain/amistosos/AmistosoService.ts`

15. **Git Commit + Push Automático**
    - [ ] Após cada alteração: `git add -A && git commit -m "..."`
    - [ ] Sempre fazer `git push origin main`
    - Status: Push bloqueado por proxy (commits salvos localmente)

---

## Próximos Passos

1. Implementar modo dupla em AmistososView
2. Adicionar seleção de clube/seleção com dropdown
3. Atualizar RankingService para contabilizar dupla
4. Criar view de detalhes de ranking
5. Implementar menu hamburger mobile
6. Testes E2E de todas as features

---

**Última atualização**: 2026-04-06
