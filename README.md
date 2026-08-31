# Controle de Notas

App de página única para acompanhar notas por pontos: mostra quantos pontos faltam
para passar (padrão 60%) em cada trimestre, por matéria e por perfil.

- **Vários perfis** no mesmo endereço (Fulano, Ciclano…), cada um com suas matérias e notas.
- Salva sozinho **no navegador do aparelho** (não sincroniza entre aparelhos — não há login/nuvem).
- Funciona **offline** depois da primeira visita e pode ser **instalado como app** no Android e no iOS.

## Arquivos

| Arquivo | Para quê |
|---|---|
| `index.html` | o app inteiro (HTML + CSS + JS, sem dependências) |
| `manifest.webmanifest` | nome, cores e ícones do app instalado |
| `sw.js` | service worker — faz abrir offline |
| `icon.svg` / `icon-maskable.svg` | ícone (vetor) |
| `icons.html` | abra uma vez para **gerar os PNGs** `icon-192.png`, `icon-512.png` e `apple-touch-icon.png` (melhora o ícone no iPhone) |
| `.nojekyll` | evita o processamento Jekyll no GitHub Pages |

## Publicar no GitHub Pages

### Opção A — pelo site do GitHub (sem instalar nada)

1. Crie uma conta em <https://github.com> (se ainda não tiver).
2. **New repository** → nome, por exemplo, `controle-de-notas` → **Public** → **Create repository**.
3. Na página do repositório: **Add file → Upload files**. Arraste **todo o conteúdo desta pasta**
   (`index.html`, `manifest.webmanifest`, `sw.js`, `icon.svg`, `icon-maskable.svg`, `icons.html`, `.nojekyll`)
   e clique em **Commit changes**.
4. **Settings → Pages** → em *Build and deployment*, *Source* = **Deploy from a branch**,
   *Branch* = **main** e pasta **/(root)** → **Save**.
5. Aguarde ~1 minuto e recarregue a página **Settings → Pages**. O endereço aparece no topo:
   `https://SEU-USUARIO.github.io/controle-de-notas/`
6. (Opcional, ícone no iPhone) Abra `https://SEU-USUARIO.github.io/controle-de-notas/icons.html`,
   baixe os 3 PNGs, faça **Upload files** deles no repositório e commite.

### Opção B — pela linha de comando (git)

```sh
cd controle-de-notas
git init
git add .
git commit -m "Controle de Notas"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/controle-de-notas.git
git push -u origin main
```

Depois faça o passo 4 acima (**Settings → Pages**).

## Instalar como app

O endereço precisa ser `https://` (o GitHub Pages já é).

- **iPhone / iPad (Safari):** abra o link → botão **Compartilhar** → **Adicionar à Tela de Início**.
  Abre em tela cheia, com ícone próprio.
- **Android (Chrome):** abra o link → menu **⋮** → **Instalar app** (ou **Adicionar à tela inicial**).
- **Computador (Chrome/Edge):** ícone de instalar na barra de endereço.

## Atualizar o app depois

Suba a nova versão do `index.html` (e o que mais mudar). Ao trocar o `index.html`,
edite também a linha `var CACHE = "controle-notas-v1";` em `sw.js` para `v2`, `v3`, …
Isso força os aparelhos já instalados a baixarem a versão nova.

## Dados dos usuários

Ficam em `localStorage`, por navegador/aparelho, na chave `controle-notas-v2`.
Cada pessoa só enxerga os próprios perfis, no aparelho dela. Limpar os dados do site
(ou desinstalar o app) apaga tudo daquele aparelho.
