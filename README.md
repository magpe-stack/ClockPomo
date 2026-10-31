# Manual de Operação e Guia de Uso — ClockPomo

---

## 1. Visão Geral do Sistema
O ClockPomo é um aplicativo Web progressivo (PWA) minimalista, desenvolvido para funcionar como uma estação de controle de tempo de alta performance. Ele combina um Relógio Digital em tempo real com um Temporizador Pomodoro, contando com suporte nativo a temas (Claro e Escuro), paleta de cores institucional em vermelho e branco (#e63946), e capacidade de funcionamento offline via Service Worker.

O projeto foi estruturado em arquivos independentes de código limpo, otimizados para hospedagem estática direta em servidores.

---

## 2. Estrutura de Arquivos

Para que o ClockPomo funcione perfeitamente, o repositório deve conter exatamente a seguinte lista de arquivos na raiz:

- index.html: Interface de usuário principal e estrutura HTML5
- style.css: Estilização modular com variáveis de tema (Dark/Light)
- app.js: Lógica de controle, relógio, pomodoro e registro PWA
- manifest.json: Configurações do manifesto PWA para instalação no sistema
- sw.js: Service Worker para cache e modo offline
- icon-192.png: Ícone PWA de alta densidade (192x192 px)
- icon-512.png: Ícone PWA principal (512x512 px)

---

## 3. Descrição dos Módulos e Componentes

### 3.1. Interface e Navegação (index.html)
- Cabeçalho: Contém o logotipo/título do app (ClockPomo) e o botão interativo de alternância de tema (🌙 / ☀️).
- Barra de Abas: Permite alternar instantaneamente entre a visualização do Relógio e a do Pomodoro sem recarregar a página.
- Meta Tags PWA: Configurado com suporte a visualização autônoma (display: standalone), cor de tema dinâmica e favicon embutido/escalável.

### 3.2. Estilização e Temas (style.css)
O design utiliza propriedades CSS Customizadas (:root) para gerenciar as paletas de cores de forma fluida:
- Tema Escuro (Padrão): Fundo profundo (#121212) com cartões em cinza escuro (#1e1e1e), texto em branco puro e destaque em vermelho vivo (#e63946).
- Tema Claro: Fundo cinza-claro (#f4f6f9), cartões totalmente brancos, texto contrastante (#2b2d42) e detalhes em vermelho forte (#d90429).
- Transições: Efeitos de mudança suave (transition: 0.3s ease) aplicados em todas as mudanças de estado e cores.

### 3.3. Lógica Operacional (app.js)
- Relógio Digital: Atualizado a cada segundo (setInterval de 1000ms), exibindo o horário no formato HH:MM:SS acompanhado da data completa por extenso em português do Brasil (pt-BR).
- Timer Pomodoro: 
  * Modos pré-configurados: Foco (25m), Pausa Curta (5m) e Pausa Longa (15m).
  * Dinâmica de estados: Os botões de modo ficam bloqueados durante a contagem ativa para evitar conflitos de tempo.
  * Título Dinâmico da Aba: O navegador exibe a contagem regressiva diretamente na aba ((25:00) ClockPomo) para monitoramento em segundo plano.
- Registro PWA: Inicialização automática do sw.js via JavaScript para armazenamento em cache local.
