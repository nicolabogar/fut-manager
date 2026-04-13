# Copilot Instructions

## Commit Message Convention

Every commit made by a Copilot agent **must** include the agent identifier in the commit title.

### Format

```
<type>(<scope>): <description> [agent: <agent-name>]
```

### Examples

```
feat(amistosos): adicionar filtro por jogador [agent: claude-sonnet-4.5]
fix(ranking): corrigir calculo de pontuacao em empate [agent: gpt-4.1]
chore(deps): atualizar service worker [agent: claude-opus-4.5]
```

### Rules

- The `[agent: <agent-name>]` tag must always appear at the **end** of the first line (commit title).
- Use the exact model/agent name as it appears in the Copilot interface (e.g., `claude-sonnet-4.5`, `gpt-4.1`, `claude-opus-4.5`).
- Allowed commit types: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`.
- Scope is optional but recommended (e.g., `amistosos`, `ranking`, `times`, `torneios`, `jogadores`).
- Keep the description short and in Portuguese or English.
