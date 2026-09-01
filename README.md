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
