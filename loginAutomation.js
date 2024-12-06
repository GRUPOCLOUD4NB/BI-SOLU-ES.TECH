const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 }); // Lançar o navegador com um pouco de atraso para facilitar a visualização
  const page = await browser.newPage();

  // Define a senha como variável para utilizá-la depois
  const senha = '#29Xwy3H';

  // Acessa a página de login
  await page.goto('https://app.powerbi.com/reportEmbed?reportId=e55cdda1-fc49-48b5-b2e7-645002299c13&autoAuth=true&ctid=6c60811c-739e-4044-a1d3-8c56a8a50c87');
  
  // Espera o campo de email estar visível e preenche
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', '01625603@sempreuninassau.com.br');
  await page.click('input[type="submit"]'); // Clica no botão de enviar email

  // Espera o campo de senha estar visível e preenche com atraso
  await page.waitForSelector('#passwordInput'); // Espera o campo de senha
  await page.type('#passwordInput', senha, { delay: 100 });  // Atraso de 100ms entre cada caractere

  // Clica no botão "Entrar" (novo botão)
  await page.waitForSelector('#submitButton'); // Espera o botão "Entrar"
  await page.click('#submitButton'); // Clica no botão

  // Aguarda a navegação para a próxima página
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  // Imprime a senha exatamente como foi digitada, com distinção de maiúsculas e minúsculas
  console.log(`Senha utilizada: ${senha}`);

  // Mantenha o navegador aberto para inspecionar
})();
