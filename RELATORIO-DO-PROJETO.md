# Relatório da reformulação

Entrega em 13 de setembro de 2026.

## Resultado

40 páginas HTML padrão, 20 receitas preservadas e três novas páginas: catálogo geral, favoritos e erro 404. Substituição do runtime de protótipo por JavaScript simples. Identidade editorial com marfim, verde profundo, sálvia e terracota; títulos serifados e fonte de leitura local. Navegação, rodapé, formulários, páginas internas e ferramentas compartilham a nova identidade.

Foram examinadas a estrutura de arquivos, as 37 páginas originais, os scripts de suporte, os dados culinários e as ferramentas de imagens. As cópias antigas em “Design decisions checklist” são material de referência e não entram no pacote novo. Os originais das páginas também foram preservados no diretório de trabalho `.redesign-source`.

## Melhorias de experiência e marketing

- Proposta de valor e chamada principal claras na primeira tela.
- Busca com contexto de intenção: nome, ingrediente ou origem.
- Descoberta por regiões, pratos internacionais e artigos relacionados.
- Favoritos como recurso de retorno, sem exigir cadastro.
- Atalho para ingredientes, leitura sem JavaScript e modo cozinha.
- Contato honesto por e-mail; nenhuma confirmação fictícia de envio.
- Remoção de espaços vazios de anúncios e links comerciais sem destino.
- Política de privacidade e referências comerciais alinhadas ao funcionamento implementado.

As cores são uma decisão de direção visual e contraste, não uma alegação de preferência comprovada dos leitores. Não foram realizadas campanhas, pesquisa de palavras-chave com volume pago ou teste A/B. O impacto em conversão e tráfego deverá ser medido após a publicação.

## Validação realizada

- 40 páginas com um H1, título, descrição e idioma definidos.
- Links locais, recursos e âncoras encontrados.
- Nenhum transbordamento horizontal nas larguras de 390 e 1440 pixels.
- Nenhum erro de JavaScript registrado durante o percurso automatizado.
- Ingredientes e preparo disponíveis sem JavaScript.
- Nas 20 receitas: aumento/redução de porções, abertura, avanço e fechamento do modo cozinha.
- Busca com acentuação, busca por múltiplos ingredientes e estados vazios.
- Favoritos: adicionar, persistir ao recarregar e remover.
- Conversão de farinha (3 xícaras = 360 g), forno (200°C = 392°F), ajuste de porções e lista persistente de compras.
- Menu móvel e inspeção visual de início, receita e ferramentas.
- Axe-core, regras WCAG A/AA e 2.1 AA: nenhuma violação automatizada nas páginas inicial, feijoada, ferramentas, contato e catálogo após correções de contraste. Isso não equivale a certificação de acessibilidade.
- JSON-LD sintaticamente válido; a validação do Google em ambiente publicado não foi executada.

## Limites explícitos

Não houve publicação remota, cadastro no Search Console nem verificação da caixa de e-mail. O endereço de GitHub Pages no pacote foi assumido a partir do README anterior e pode ser alterado pelo script incluído.

As receitas receberam capas editoriais em CSS. As fotos de inspiração não são apresentadas como resultado dos pratos. Recipe JSON-LD sem `image` não está completo para resultados enriquecidos de receitas. Veja o README para completar essa etapa quando houver fotografias dos pratos.

Custos e informações nutricionais são estimativas herdadas do conteúdo. O conteúdo culinário não foi validado por preparo físico. Foram removidas afirmações não comprovadas de teste técnico das receitas. O guia de temperaturas usa a [tabela do USDA/FSIS](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart), distinguindo cortes inteiros, carne moída, aves e peixes.

## Referências

- [Google: guia de SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
- [Google: dados estruturados de receitas](https://developers.google.com/search/docs/appearance/structured-data/recipe).
- [Google: diretrizes de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- [GitHub: publicação do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

O relatório não atribui notas de Lighthouse nem garante ranking, pois essas medições e resultados não foram obtidos.
