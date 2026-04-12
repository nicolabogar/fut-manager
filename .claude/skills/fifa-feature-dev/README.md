# 🚀 FIFA Feature Dev - Quick Reference

## Como Invocar a Skill

```
/fifa-feature-dev
```

Ou descrever no chat:
- "Desenvolver as features do FIFA FAR PLAY"
- "Implementar próximos items do FifaFarPlay.txt"
- "Continuar de onde parou"

## Fluxo Resumido

```
📖 Ler FifaFarPlay.txt
  ↓
🔨 Para cada [ ] pendente:
  ├─ Implementar feature em index.html
  ├─ Git commit + push
  ├─ Obter hash (7 chars)
  └─ Marcar [x] + hash no arquivo original
  ↓
✅ Todos items = [x]?
  ├─ SIM → Versionar (renomear v12→v13)
  │         Criar novo FifaFarPlay.txt vazio
  │         Commit final
  └─ NÃO → Continuar desenvolvendo

```

## Exemplo de Progresso

### Antes
```
- [ ] Implementar sliders de exclusão
- [ ] Adicionar tags de eficiência
- [ ] Sincronizar deletes
```

### Durante
```
- [x] Implementar sliders de exclusão (hash: AC3F2E1)
- [ ] Adicionar tags de eficiência
- [ ] Sincronizar deletes
```

### Depois (versionamento)
```
✅ FifaFarPlay.txt → FifaFarPlay_v13.txt
📝 Novo FifaFarPlay.txt criado (vazio)
```

## Checklist de Cada Feature

Antes de passar para a próxima:

- ✅ Código implementado em index.html
- ✅ Responsividade testada (mobile, tablet, desktop)
- ✅ Animações funcionando suavemente
- ✅ localStorage persistindo dados (se aplicável)
- ✅ Git commit feito com hash válido
- ✅ Git push bem-sucedido
- ✅ FifaFarPlay.txt atualizado com [x] + hash

## Se Algo Quebrar

1. **Feature parcial**: Edite manualmente o arquivo a feature, commit separado, depois continue
2. **Hash perdido**: `git log --oneline -n 1` mostra último commit
3. **Arquivo desatualizado**: Ler novamente com `git status` antes de continuar
4. **Versionamento errado**: Renomear arquivo manualmente e criar novo via terminal

---

**Próximo passo**: Chame a skill digitando `/fifa-feature-dev` no chat! 🎯
