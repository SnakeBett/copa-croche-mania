

## Simplificar Depoimentos - Apenas Imagens

Remover os blocos/cards dos depoimentos (texto, estrelas, nome, cidade) e exibir apenas as imagens dos avatares em um grid limpo.

### O que muda

- Remover os cards com borda, sombra, texto do depoimento, estrelas, nome e cidade
- Mostrar apenas as 8 imagens dos avatares em um grid responsivo (ex: 2 colunas no mobile, 4 no desktop)
- Remover o carrossel (setas e paginacao), ja que todas as imagens cabem na tela de uma vez
- Manter o titulo da secao
- As imagens ficam maiores e com cantos arredondados para destaque

### Detalhes tecnicos

- Simplificar o array `testimonials` para conter apenas as 8 imagens unicas (remover duplicatas dos avatares 1-4 que se repetem nos depoimentos 9-12)
- Remover os estados `current`, `perPage` e o `useEffect` do carrossel
- Remover imports de `Star`, `ChevronLeft`, `ChevronRight`, `useState`, `useEffect`
- Substituir o layout por um grid simples: `grid grid-cols-2 md:grid-cols-4 gap-4`
- Cada imagem com `rounded-xl shadow-md` e tamanho adequado

