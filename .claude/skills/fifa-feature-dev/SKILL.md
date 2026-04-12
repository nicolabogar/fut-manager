---
name: fifa-feature-dev
description: "**WORKFLOW SKILL** — Parse and execute FIFA FAR PLAY feature development from FifaFarPlay.txt. Use when: implementing features listed in FifaFarPlay.txt, starting feature work, continuing from checkpoint, or need to track feature completion via git commits. Automates: reading feature list, implementing each item, committing with hashes, tracking progress in FifaFarPlay.txt, and versioning workflow."
scope: "workspace"
applyTo: "FifaFarPlay.txt"
keywords:
  - "feature"
  - "fifa"
  - "development"
  - "prompt"
  - "versionamento"
---

# FIFA FAR PLAY Feature Development Workflow

## 🎯 Propósito

Automatizar o workflow completo de desenvolvimento de features do FIFA FAR PLAY:
1. **Parse** do arquivo `FifaFarPlay.txt` (lê lista de features)
2. **Implementação** de cada item (edita `index.html`)
3. **Commit + Push** de cada feature (registra hash)
4. **Tracking** no próprio arquivo original (marcar com `[x]` + hash)
5. **Versionamento** quando tudo está pronto (renomear para v13, v14, etc.)

## 📋 Fluxo de Execução

### Fase 1: Leitura e Parse
```
1. Ler prompts/FifaFarPlay.txt
2. Extrair items com status [ ] (pendentes)
3. Contar total de items e criar checklist mental
4. Verificar arquivo anterior (FifaFarPlay_vN.txt) para contexto
```

### Fase 2: Desenvolvimento Iterativo
```
Para CADA item [ ] pendente:
  a) Descrever o que será implementado (resumo)
  b) Localizar código relevante em index.html
  c) Implementar a feature (edits)
  d) Testar mentalmente (responsividade, animações, lógica)
  e) Executar: git add + git commit + git push
     - Commit message: "feat: [descrição PT-BR] (FifaFarPlay item X)"
  f) Extrair HASH do commit (7 primeiros chars)
  g) IMEDIATAMENTE atualizar FifaFarPlay.txt:
     - Trocar [ ] por [x]
     - Adicionar hash: "[x] descrição (hash: ABC1234)"
     - Commit de atualização: "docs: atualizar FifaFarPlay.txt com hash"
  h) EXIBIR PARA USUÁRIO: progresso, hash, próximo item
```

### Fase 3: Versionamento (quando ALL items = [x])
```
1. Renomear prompts/FifaFarPlay.txt → prompts/FifaFarPlay_v13.txt
2. Criar novo prompts/FifaFarPlay.txt vazio com template padrão
3. Commit: "docs: versionar para v13 e criar novo FifaFarPlay.txt"
4. Push
5. Exibir mensagem de sucesso ao usuário
```

## 🔧 Regras Operacionais

### Leitura do Arquivo
- **Formato esperado**:
  ```
  # FIFA FAR PLAY - Prompts de Features vXX
  # FORMATO: Cada feature tem status: [ ] pendente | [x] concluído (hash: XXXXXXX)
  
  ## MELHORIAS ##
  
  - [ ] Feature 1 description
  - [x] Feature 2 (hash: ABC1234)
  - [ ] Feature 3 description
  ```

- **Items de interesse**: Linhas começando com `- [ ]` (contém a feature a implementar)
- **Items completos**: Linhas com `- [x]` (já foram feitas - ignorar)
- **Comentários**: Linhas com `#` (ignorar, usar apenas para contexto de versão)

### Git Workflow
```bash
# Para cada feature implementada:
git add .
git commit -m "feat: [descrição PT-BR] (FifaFarPlay item X)"
git push

# Extrair hash (7 chars):
git rev-parse --short=7 HEAD
```

### Atualização do FifaFarPlay.txt
- **SEMPRE usar este padrão**:
  ```
  - [x] Descrição da feature (hash: ABC1234)
  ```
- **Manter descrição original** (não abreviar)
- **Adicionar hash exatamente neste formato**: `(hash: ABC1234)`
- **Salvar imediatamente após cada feature**

### Checkpoint & Retomada
- **Se usuário sair no meio**: O arquivo `FifaFarPlay.txt` foi atualizado com `[x]` + hash
- **Ao retomar**: Ler novamente, pular items com `[x]`, continuar dos `[ ]`
- **Visibilidade**: Sempre mostrar ao usuário onde parou (ex: "Item 3 de 8")

## 📝 Template para Novo FifaFarPlay.txt

Após versionamento, criar arquivo novo com este template:

```
# FIFA FAR PLAY - Prompts de Features v14
# FORMATO: Cada feature tem status: [ ] pendente | [x] concluído (hash: XXXXXXX)
# O agente deve marcar o hash do commit ao concluir cada item.
# Ao finalizar tudo, este arquivo é renomeado para FifaFarPlay_v14.txt e um novo é criado.

## MELHORIAS ##

- [ ] [Descreva aqui a próxima melhoria desejada]

```

## ⚠️ Validações Antes de Versionar

Antes de fazer a Fase 3 (versionamento), verificar:
- [ ] Todos os items estão com `[x]`
- [ ] Cada `[x]` tem `(hash: XXXXXXX)` válido
- [ ] Arquivo foi commitado após cada feature (sem items pendentes não commitados)
- [ ] Git status limpo (`git status` mostra "working tree clean")

Se houver items não commitados, **não versionar** — alertar usuário.

## 🎯 Mensagens ao Usuário

### Início
```
📖 Lendo FifaFarPlay.txt...
✅ Encontrados X items pendentes [ ]
📊 Progresso: 0/X

Próximo: [Descrição do primeiro item]
```

### Durante Desenvolvimento
```
🔨 Implementando: [Descrição do item X/Y]
📍 Localizações: [resumo onde foi editado]
⏳ Testando mentalmente (responsividade, animations, lógica)...
✨ Implementação completa!

📤 Commitando e fazendo push...
Hash: ABC1234D

📝 Atualizando FifaFarPlay.txt...
✅ Item markado como [x]

📊 Progresso: X/Y items
```

### Após Versionar
```
🎉 Todas as features foram implementadas!
📦 Versionando para FifaFarPlay_v13.txt...
📝 Criando novo FifaFarPlay.txt (pronto para novas features)...
✅ Commit + Push concluído

👉 Próximo passo: Escreva suas novas features no novo FifaFarPlay.txt
```

## 🚀 Invocação

Quando invocar esta skill:
```
/fifa-feature-dev
```

OU escrever no chat:
```
"Desenvolver as features do FIFA FAR PLAY"
"Continuar de onde parou no FifaFarPlay.txt"
"Implementar próximas features"
```

## 🔗 Dependências Externas

- **Git**: Para commit, push, obter hash
  - Comandos usados: `git add`, `git commit`, `git push`, `git rev-parse`
- **File System**: Leitura/escrita de `index.html` e `prompts/FifaFarPlay.txt`
- **Codebase Knowledge**: Ver [copilot-instructions.md](../..)
  - Design system, estrutura HTML, padrões JS, localStorage

## 📌 Context Preservation

Após cada feature completada, armazenar na memória de sessão:
```
# FIFA Feature Dev Checkpoint
- Versão: v12
- Items totais: X
- Items concluídos: Y
- Último hash: ABC1234D
- Próximo: [Descrição do próximo item]
```

Permite retomada rápida se conversa for interrompida.

---

**Criado**: Abril 2026  
**Status**: Ativo  
**Workspace**: fifa-far-play
