<div align="center">
  <h1>📉 LoL Loss Explorer</h1>
  <p><strong>Transforme derrotas recentes de League of Legends em perguntas melhores para sua próxima revisão.</strong></p>
  <p><img alt="Status" src="https://img.shields.io/badge/status-MVP%20experimental-64748b"> <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-Web-F7DF1E?logo=javascript&logoColor=black"></p>
</div>

## A proposta

Em vez de culpar uma partida isolada, o **Loss Explorer** compara **derrotas e vitórias** recentes da sua própria conta e destaca diferenças observáveis de desempenho para orientar uma revisão.

## O que você encontra

| Área | Leitura |
| --- | --- |
| **Busca** | Riot ID e servidor |
| **Recorte** | Até 40 partidas elegíveis retornadas pelo backend |
| **Indicadores** | KDA, mortes, farm/minuto e visão/minuto |
| **Contexto** | Campeão, rota e duração das derrotas |
| **Padrões** | Diferenças recorrentes com indicação da amostra |
| **Idiomas** | Português e inglês |

A interpretação correta é **descritiva, não causal**. Uma diferença de KDA não comprova por que alguém perdeu; mapa, draft, objetivos e decisões continuam relevantes. Amostras pequenas devem ser tratadas com cautela.

## Experimentar localmente

O site é estático e requer a API remota para obter partidas reais:

```bash
git clone https://github.com/HelioConde/lol-loss-explorer.git
cd lol-loss-explorer
python -m http.server 8000
```

Abra `http://localhost:8000`. Para as verificações existentes:

```bash
npm install
npm run check
npm run test:e2e
```

Este repositório contém `app.js`, `backend-config.js`, `index.html`, `style.css` e páginas informativas. A chave privada Riot deve permanecer no servidor.

## Estado e evolução

**MVP experimental.** Prioridades: comparar com mais contas e modos de jogo, revisar comportamento mobile, assegurar interpretação clara dos dados e conferir a API em produção. Não há promessa de coaching automático nem previsão de vitórias.

Projeto independente, não endossado pela Riot Games. Desenvolvido por [Hélio Conde](https://github.com/HelioConde).
