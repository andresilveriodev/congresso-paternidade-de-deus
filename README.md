echo "# congresso-paternidade-de-deus" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/andresilveriodev/congresso-paternidade-de-deus.git
git push -u origin main

## Fluxo de inscrição

Os botões de inscrição usam `NEXT_PUBLIC_REGISTRATION_URL` para abrir a página de inscrição da CiaTicket.

Na plataforma de inscrição, configure a página de redirecionamento após a compra aprovada para:

```text
https://SEU-DOMINIO.com/pt/inscricao
```

Após o participante enviar o formulário, a confirmação aparece por 6 segundos e o site volta automaticamente para a página inicial.

## Galeria de fotos e vídeos

A seção aparece antes dos conferencistas. O passo a passo para configurar a pasta do Google Drive e a playlist do YouTube, os comandos de preparação, os limites do MVP e as validações estão em [GALERIA-CONGRESSO-CONFIGURACAO.md](GALERIA-CONGRESSO-CONFIGURACAO.md).

O envio direto de fotos é feito pelo painel `/admin/galeria`, com acesso por senha e armazenamento privado na Vercel. A ativação, os testes locais e o uso diário estão em [PAINEL-FOTOS.md](PAINEL-FOTOS.md).
