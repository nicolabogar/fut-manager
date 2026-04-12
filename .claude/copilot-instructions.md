# FIFA FAR PLAY - Instruções com Claude

## 📋 Visão Geral

**FIFA FAR PLAY** é uma aplicação web para gerenciar times de futebol, torneios, amistosos e rankings. Frontend puro, interface glass-morphism em vanilla JavaScript com localStorage.

- **Linguagem**: Português (PT-BR)
- **Tech Stack**: HTML5, CSS3, Vanilla JavaScript, localStorage
- **Tipo**: SPA (Single Page Application) mobile-first
- **Git**: Ativo - use commits com hashes para rastrear features

## 🎯 Sistema de Features & Prompts

As features são rastreadas em DOIS formatos:
- **`FifaFarPlay.txt`**: Arquivo ativo com status de cada item (`[ ]` pendente, `[x]` concluído com hash do commit)
- **`FifaFarPlay_vN.txt`**: Snapshots versionados após completar tudo

### Workflow Automatizado (Skill: `/fifa-feature-dev`)

Invoque a skill quando quiser desenvolver features:

```bash
/fifa-feature-dev
```

A skill **automaticamente**:
1. Lê `FifaFarPlay.txt` e extrai items `[ ]` pendentes
2. Implementa cada feature em `index.html`
3. Commita com mensagem clara + obtém hash
4. Atualiza arquivo original com `[x]` + hash imediatamente
5. Quando tudo estiver pronto: versiona (v12→v13) e cria novo `FifaFarPlay.txt`

**Manual** (se não usar skill):
1. Adicione hash do commit ao marcar `[x]` 
2. Complete toda a lista → renomeie para `FifaFarPlay_v13.txt` e crie novo `FifaFarPlay.txt`

## 🏗️ Estrutura do Projeto

```
fifa-far-play/
├── .claude/
│   ├── copilot-instructions.md    (este arquivo)
│   ├── settings.json              (permissões globais)
│   └── settings.local.json        (permissões git + node)
├── .git/                          (repositório git)
├── prompts/                       (feature tracking)
│   ├── FifaFarPlay.txt           (ativo)
│   └── FifaFarPlay_v*.txt        (snapshots)
├── index.html                     (app única, tudo inline)
└── fifa-far-play.code-workspace
```

**Nota**: Tudo está em um único `index.html` (HTML + CSS inline + JS).

## 🎨 Design System & Convenções

### Cores (CSS variables)
- `--bg`: #08080F (fundo escuro)
- `--purple`: #8B5CF6 (primária)
- `--cyan`: #06B6D4 (secundária)
- `--green`: #10B981 (sucesso)
- `--red`: #EF4444 (rejeição)
- `--yellow`: #F59E0B (aviso)

### Componentes-chave
- **Cards**: `.glass` + `.glow-border` para glow purple
- **Botões**: `.btn-primary` (gradient), `.btn-ghost` (outline), `.btn-icon` (compact)
- **Tags**: `.tag` com cores temáticas (`.tag-purple`, `.tag-green`, `.tag-red`, `.tag-yellow`)
- **Inputs**: `.input` com `:focus` em purple
- **Checkboxes**: Accent color purple, layout em `.check-row`

### Tipografia & Ícones
- Nomes de times/países: `text-transform: uppercase`
- Font: Sistema nativa (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`)
- Ícones: SVG inline (bundesflaggen emojis, símbolos custom)

### Animações
- Fade + Slide: `.anim-up` (fadeUp), `.anim-fade` (fadeIn)
- Transições rápidas: `0.15s` para interações, `0.25s` para transformações
- Swipe: Propriedade de transição dinâmica para card sliders (exemplo: `.entity-card.swiping { transition: none; }`)

## 📱 Features Atuais (do prompt v12)

### Em Desenvolvimento
- **Sliders de Exclusão**: Drag left para deletar (cards de times/amistosos)
- **Tags de Eficiência**: Badge nos times (ruim, moderado, bom)
- **Regras de Sorteio**: Matching por eficiência (ruim×moderado, moderado×bom, etc.)
- **Badges de Resultado**: Vitória (verde), empate (amarelo), derrota (vermelho)
- **Flags de Países**: Ícone no dropdown de países
- **Sincronização de UX**: Todos os deletes com mesmo comportamento slide

### Alinhamento a Revisar
- Posicionamento de tags em cards de times (desalinhadas atualmente)
- Badges de eficiência em cards dos torneios (faltando em alguns)
- Abreviação de nomes longos ("BAYER MUNICH" → "BAYER M.")

## 🔧 Workflow de Desenvolvimento

### Edições em index.html
1. Localize a seção relevante (HTML → CSS → JS)
2. Faça a alteração
3. Teste no navegador (abra index.html)
4. Commit com mensagem clara: `git commit -m "Feat: descrição da mudança [hash-commit-anterior]"`

### localStorage
- A app persiste dados em localStorage automaticamente
- Dados de times, jogos e rankings estão em chaves como `teams_data`, `matches_data`, `tournament_data`
- Limpar: `localStorage.clear()` no console

### Debugging
- Use DevTools (F12) → Console para logs
- Inspecione localStorage via `Application → Local Storage`
- Teste responsividade (emule mobile via DevTools)

## ✅ Checklist para Novas Features

- [ ] Implementação em HTML + CSS + JS (tudo no index.html)
- [ ] Respeitar design system (cores, animações, spacing)
- [ ] Testar em mobile (landscape + portrait)
- [ ] Persistência em localStorage (se aplicável)
- [ ] Marcar no FifaFarPlay.txt com hash do commit
- [ ] Mensagem de commit clara em PT-BR

## 🚀 Comandos Úteis

```bash
# Git
git add .
git commit -m "Feat: [descrição] [hash]"
git push

# Utils (se necessário)
cp arquivo origem arquivo destino
node script.js  # (se houver scripts Node)
```

## 📞 Permissões Ativas

Via `.claude/settings.json`:
- ✅ Edit, Write, Read, Glob, Grep, WebFetch, WebSearch
- ✅ Bash (Bash(*)) - para diagnóstico
- ❌ MCP (desabilitado neste scope)

Via `.claude/settings.local.json`:
- ✅ Git add/commit/push
- ✅ WebSearch + Skill(update-config)
- ✅ Node.js execution
- ✅ File operations (cp)

## 🐛 Padrões Comuns & Armadilhas

1. **localStorage vs sessionStorage**: Use `localStorage` para persistência permanente
2. **Animações no mobile**: Teste em device real ou DevTools emulator
3. **Z-index**: Modals = 50, header = 30, nav = 40 (respeitar hierarquia)
4. **Tamanho de ícones**: SVG inline, ajustar `width/height` (ex: 26px padrão)
5. **Responsividade**: Mobile-first! Desktop é secundário

## 📚 Próximos Passos

Quando precisar de ajuda:
1. **Descreva a feature** em PT-BR
2. **Cite a linha aproximada** do index.html (se souber)
3. **Explique o resultado esperado** (layout/comportamento)
4. Eu localizarei, editarei e testarei

---

**Última atualização**: Abril 2026  
**Versão**: FIFA FAR PLAY v12 (em desenvolvimento)
