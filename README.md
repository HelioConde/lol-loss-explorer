# LoL Loss Explorer — Aprenda com suas derrotas

**Revise padrões de partidas perdidas em League of Legends comparando suas próprias vitórias e derrotas recentes.**

![JavaScript](https://img.shields.io/badge/JavaScript-web-F7DF1E?logo=javascript&logoColor=black) ![Status](https://img.shields.io/badge/status-MVP%20experimental-64748b)

## O que a ferramenta analisa

- Busca por Riot ID e servidor.
- Recorte de até 40 partidas elegíveis no backend.
- Comparações de KDA, mortes, farm por minuto e visão por minuto.
- Distribuição das derrotas por campeão, rota e duração.
- Sinais recorrentes, sempre contextualizados pelo tamanho da amostra.
- Interface em português e inglês, com estados de erro e sem chave Riot no navegador.

## Como explorar

Este repositório contém uma aplicação web estática, com `index.html`, `app.js`, `style.css` e `backend-config.js`. Sirva os arquivos por HTTP:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. O acesso a dados reais exige disponibilidade do backend gamer e das APIs Riot.

## Qualidade

`npm install` prepara dependências de QA. O script `npm run check` inclui verificações estáticas e testes declarados no projeto.

## Interpretação responsável

**Correlação não é causalidade.** Diferenças entre derrotas e vitórias não provam por que uma partida foi perdida e não substituem análise de contexto, mapa, draft e decisões.

Projeto independente, não oficial, sem vínculo com Riot Games. Autor: [Hélio Conde](https://github.com/HelioConde).
