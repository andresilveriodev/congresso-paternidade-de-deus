# Envio de fotos do Congresso

## Usar o painel

Endereço: `https://congressopaieterno.com.br/admin/galeria`.

1. Entre com a senha de acesso.
2. Selecione as fotos, ou arraste-as para o painel. É possível selecionar até 100 fotos por remessa.
3. Se quiser, preencha o dia ou álbum.
4. Clique em **Publicar fotos** e mantenha a página aberta até o envio terminar.
5. A confirmação aparece individualmente em cada foto. Se uma falhar, as demais continuam sendo enviadas; clique em publicar novamente para tentar as que falharam.

O painel aceita JPG, PNG e WebP de até 20 MB e 40 megapixels por foto. Prepara uma versão de até 1920 px antes do envio; o servidor valida e gera WebP e miniatura sem cortar a imagem e sem metadados EXIF/GPS. O arquivo original no computador não é modificado. HEIC e arquivos animados não são suportados.

As fotos novas entram antes das 29 imagens já incluídas no projeto (13 da primeira remessa e 16 da segunda). A galeria mantém três imagens por vez no computador, rolagem horizontal e ampliação ao clicar. Páginas abertas buscam novidades a cada 30 segundos enquanto estiverem visíveis e ao voltar para a aba. Uma outra aba do mesmo navegador também recebe a notificação do painel. Não é necessário fazer commit ou nova publicação para cada remessa. Reenviar a mesma imagem preparada não cria outra cópia.

## Hospedagem identificada

Apesar do `netlify.toml` legado, as publicações do repositório no GitHub apontam para a **Vercel**, projeto `congresso-paternidade-de-deus`, equipe `andreadams-projects`. Por isso o envio direto utiliza um **Vercel Blob privado**. Não é necessário configurar o Google Drive para esse fluxo.

Referências oficiais:

- [Armazenamento privado e criação do Blob](https://vercel.com/docs/vercel-blob/private-storage)
- [SDK do Vercel Blob](https://vercel.com/docs/vercel-blob/using-blob-sdk)

## Ativação inicial na Vercel

1. Abra o projeto na Vercel e conecte um armazenamento **Blob privado** pela área **Storage**. Conecte-o ao ambiente **Production**. A integração cria a variável de servidor `BLOB_READ_WRITE_TOKEN` automaticamente. Não crie um armazenamento público para esta implementação.
2. Prepare o acesso localmente com `npm run galeria:painel`. O comando gera uma senha forte e as duas configurações de autenticação sem exibir seus valores no terminal.
3. Configure `GALLERY_ADMIN_PASSWORD_HASH` e `GALLERY_SESSION_SECRET` no ambiente **Production** do projeto. Os valores estão no arquivo privado `output/galeria-vercel.env`, pronto para copiar/importar no painel de variáveis. Não envie o arquivo ao GitHub ou pelo chat.
4. Em produção, deixe `GALLERY_STORAGE` ausente ou com valor `vercel`. O modo `local` é exclusivo dos testes e nunca grava no disco da função em produção.
5. Publique o código atualizado ou faça um novo deploy depois de configurar as variáveis. Abra `/admin/galeria`, entre com a senha de `output/galeria-acesso.txt` e faça um envio de conferência.

A criação do Blob e a configuração das variáveis dependem do acesso à conta da Vercel. Sem isso, o site mantém as fotos existentes e o painel informa que o acesso ou o armazenamento precisam ser ativados. A implementação local não comprova a ativação do armazenamento em produção.

## Testes locais

```powershell
npm run galeria:painel -- --local
npm run dev
```

Abra `http://localhost:3000/admin/galeria`. O modo local usa apenas `output/galeria-dados`, fora do Git, e mostra um aviso no painel. Esses envios não são enviados à Vercel. A senha está em `output/galeria-acesso.txt`. Não é preciso criar um Blob de produção para testar a interface, autenticação, processamento e atualização da galeria.

Para gerar outra senha: `npm run galeria:painel -- --reset-password`. Depois atualize as duas variáveis na Vercel e publique novamente. Trocar o hash ou o segredo invalida as sessões anteriores. O comando preserva as demais configurações de `.env.local`.

## Operação e limites

- O armazenamento persistente contém as versões WebP e um catálogo. O catálogo só é atualizado depois que ambas as imagens foram gravadas. Atualizações concorrentes na Vercel usam ETag e `ifMatch`, com tentativas limitadas para evitar perda de registros.
- O catálogo privado é lido da origem (`useCache: false`) e usa cache do Next por 30 segundos. Um envio confirmado invalida esse cache. Imagens usam caminhos com hash do conteúdo, impedindo troca do conteúdo de um endereço por outra foto.
- O token do Blob, o hash de senha e o segredo de sessão ficam somente no servidor. O público recebe os metadados das fotos e versões reprocessadas pelos endpoints do site; o catálogo e as credenciais não são disponibilizados diretamente.
- A sessão dura oito horas, com cookie `HttpOnly`, `SameSite=Strict` e `Secure` em HTTPS. Os endpoints de escrita validam autenticação e origem. O login limita tentativas por instância; o uso em alto volume pode exigir proteção compartilhada adicional.
- As requisições de envio são individuais, limitadas a 3 MB por imagem já preparada. Isso permite enviar lotes sem ultrapassar o limite de corpo por requisição da hospedagem.
- Limite inicial: 2.000 fotos enviadas pelo painel, além das fotos do projeto e eventual integração do Drive. Para volumes maiores, evoluir o catálogo e a paginação.
- O consumo de armazenamento, operações e tráfego segue o plano da Vercel. O painel não altera o plano nem contrata capacidade adicional.
- Remover da seleção e limpar publicadas apenas limpam o painel; não apagam fotos já publicadas.
- Os vídeos permanecem ocultos até a ativação de `NEXT_PUBLIC_CONGRESS_VIDEOS_ENABLED`.
- O projeto foi atualizado para Next.js 16.4.6 e Sharp 0.35.5 durante a implementação para corrigir os alertas de segurança das versões anteriores. O SDK do Blob usa a correção `@vercel/cli-config` 0.3.8 por override, sem alterar o plano da hospedagem.
