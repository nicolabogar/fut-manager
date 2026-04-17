# Análise de Arquitetura — FIFA FAR PLAY

## Situação Atual

O projeto é uma **Single Page Application (SPA) monolítica** contida em um único arquivo `index.html` (~7.000+ linhas). Todo o HTML, CSS e JavaScript estão inline, sem build step, sem bundler, sem separação de responsabilidades.

### Stack atual

| Camada | Tecnologia |
|---|---|
| Frontend | HTML + CSS + JavaScript vanilla (tudo inline em `index.html`) |
| Banco de dados | Firebase Firestore (acesso direto pelo browser via SDK) |
| Autenticação | Firebase Auth (acesso direto pelo browser) |
| Hospedagem | GitHub Pages |
| PWA | `manifest.json` + `sw.js` (Service Worker minimalista) |
| CI/CD | Nenhum pipeline automatizado |

### Custo atual

**R$ 0,00/mês** — GitHub Pages é gratuito; Firebase Spark plan (gratuito) cobre o uso atual.

---

## Diagnóstico

### Pontos positivos
- Zero custo de infraestrutura
- Deploy simples (push para o repositório)
- Funciona offline (PWA com Service Worker)
- Sem dependência de servidor Node.js

### Limitações identificadas
- Arquivo único de ~7.000 linhas dificulta manutenção e colaboração
- Toda a lógica de negócio exposta no cliente (regras do Firestore fazem a segurança)
- Sem testes automatizados
- Sem separação de módulos (lógica de sorteio, torneios, amistosos, times tudo junto)
- Sem pipeline de CI/CD
- Assets (ícones) misturados na raiz do projeto

---

## Proposta de Refatoração

### Opção 1 — Refatoração Modular (sem backend) ✅ Recomendada

Separar o `index.html` em módulos JavaScript sem introduzir backend, mantendo custo zero.

```
fifa-far-play/
├── icons/               ← ícones da aplicação
├── arquitetura/         ← documentação de arquitetura
├── src/
│   ├── modules/
│   │   ├── sorteio.js   ← lógica de sorteio
│   │   ├── amistosos.js ← lógica de amistosos
│   │   ├── torneios.js  ← lógica de campeonatos
│   │   ├── times.js     ← gestão de times
│   │   └── jogadores.js ← gestão de jogadores
│   ├── firebase.js      ← inicialização e config do Firebase
│   ├── ui.js            ← helpers de renderização
│   └── main.js          ← ponto de entrada
├── index.html           ← apenas HTML + imports
├── manifest.json
└── sw.js
```

**Vantagens:**
- Mantém custo zero
- Não precisa de servidor
- Código mais organizado e testável
- Deploy continua pelo GitHub Pages
- Sem mudança de infraestrutura

---

### Opção 2 — Separação Frontend + Backend (com servidor)

Introduz uma API REST/GraphQL em Node.js separando regras de negócio do cliente.

```
fifa-far-play/
├── frontend/   ← React ou Vue (hospedado no Firebase Hosting ou Vercel)
└── backend/    ← Node.js + Express (hospedado no Railway ou Cloud Run)
```

#### Infraestrutura necessária

| Componente | Opção recomendada | Custo estimado |
|---|---|---|
| Frontend | Firebase Hosting ou Vercel | Grátis |
| Backend (Node.js API) | Railway | ~US$ 5/mês |
| Backend (alternativa) | Google Cloud Run | Pay-per-use (~US$ 0–5/mês) |
| Banco de dados | Firebase Firestore (mantém) | Grátis (Spark plan) |

**Custo total estimado: US$ 0–10/mês**

#### Quando faz sentido
- Se houver necessidade de lógica de negócio protegida no servidor
- Se for necessário integração com sistemas externos (webhooks, pagamentos)
- Se o Firestore precisar ser substituído por PostgreSQL/MySQL
- Se for necessário autenticação customizada ou controle de sessão server-side

**Atenção:** Introduzir backend aumenta complexidade operacional e custo. Para o cenário atual do FIFA FAR PLAY, **a Opção 1 é suficiente e recomendada**.

---

### Opção 3 — PWA completo sem mudança estrutural

Apenas adicionar suporte PWA completo ao projeto atual, sem refatoração de código:

- `manifest.json` com todos os ícones necessários (192px, 512px, maskable)
- Service Worker com estratégia de cache adequada (Cache First para assets, Network First para dados)
- Suporte a "Add to Home Screen" no Android e iOS

**Custo: R$ 0,00** — sem mudança de infraestrutura.

---

## Roadmap sugerido

```
Fase 1 (agora)
└── Organização de assets (icons/, arquitetura/) ← CONCLUÍDO

Fase 2 (curto prazo)
└── Separação em módulos JS (sem backend)
    ├── Extrair módulo de sorteio
    ├── Extrair módulo de amistosos
    ├── Extrair módulo de torneios
    └── Extrair módulo de times/jogadores

Fase 3 (médio prazo)
└── PWA completo
    ├── Ícones em todos os tamanhos
    ├── Service Worker com cache estratégico
    └── Manifesto completo

Fase 4 (se necessário)
└── Backend separado (somente se Fase 2 não for suficiente)
    ├── Definir qual lógica vai para o servidor
    ├── Escolher hospedagem (Railway recomendado para simplicidade)
    └── Migrar deploy para Firebase Hosting + Railway
```

---

## Decisão de Infraestrutura (se backend for necessário)

### Frontend

| Opção | Custo | Complexidade | Recomendação |
|---|---|---|---|
| GitHub Pages (atual) | Grátis | Baixa | ✅ Manter se sem build step |
| Firebase Hosting | Grátis | Baixa | ✅ Se tiver Firebase já configurado |
| Vercel | Grátis | Baixa | ✅ Se usar React/Next.js |
| Netlify | Grátis | Baixa | ✅ Alternativa ao Vercel |

### Backend (Node.js)

| Opção | Custo | Complexidade | Recomendação |
|---|---|---|---|
| Railway | ~US$ 5/mês | Baixa | ✅ Mais simples, deploy via Git |
| Google Cloud Run | US$ 0–5/mês | Média | ✅ Integrado com Firebase |
| Render (free) | Grátis (com sleep) | Baixa | ⚠️ Dorme após inatividade |
| Fly.io | US$ 0–3/mês | Média | ✅ Boa performance |
| VPS (DigitalOcean) | US$ 4–6/mês | Alta | ⚠️ Mais controle, mais trabalho |

### Recomendação combinada (se optar pela Opção 2)

```
Frontend → Firebase Hosting (grátis, integrado com Firebase já em uso)
Backend  → Railway (~US$ 5/mês, deploy automático via Git, zero configuração)
```

---

_Documento gerado em: Abril 2026_
_Repositório: nicolabogar/fifa-far-play_
