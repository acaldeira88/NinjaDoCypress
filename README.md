# Ninja do Cypress — Testes automatizados do WebDojo

Projeto de testes automatizados end-to-end da aplicação **WebDojo**, escritos em [Cypress](https://www.cypress.io/).
A aplicação sob teste está no próprio repositório (pasta `webdojo/`), o que permite subir o ambiente e rodar os testes localmente sem dependências externas.

---

## Sumário

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Subindo a aplicação](#subindo-a-aplicação)
- [Executando os testes](#executando-os-testes)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Configuração do Cypress](#configuração-do-cypress)
- [Comandos customizados](#comandos-customizados)
- [Fixtures](#fixtures)
- [Suítes de teste](#suítes-de-teste)
- [Boas práticas adotadas](#boas-práticas-adotadas)

---

## Requisitos

| Ferramenta | Versão sugerida |
|---|---|
| Node.js | 18+ |
| npm | 9+ |
| Cypress | ^15.21.1 (instalado via devDependencies) |

Dependências de apoio: `cypress-real-events` (eventos reais de mouse/teclado) e `dayjs`.

---

## Instalação

```bash
git clone <url-do-repositorio>
cd NinjaDoCypress
npm install
```

---

## Subindo a aplicação

Os testes rodam contra a aplicação WebDojo em `http://localhost:3000`. Antes de executar a suíte, suba a aplicação:

```bash
npm run dev
```

> Mantenha esse processo rodando em um terminal separado enquanto executa os testes.

---

## Executando os testes

| Comando | Descrição |
|---|---|
| `npm test` | Executa toda a suíte em modo headless (`npx cypress run`) |
| `npm run test:ui` | Abre o Cypress em modo interativo (`npx cypress open`) |
| `npm run test:login` | Executa apenas a suíte de login |

Exemplos úteis fora dos scripts:

```bash
# Rodar um spec específico
npx cypress run --spec cypress/e2e/consultancy.cy.js

# Rodar em um navegador específico
npx cypress run --browser chrome

# Rodar apontando para outra URL base
npx cypress run --config baseUrl=http://localhost:3001
```

Artefatos gerados na execução:

- **Vídeos**: `cypress/videos/` (gravação habilitada por padrão)
- **Screenshots**: `cypress/screenshots/` (capturados automaticamente em falhas)

---

## Estrutura do projeto

```
NinjaDoCypress/
├── cypress/
│   ├── e2e/                          # Specs de teste
│   │   ├── alerts.cy.js
│   │   ├── cep.cy.js
│   │   ├── consultancy.cy.js
│   │   ├── github.cy.js
│   │   ├── hover.cy.js
│   │   ├── iframe.cy.js
│   │   ├── kanban.cy.js
│   │   ├── links.cy.js
│   │   └── login.cy.js
│   ├── fixtures/                     # Massa de dados
│   │   ├── cep.json
│   │   ├── consultancy.json
│   │   ├── document.pdf              # Arquivo usado em upload
│   │   └── example.json
│   ├── screenshots/                  # Gerado nas falhas
│   ├── support/
│   │   ├── actions/
│   │   │   └── consultancy.actions.js  # Ações de negócio do formulário
│   │   ├── commands.js               # Comandos customizados globais
│   │   ├── e2e.js                    # Arquivo de suporte carregado antes dos testes
│   │   └── utils.js                  # Funções auxiliares (ex.: dataDeHoje)
│   └── videos/                       # Gerado na execução
├── webdojo/                          # Aplicação sob teste
├── cypress.config.js
└── package.json
```

---

## Configuração do Cypress

`cypress.config.js`:

| Opção | Valor | Motivo |
|---|---|---|
| `baseUrl` | `http://localhost:3000` | Permite usar caminhos relativos em `cy.visit()` |
| `viewportWidth` / `viewportHeight` | `1440 x 900` | Resolução desktop padronizada |
| `video` | `true` | Grava a execução para análise posterior |
| `experimentalStudio` | `true` | Habilita o Cypress Studio para gerar testes pela UI |
| `experimentalFastVisibility` | `true` | Melhora a performance das checagens de visibilidade |

---

## Comandos customizados

Definidos em `cypress/support/commands.js` e `cypress/support/actions/`.

### Navegação e autenticação

| Comando | Assinatura | Descrição |
|---|---|---|
| `cy.start()` | — | Acessa a raiz da aplicação (`/`) |
| `cy.submitLoginForm(email, password)` | `(string, string)` | Preenche e submete o formulário de login |
| `cy.goTo(buttonName, pageTitle)` | `(string, string)` | Clica no menu indicado e valida o `h1` da página destino |
| `cy.login(ui)` | `(boolean = false)` | Autentica no sistema |

Sobre `cy.login()`:

- `cy.login(true)` — login **via interface**, usando as credenciais `papito@webdojo.com` / `katana123`. Use quando o objetivo do teste é a própria tela de login.
- `cy.login()` — login **programático**: grava o cookie `login_date` com a data atual e injeta o `token` no `localStorage` antes de visitar `/dashboard`. É a forma recomendada nos demais testes, por ser mais rápida e estável.

### Formulário de consultoria

| Comando | Descrição |
|---|---|
| `cy.fillConsultancyForm(form)` | Preenche todo o formulário a partir de um objeto de fixture: nome, e-mail, telefone (validando a máscara), tipo de consultoria, pessoa física/jurídica, canais de descoberta, upload de arquivo, descrição, tecnologias e aceite dos termos |
| `cy.subimitConsultancyForm()` | Clica em "Enviar formulário" |
| `cy.valideConsultancyMModal()` | Valida a modal de sucesso e sua mensagem (timeout de 70s, pois o envio é lento) |

### Utilitários

`cypress/support/utils.js`:

- `dataDeHoje()` — retorna a data atual no formato `DD/MM/AAAA`, usada no cookie de login.

---

## Fixtures

| Arquivo | Uso |
|---|---|
| `consultancy.json` | Massa do formulário de consultoria (cenários `personal` / In Company) |
| `cep.json` | CEP e endereço esperado, usado no mock da API ViaCEP |
| `document.pdf` | Arquivo enviado no campo de upload do formulário |
| `example.json` | Fixture padrão do Cypress |

---

## Suítes de teste

| Spec | Foco | Cenários |
|---|---|---|
| `login.cy.js` | Autenticação | Login com sucesso; senha inválida; e-mail inválido |
| `consultancy.cy.js` | Formulário complexo | Consultoria individual; consultoria In Company; validação de campos obrigatórios |
| `cep.cy.js` | Integração / API | Consulta de CEP com `cy.intercept` mockando a ViaCEP; retorno vazio |
| `github.cy.js` | Tabelas | Adição e remoção de perfis do GitHub, com validação das linhas da tabela |
| `alerts.cy.js` | Alertas JS | `alert`, `confirm` (confirmar e cancelar) e `prompt` |
| `kanban.cy.js` | Drag and drop | Mover tarefa de "Todo" para "Done" e validar o board |
| `iframe.cy.js` | iframe | Reproduzir o vídeo de exemplo dentro do iframe |
| `hover.cy.js` | Mouseover | Exibição do texto ao passar o mouse sobre o link do Instagram |
| `links.cy.js` | Links externos | Validação dos atributos `href`/`target` sem sair da aplicação |

---

## Boas práticas adotadas

- **Login programático por padrão**, reservando o fluxo via UI para os testes de autenticação.
- **Comandos customizados e camada de actions** (`support/actions/`) para manter os specs legíveis e focados em regras de negócio.
- **Fixtures externas** — nenhum dado de teste é escrito diretamente nos specs.
- **`cy.intercept` para integrações externas**, evitando dependência da disponibilidade da ViaCEP e permitindo testar cenários de retorno vazio.
- **Validação de links externos por atributo**, em vez de abrir novas abas — abordagem recomendada pelo Cypress.
- **Asserções junto às ações** (`.should('be.checked')`, `.should('have.value', ...)`), garantindo o estado real da interface.

---

## Troubleshooting

| Problema | Solução |
|---|---|
| `cy.visit()` falha com erro de conexão | A aplicação não está rodando — execute `npm run dev` |
| Testes de consultoria com timeout | O envio do formulário é lento; o timeout já é de 70s, verifique se a API do WebDojo está de pé |
| Login programático falhando | O token pode ter expirado no ambiente; use `cy.login(true)` para login via UI |
