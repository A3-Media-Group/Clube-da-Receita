# Clube da Receita — site completo em HTML

Redesign editorial com 40 páginas, incluindo 20 receitas, cinco regiões brasileiras, receitas internacionais, blog, ferramentas, busca por ingredientes, favoritos e páginas institucionais. HTML, CSS e JavaScript puro. Não exige instalação, compilação, React nem servidor de aplicação. Fontes e fotografias são locais.

## Publicar no GitHub Pages

1. Extraia `Clube-da-Receita-Profissional.zip`.
2. Envie o CONTEÚDO extraído para a raiz do repositório: `index.html` deve ficar diretamente na raiz, acompanhado de `assets`, demais HTML, `robots.txt`, `sitemap.xml` e `.nojekyll`.
3. Abra **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Selecione a branch com os arquivos (geralmente `main`), pasta **/(root)** e clique em **Save**.
5. Aguarde o GitHub informar o endereço publicado. A configuração segue a [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

O endereço usado nos metadados é `https://a3-media-group.github.io/Clube-da-Receita/`, deduzido do repositório mencionado no README anterior. A publicação e a titularidade desse endereço NÃO foram verificadas. Se o seu endereço for diferente, ajuste antes de publicar.

## Alterar o endereço do site

Execute, na pasta extraída, com Node.js instalado:

```sh
node scripts/configure-site.cjs https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
```

Para domínio próprio, use o endereço final, por exemplo `https://clubedareceita.com.br/`. O comando atualiza canonical, Open Graph, breadcrumbs, artigos, sitemap e robots. Node é necessário apenas para essa configuração opcional; o site publicado não depende dele. Sem Node, substitua o endereço-base nos HTML, no sitemap.xml e no robots.txt usando um editor.

`site-config.json` registra a configuração; alterá-lo sozinho não atualiza as páginas. Não publique a mesma cópia em dois endereços sem escolher qual será o canonical.

## Arquivos principais

- `index.html`: página inicial.
- `assets/site.css`: cores, fontes, layouts e regras responsivas.
- `assets/site.js`: busca, favoritos, porções, modo cozinha, contato e ferramentas.
- `assets/recipe-*.js`: dados e cálculos específicos das receitas.
- `assets/tools-logic.js`: conversões, substituições, compras e temperaturas.
- `assets/photos/`: fotografias WebP e versões menores, com registro de fontes.
- `assets/fonts/`: fonte DM Sans local e licença OFL. Títulos em Georgia, fonte de sistema.
- `Receita-*.dc.html`: receitas completas, editáveis diretamente.
- `Home.dc.html`: endereço antigo preservado, com noindex e canonical para o início.
- `scripts/configure-site.cjs`: configuração do endereço público.
- `RELATORIO-DO-PROJETO.md`: decisões, validação e limites da entrega.

## Funcionalidades

A busca ignora diferenças de acentuação. Na geladeira, separe ingredientes por vírgula: os resultados devem conter todos os termos. Isso sugere pratos, mas não significa que você possui todos os ingredientes necessários.

Favoritos e lista de compras ficam no armazenamento local do navegador. Não há conta nem sincronização entre aparelhos. Se o armazenamento estiver bloqueado, favoritos funcionam temporariamente e o site avisa.

As 20 receitas permitem ajustar de 1 a 24 porções, marcar ingredientes, calcular custos dos itens principais, imprimir e abrir o modo cozinha. O modo cozinha aceita as setas e Esc. A escala usa valores proporcionais; quantidades fracionárias de ovos podem exigir pesagem. Custos incluem estimativas simplificadas para ingredientes secundários, preservando o modelo original. O ajustador demonstrativo da página de ferramentas mantém arredondamento de unidades.

O formulário de contato prepara um e-mail em seu aplicativo. Não simula envio nem possui servidor. O endereço `contato@clubedareceita.com.br` veio do projeto original; confirme a caixa postal antes de divulgação.

## SEO e conteúdo

Títulos e descrições por página, idioma pt-BR, HTML semântico, conteúdo de receitas disponível sem JavaScript, navegação interna, canonical, Open Graph, sitemap e dados estruturados de receitas, artigos e breadcrumbs. Implementação orientada pelo [guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) e pela [documentação de receitas](https://developers.google.com/search/docs/appearance/structured-data/recipe).

Após publicar, cadastre o endereço no Google Search Console e envie `sitemap.xml`. O site não contém Google Analytics, AdSense, pixels ou newsletter. Essas integrações exigem configuração específica e atualização da política de privacidade.

As receitas usam capas tipográficas, sem atribuir fotos genéricas aos pratos. As fotografias editoriais da página inicial ilustram momentos e ingredientes. O JSON-LD Recipe NÃO declara uma imagem do prato, pois os originais não tinham essas fotos: isso limita a elegibilidade para resultados enriquecidos de receitas do Google. Para habilitá-los, adicione fotos reais e correspondentes de cada prato, inclua URLs absolutas em `image` e valide no Rich Results Test. Não foram inventadas avaliações, estrelas, datas ou testes culinários.

SEO técnico não garante indexação, posições, tráfego ou conversões. Autoridade editorial, fotos próprias, revisão das receitas e publicação consistente continuam importantes. As receitas não foram preparadas fisicamente nesta tarefa.

## Edição

Mantenha os nomes dos arquivos `.dc.html` para preservar os links existentes. Apesar da extensão, todos agora são HTML padrão. Ao editar ingredientes ou etapas, atualize tanto o HTML e seu JSON-LD quanto o arquivo `assets/recipe-Nome.js`, mantendo o modo cozinha e a escala consistentes.

O pacote limpo não inclui as cópias antigas, arquivos de protótipo, node_modules, credenciais ou dependências de desenvolvimento. Não é necessário publicar o diretório de trabalho inteiro.
