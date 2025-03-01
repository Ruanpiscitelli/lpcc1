'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../../styles/LandingPage.module.css';
import transcriptStyles from '../../styles/Transcript.module.css';
import FooterAccordion from '../../components/FooterAccordion';
import CtaButton from '../../components/CtaButton';
import SingleCtaButton from '../../components/SingleCtaButton';

export default function TranscriptPage() {
  return (
    <div className={styles.frame}>
      <div className={styles.body}>
        {/* Barra de aviso fixa no topo */}
        <div className={styles.background2}>
          <p className={styles.warningText}>Ex-entregador de gás QUEBRA O SILÊNCIO e alerta sobre o colapso iminente da sua aposentadoria...</p>
        </div>
        
        {/* Conteúdo principal */}
        <div className={styles.main}>
          <div className={styles.container}>
            {/* Cabeçalho com boxes vermelho e branco */}
            <header className={styles.header}>
              {/* Box vermelho */}
              <div className={styles.backgroundBorder}>
                <div className={styles.heading}>
                  <div className={styles.overlapGroup}>
                    <div className={styles.reignOfTerror}>A Bomba-Relógio da Aposentadoria do Servidor</div>
                  </div>
                </div>
              </div>
              
              {/* Box branco */}
              <div className={styles.background}>
                <div className={styles.headingStrongNo}>
                  <div className={styles.headingMain}>Nesse exato momento seu patrimônio tá derretendo...</div>
                  <div className={styles.headingSecondary}>mas eu tenho a solução!</div>
                </div>
                <div className={styles.takeFourWrapper}>
                  <div className={styles.takeFour}>
                    <span>Aplique esse sistema de </span>
                    <span className={styles.textBold}>três cliques</span>
                    <span> para proteger seu patrimônio — </span>
                    <span className={styles.textBold}>ENQUANTO AINDA DÁ TEMPO!</span>
                  </div>
                </div>
              </div>
              
              {/* Triângulo branco */}
              <div className={styles.border}></div>
              
              {/* Borda gradiente (visível apenas no desktop) */}
              <div className={styles.gradientBorder}></div>
            </header>
            
            {/* Conteúdo da transcrição */}
            <div className={transcriptStyles.transcriptContainer}>
              <div className={transcriptStyles.transcriptHeader}>
                <h2>Transcrição Completa do Vídeo</h2>
                <p className={transcriptStyles.transcriptSubheader}>
                  Prefere assistir ao vídeo? <Link href="/cf1" className={transcriptStyles.videoLink}>Clique aqui para voltar</Link>
                </p>
              </div>
              
              <div className={transcriptStyles.transcriptContent}>
                <h1 className={transcriptStyles.mainTitle}>COPY CASH: A Tecnologia Revolucionária Que Está Transformando Pessoas Comuns Em Geradores De Riqueza</h1>
                
                <div className={transcriptStyles.imageContainer}>
                  <p className={transcriptStyles.imageCaption}>(Imagem de relógios de luxo totalizando R$75.000)</p>
                </div>
                
                <p className={transcriptStyles.highlight}><strong>R$15.000... R$25.000... R$35.000... 75 mil reais em apenas três relógios.</strong></p>
                
                <p>Você já imaginou ter tanto dinheiro sobrando que poderia comprar relógios de luxo sem nem sentir falta do valor? E se eu te dissesse que isso é apenas uma pequena amostra do que é possível quando você tem a tecnologia certa trabalhando para você?</p>
                
                <h2 className={transcriptStyles.attentionTitle}>PARE AGORA E LEIA ESTA CARTA COM ATENÇÃO</h2>
                
                <p>O que vou revelar aqui mudou completamente a minha vida e já transformou a realidade de centenas de pessoas comuns por todo o Brasil. Se você está:</p>
                
                <ul className={transcriptStyles.checkList}>
                  <li><strong>✓ Cansado de trabalhar o mês inteiro para mal conseguir pagar as contas</strong></li>
                  <li><strong>✓ Frustrado por ver seu salário acabar antes do fim do mês</strong></li>
                  <li><strong>✓ Endividado e sem conseguir enxergar uma saída</strong></li>
                  <li><strong>✓ Adiando seus sonhos de viagem, carro novo ou casa própria</strong></li>
                  <li><strong>✓ Sem tempo para família porque precisa fazer hora extra</strong></li>
                  <li><strong>✓ Preocupado como vai pagar a faculdade dos seus filhos</strong></li>
                  <li><strong>✓ Angustiado com a ideia de nunca conseguir se aposentar confortavelmente</strong></li>
                </ul>
                
                <p>Então você PRECISA conhecer o sistema que estou prestes a revelar.</p>
                
                <h2 className={transcriptStyles.sectionTitle}>A REALIDADE CRUEL DO BRASILEIRO COMUM</h2>
                
                <p>Vamos ser honestos. A vida financeira da maioria dos brasileiros é uma batalha constante:</p>
                
                <blockquote className={transcriptStyles.testimonial}>
                  <p><em>&ldquo;Mês passado tive que escolher entre pagar o cartão de crédito e comprar o material escolar do meu filho...&rdquo;</em></p>
                  
                  <p><em>&ldquo;Já são 3 anos sem conseguir tirar férias porque o dinheiro nunca sobra...&rdquo;</em></p>
                  
                  <p><em>&ldquo;Tenho 45 anos e ainda não consegui dar entrada na minha casa própria...&rdquo;</em></p>
                  
                  <p><em>&ldquo;Meu carro quebrou e não tenho dinheiro para o conserto, agora preciso pegar 3 ônibus para chegar ao trabalho...&rdquo;</em></p>
                </blockquote>
                
                <p>Essas são histórias REAIS que ouço todos os dias. E o mais triste? A maioria das pessoas aceita que essa é a vida &ldquo;normal&rdquo;. Trabalhar como um condenado, de segunda a sexta (às vezes até no fim de semana), apenas para sobreviver até o próximo pagamento.</p>
                
                <p className={transcriptStyles.highlight}><strong>É por isso que nunca conseguem sair desse ciclo vicioso.</strong></p>
                
                <h2 className={transcriptStyles.sectionTitle}>O ESTALO QUE MUDOU MINHA VIDA PARA SEMPRE</h2>
                
                <p>Muito prazer, meu nome é <strong>William Akseni</strong>, e hoje sou reconhecido como o &ldquo;gerador de riqueza em dólar&rdquo; por ganhar quantias surpreendentes no mercado financeiro, mesmo morando no Brasil.</p>
                
                <p>Mas nem sempre foi assim...</p>
                
                <p>Há 7 anos, eu entregava botijões de gás de sol a sol, carregando peso o dia inteiro, suando a camisa para ganhar uma miséria no fim do mês. Meu celular era um modelo básico parcelado em 12 vezes, andava numa moto velha que vivia quebrando, e usava as roupas mais baratas que encontrava.</p>
                
                <p>Enquanto isso, via meus amigos comemorando em restaurantes caros, trocando de carro, viajando para o exterior... e eu? Não podia nem sonhar com isso.</p>
                
                <p className={transcriptStyles.highlight}><strong>Até que um dia, ouvi uma frase que mudou completamente minha mentalidade:</strong></p>
                
                <blockquote className={transcriptStyles.keyQuote}>
                  <p><strong>&ldquo;Você nunca vai enriquecer apenas trocando seu tempo por dinheiro.&rdquo;</strong></p>
                </blockquote>
                
                <p>Aquilo foi como um soco no estômago. Pela primeira vez, percebi que não importava o quanto eu me esforçasse como entregador de gás, nunca conseguiria a vida que realmente desejava. O sistema simplesmente não foi feito para isso.</p>
                
                <p>Foi quando comecei a buscar alternativas. Estudei durante noites inteiras. Testei dezenas de métodos. Investi em cursos que não me levaram a lugar nenhum. Gastei dinheiro que não tinha em promessas vazias...</p>
                
                <p>...até que descobri o mercado financeiro de Forex, que movimenta mais de 6 TRILHÕES de dólares diariamente.</p>
                
                <h2 className={transcriptStyles.sectionTitle}>A DESCOBERTA QUE TRANSFORMOU TUDO</h2>
                
                <p>No início, como todo iniciante, comecei a operar tentando adivinhar os movimentos do mercado. Às vezes ganhava, muitas vezes perdia.</p>
                
                <p>Sabia que precisava de algo melhor, mais consistente. Então investi TODO o dinheiro que tinha economizado em uma equipe de programadores e especialistas em mercado financeiro.</p>
                
                <p>Durante meses, trabalhamos incansavelmente, analisando MILHÕES de dados históricos, mapeando padrões, identificando sinais precisos de quando comprar e quando vender. <strong>Foi o equivalente a 15 anos de estudo condensados em alguns meses de trabalho intenso.</strong></p>
                
                <p>Até que finalmente criamos o algoritmo perfeito. Uma tecnologia capaz de:</p>
                
                <ul className={transcriptStyles.featureList}>
                  <li><strong>Analisar o mercado 24 horas por dia, 7 dias por semana</strong></li>
                  <li><strong>Identificar padrões imperceptíveis ao olho humano</strong></li>
                  <li><strong>Prever movimentos do mercado com precisão nunca vista</strong></li>
                  <li><strong>Gerar sinais de operação com taxa de acerto superior a 87%</strong></li>
                </ul>
                
                <p>É como se tivéssemos criado uma máquina de impressão de dinheiro particular!</p>
                
                <h2 className={transcriptStyles.questionTitle}>&ldquo;MAS SERÁ QUE ALGUÉM COMO EU CONSEGUE USAR ISSO?&rdquo;</h2>
                
                <p>Essa é a pergunta que muitos me fazem. Afinal, o mercado financeiro parece algo complicado, coisa de especialista, não é mesmo?</p>
                
                <p className={transcriptStyles.highlight}><strong>E é exatamente aí que entra a beleza do Copy Cash:</strong></p>
                
                <p>Você NÃO precisa entender NADA de mercado financeiro.<br />
                Você NÃO precisa estudar gráficos complicados.<br />
                Você NÃO precisa dedicar horas do seu dia.<br />
                Você NÃO precisa de experiência prévia.</p>
                
                <p>Tudo que você precisa é de um celular com internet e 10 minutos do seu dia.</p>
                
                <h2 className={transcriptStyles.sectionTitle}>COMO FUNCIONA EXATAMENTE O COPY CASH?</h2>
                
                <p>O sistema é absurdamente simples, projetado para que QUALQUER pessoa possa usar, mesmo que nunca tenha feito uma operação financeira na vida:</p>
                
                <p><strong>PASSO 1:</strong> Você recebe os sinais diretamente no seu celular através do nosso grupo exclusivo no Telegram.</p>
                
                <p><strong>PASSO 2:</strong> Cada sinal indica exatamente o ativo, a direção (compra ou venda), os pontos de entrada e o alvo de lucro.</p>
                
                <p><strong>PASSO 3:</strong> Você simplesmente abre o aplicativo da corretora (que te ensinaremos a configurar em 5 minutos) e clica nos botões indicados.</p>
                
                <p><strong>PASSO 4:</strong> O sistema faz todo o resto automaticamente. Quando o lucro é atingido, o dinheiro já cai direto na sua conta.</p>
                
                <p className={transcriptStyles.highlight}><strong>É literalmente tão simples quanto apertar 3 botões.</strong></p>
                
                <p>Mas se ainda assim está com dúvidas, deixa eu te mostrar um exemplo real:</p>
                
                <div className={transcriptStyles.imageContainer}>
                  <p className={transcriptStyles.imageCaption}>(Imagem de um sinal do Telegram e o resultado da operação)</p>
                </div>
                
                <p>Este foi um sinal enviado há 3 dias. Um usuário que seguiu exatamente o que indicamos ganhou <strong>US$1.035 (mais de R$5.000) em menos de 20 minutos</strong>.</p>
                
                <p>Imagine o que você poderia fazer com R$5.000 extras por dia? Como seria sua vida se você tivesse esse tipo de renda adicional todo dia?</p>
                
                <h2 className={transcriptStyles.questionTitle}>&ldquo;MAS SERÁ QUE FUNCIONA MESMO, WILLIAM? PARECE BOM DEMAIS PARA SER VERDADE...&rdquo;</h2>
                
                <p>Eu entendo sua desconfiança. Na internet, estamos cercados de promessas milagrosas que nunca se concretizam. Mas ao contrário desses &ldquo;gurus&rdquo; que só mostram prints editados, deixa eu te provar que isso é real:</p>
                
                <p className={transcriptStyles.evidence}><strong>EVIDÊNCIA #1: Meus próprios resultados auditados dos últimos 3 meses:</strong></p>
                <ul className={transcriptStyles.evidenceList}>
                  <li>Total de operações: 312</li>
                  <li>Operações com lucro: 271 (taxa de acerto de 86,8%)</li>
                  <li>Lucro total: US$475.321 (aproximadamente R$2,4 MILHÕES)</li>
                </ul>
                
                <p className={transcriptStyles.evidence}><strong>EVIDÊNCIA #2: Histórico de operações do nosso grupo:</strong></p>
                <p>[Imagens de múltiplas operações com lucro]</p>
                
                <p className={transcriptStyles.evidence}><strong>EVIDÊNCIA #3: Depoimentos de usuários reais do sistema:</strong></p>
                
                <blockquote className={transcriptStyles.testimonial}>
                  <p><em>&ldquo;Comecei com apenas R$1.000 e em 3 semanas já estou com R$15.430. Consegui quitar duas dívidas que me tiravam o sono!&rdquo;</em> - Carlos S., 42 anos, Porto Alegre</p>
                  
                  <p><em>&ldquo;Sempre tive medo de mercado financeiro, achava que era coisa de rico. No primeiro dia usando o Copy Cash já fiz R$780 de lucro. Foi mais do que ganho em uma semana no meu trabalho!&rdquo;</em> - Márcia L., 37 anos, Belo Horizonte</p>
                  
                  <p><em>&ldquo;Graças ao William e ao Copy Cash consegui juntar dinheiro para a entrada do meu apartamento em apenas 2 meses. Algo que achei que demoraria anos!&rdquo;</em> - Roberto F., 29 anos, São Paulo</p>
                </blockquote>
                
                <h2 className={transcriptStyles.sectionTitle}>O QUE VOCÊ PRECISA PARA COMEÇAR?</h2>
                
                <p>Diferente de outros investimentos que exigem capital inicial altíssimo, para começar com o Copy Cash você precisa de:</p>
                
                <ul className={transcriptStyles.requirementsList}>
                  <li>Um smartphone (Android ou iPhone)</li>
                  <li>Conexão à internet</li>
                  <li>Apenas R$250 para fazer suas primeiras operações (valor totalmente flexível)</li>
                </ul>
                
                <p className={transcriptStyles.highlight}><strong>Isso é tudo. Nenhum conhecimento prévio necessário.</strong></p>
                
                <p>Nosso sistema foi projetado para ser tão simples que até minha mãe de 65 anos consegue usar sem dificuldade. Se ela consegue, você também consegue!</p>
                
                <h2 className={transcriptStyles.sectionTitle}>POR QUE ESTAMOS LIMITANDO O NÚMERO DE VAGAS?</h2>
                
                <p>Você deve estar se perguntando: &ldquo;Se esse sistema é tão bom assim, por que vocês estão compartilhando? Por que não ficam com ele só para vocês?&rdquo;</p>
                
                <p>Excelente pergunta. E a resposta é simples:</p>
                
                <p><strong>1.</strong> Nosso algoritmo trabalha melhor quando temos um conjunto diversificado de usuários operando os sinais. Isso cria um efeito de &ldquo;força coletiva&rdquo; que aumenta ainda mais a precisão.</p>
                
                <p><strong>2.</strong> O mercado de Forex é gigantesco (6 TRILHÕES de dólares por dia). Mesmo que tivéssemos 10.000 pessoas operando, seria como tirar um copo d&apos;água do oceano.</p>
                
                <p><strong>3.</strong> Ganhamos também uma pequena comissão da corretora por cada novo cliente que indicamos, o que nos permite oferecer o sistema a um preço acessível.</p>
                
                <p className={transcriptStyles.highlight}><strong>PORÉM, e isso é crucial entender:</strong></p>
                
                <p>Se muitas pessoas começarem a operar exatamente os mesmos sinais ao mesmo tempo, o mercado pode começar a reagir diferente. Por isso, precisamos limitar o número de usuários para garantir que todos continuem tendo os mesmos resultados excepcionais.</p>
                
                <p className={transcriptStyles.highlight}><strong>É por isso que estamos abrindo apenas 100 vagas nesta fase.</strong></p>
                
                <p>Na última vez que abrimos inscrições, todas as vagas se esgotaram em menos de 3 horas. Portanto, se você está vendo esta página agora, considere-se sortudo!</p>
                
                <h2 className={transcriptStyles.sectionTitle}>O PACOTE COMPLETO DO COPY CASH</h2>
                
                <p>Você não vai receber apenas acesso aos sinais. Estamos oferecendo um pacote completo para garantir seu sucesso:</p>
                
                <ul className={transcriptStyles.packageList}>
                  <li><strong>✓ ACESSO VITALÍCIO À PLATAFORMA COPY CASH</strong> - Receba os sinais de alta precisão diretamente no seu celular, 24 horas por dia, 7 dias por semana. <em>(Valor real: R$5.997)</em></li>
                  
                  <li><strong>✓ TREINAMENTO COMPLETO DE CONFIGURAÇÃO</strong> - Tutorial passo a passo para configurar sua conta na corretora e começar a operar em menos de 30 minutos, mesmo que nunca tenha feito isso antes. <em>(Valor real: R$997)</em></li>
                  
                  <li><strong>✓ GERENCIADOR DE BANCA AUTOMATIZADO</strong> - Ferramenta exclusiva que calcula automaticamente quanto você deve investir em cada operação para maximizar seus lucros e minimizar riscos. <em>(Valor real: R$1.497)</em></li>
                  
                  <li><strong>✓ SUPORTE PRIORITÁRIO 24/7</strong> - Acesso direto à nossa equipe de especialistas para tirar qualquer dúvida ou resolver qualquer problema que possa surgir. <em>(Valor real: R$1.997 por ano)</em></li>
                  
                  <li><strong>✓ ACESSO AO GRUPO VIP DE OPERADORES</strong> - Comunidade exclusiva onde você pode interagir com outros usuários, compartilhar resultados e aprender estratégias avançadas. <em>(Valor real: R$797 por ano)</em></li>
                </ul>
                
                <p className={transcriptStyles.bonusTitle}><strong>BÔNUS EXCLUSIVO #1: E-BOOK &ldquo;DO ZERO AO PRIMEIRO MILHÃO&rdquo;</strong> - Meu guia pessoal detalhando como fui de entregador de gás a milionário em menos de 3 anos. <em>(Valor real: R$197)</em></p>
                
                <p className={transcriptStyles.bonusTitle}><strong>BÔNUS EXCLUSIVO #2: PLANILHA DE ACOMPANHAMENTO FINANCEIRO</strong> - Ferramenta desenvolvida por contadores profissionais para você acompanhar sua evolução patrimonial e planejar seus investimentos futuros. <em>(Valor real: R$297)</em></p>
                
                <p className={transcriptStyles.bonusTitle}><strong>BÔNUS EXCLUSIVO #3: CURSO AVANÇADO DE COPY CASH</strong> - Para quem quiser ir além dos sinais e entender a fundo como nossa tecnologia funciona, maximizando ainda mais seus resultados. <em>(Valor real: R$1.997)</em></p>
                
                <p className={transcriptStyles.totalValue}><strong>VALOR TOTAL: R$13.776</strong></p>
                
                <p>Mas fique tranquilo. Você não vai precisar investir nem perto disso.</p>
                
                <h2 className={transcriptStyles.sectionTitle}>QUANTO CUSTA PARA TRANSFORMAR SUA VIDA FINANCEIRA?</h2>
                
                <p>Se eu cobrasse R$5.000 pelo pacote completo, ainda seria um investimento extremamente vantajoso. Afinal, muitas pessoas recuperam esse valor em menos de uma semana usando o sistema.</p>
                
                <p>Algumas pessoas pagam R$50.000 ou mais em uma faculdade para depois ganhar um salário de R$3.000 por mês. Com o Copy Cash, você pode ganhar isso em um único dia!</p>
                
                <p className={transcriptStyles.highlight}><strong>Mas eu não quero que o preço seja um obstáculo para sua transformação financeira.</strong></p>
                
                <p>Por isso, investi do meu próprio bolso para subsidiar grande parte do custo, permitindo que mais pessoas tenham acesso a essa tecnologia revolucionária.</p>
                
                <p>Então, em vez dos R$13.776 que vale todo o pacote, ou mesmo dos R$5.000 que seria um preço justo...</p>
                
                <p className={transcriptStyles.highlight}><strong>Você pode ter acesso ao Copy Cash completo por apenas:</strong></p>
                
                <div className={transcriptStyles.priceBox}>
                  <h3>💰 R$47 à vista (por PIX ou cartão)</h3>
                  <SingleCtaButton />
                  <h3>💰 ou 12x de R$5,10 no cartão</h3>
                </div>
                
                <p className={transcriptStyles.highlight}><strong>Isso mesmo! Menos do que você gasta em um delivery de pizza por mês!</strong></p>
                
                <p>Pense bem: isso representa um investimento de menos de R$0,20 por dia para ter acesso a uma tecnologia que pode gerar R$1.000, R$2.000 ou até R$5.000 TODOS OS DIAS para você.</p>
                
                <p>Qual outro investimento no mundo oferece um retorno tão absurdo quanto esse?</p>
                
                <h2 className={transcriptStyles.sectionTitle}>GARANTIA INCONDICIONAL DE 7 DIAS</h2>
                
                <p>Sei que mesmo com tudo que mostrei, você ainda pode estar com um pé atrás. E tudo bem, entendo perfeitamente.</p>
                
                <p>Por isso, estou oferecendo algo que ninguém mais no mercado tem coragem de oferecer:</p>
                
                <p className={transcriptStyles.guaranteeTitle}><strong>GARANTIA TOTAL DE SATISFAÇÃO OU SEU DINHEIRO DE VOLTA</strong></p>
                
                <p>Funciona assim:</p>
                
                <ol className={transcriptStyles.guaranteeSteps}>
                  <li>Você se cadastra hoje no Copy Cash</li>
                  <li>Durante 7 dias, você segue TODOS os sinais enviados</li>
                  <li>Se seguir corretamente as instruções e não tiver resultados positivos</li>
                  <li>Basta enviar um e-mail mostrando que seguiu tudo corretamente</li>
                  <li>Devolvo 100% do seu dinheiro, sem perguntas, sem complicação</li>
                </ol>
                
                <p>Por que posso oferecer essa garantia? Porque confio tanto no sistema que sei que isso NUNCA aconteceu e NUNCA vai acontecer.</p>
                
                <p className={transcriptStyles.highlight}><strong>Com essa garantia, você não tem absolutamente NADA a perder e um mundo de possibilidades a ganhar!</strong></p>
                
                <h2 className={transcriptStyles.sectionTitle}>O MOMENTO DA DECISÃO CHEGOU</h2>
                
                <p>Agora você está diante de uma encruzilhada:</p>
                
                <p className={transcriptStyles.pathOption}><strong>CAMINHO 1:</strong> Ignorar tudo que mostrei aqui, fechar esta página e continuar exatamente como está hoje. Trabalhando duro, ganhando pouco, sempre preocupado com dinheiro, adiando seus sonhos para um futuro que talvez nunca chegue.</p>
                
                <p className={transcriptStyles.pathOption}><strong>CAMINHO 2:</strong> Investir menos do que custa uma pizza por mês em uma tecnologia comprovada que pode transformar completamente sua realidade financeira em questão de dias.</p>
                
                <p>Parece uma escolha óbvia, não é?</p>
                
                <p className={transcriptStyles.highlight}><strong>Mas deixa eu te fazer uma pergunta importante:</strong></p>
                
                <p>Daqui a 6 meses, onde você quer estar? Ainda na mesma situação financeira apertada? Ou contando os lucros das suas operações diárias, planejando sua próxima viagem internacional, escolhendo qual carro novo vai comprar, ou até mesmo qual será seu próximo investimento imobiliário?</p>
                
                <p>A escolha é sua, mas as consequências dessa escolha também serão.</p>
                
                <p className={transcriptStyles.highlight}><strong>E se você deixar essa oportunidade passar?</strong></p>
                
                <p>Lembre-se disso cada vez que:</p>
                <ul className={transcriptStyles.reminderList}>
                  <li>Sua família enfrentar dificuldades financeiras e você não puder ajudar</li>
                  <li>Você tiver que dizer &ldquo;não&rdquo; para um programa com amigos por falta de dinheiro</li>
                  <li>Seu carro quebrar e você não tiver como pagar o conserto</li>
                  <li>Seu cartão de crédito for recusado por falta de limite</li>
                  <li>O sonho da casa própria parecer cada vez mais distante</li>
                </ul>
                
                <p>A culpa será exclusivamente sua. Porque você viu a oportunidade, teve todas as evidências, garantias e facilidades... e mesmo assim deixou passar.</p>
                
                <p>E tudo isso para economizar menos de 20 centavos por dia.</p>
                
                <h2 className={transcriptStyles.urgencyTitle}>VAGAS EXTREMAMENTE LIMITADAS - AÇÃO URGENTE NECESSÁRIA</h2>
                
                <p>Como expliquei, estamos limitando o acesso a apenas 100 novas pessoas nesta fase. Na última vez, todas as vagas se esgotaram em menos de 3 horas.</p>
                
                <p>Se o botão abaixo ainda estiver ativo, significa que ainda existe uma vaga esperando por você.</p>
                
                <p>Não deixe que outra pessoa tome o seu lugar.</p>
                
                <CtaButton />
                
                <p>Vejo você dentro do Copy Cash.</p>
                
                <p>Bora pra cima, e é só o começo!</p>
                
                <p className={transcriptStyles.signature}><em>William Akseni</em><br />
                <em>Criador do Copy Cash</em></p>
                
                <hr className={transcriptStyles.divider} />
                
                <p className={transcriptStyles.ps}><strong>P.S.:</strong> Esqueci de mencionar algo MUITO importante. As pessoas que se inscreverem HOJE terão acesso a um treinamento exclusivo sobre como multiplicar seus ganhos com o Copy Cash. Este treinamento NÃO estará disponível amanhã e não será oferecido novamente. É literalmente AGORA ou NUNCA!</p>
                
                <p className={transcriptStyles.ps}><strong>P.P.S.:</strong> Lembra daquele Rafael, entregador de aplicativo que apareceu na nossa VSL? Ele investiu no Copy Cash naquele mesmo dia. Três semanas depois, pediu demissão do seu trabalho e hoje opera exclusivamente com o Copy Cash, ganhando em média R$750 por dia. Esta poderia ser a SUA história daqui a algumas semanas...</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Rodapé */}
        <div className={styles.container2}>
          {/* Aviso de risco de investimento */}
          <p className={styles.disclaimerText}>
            Investimentos envolvem riscos e podem causar perdas ao investidor. Certifique-se dos riscos e se o investimento faz sentido para o seu perfil antes de investir. Não há garantia de retorno. Retornos passados não garantem retornos futuros.
          </p>
          
          {/* Aviso importante */}
          <FooterAccordion />
          
          <p className={styles.footer}>
            <span>Copyright © 2025 - Todos os direitos reservados.</span>
          </p>
          <div className={styles.footerLinks}>
            <a href="/cf1/terms" aria-label="Termos e Condições">Termos e Condições</a>
            <span>|</span>
            <a href="/cf1/privacy" aria-label="Política de Privacidade">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </div>
  );
}
