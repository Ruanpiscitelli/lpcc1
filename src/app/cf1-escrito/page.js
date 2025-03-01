'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/LandingPage.module.css';
import transcriptStyles from '../../styles/Transcript.module.css';
import enhancedStyles from '../../styles/EnhancedTranscript.module.css';
import FooterAccordion from '../../components/FooterAccordion';
import CtaButton from '../../components/CtaButton';
import SingleCtaButton from '../../components/SingleCtaButton';
import Timeline from '../../components/Timeline';
import ProgressSteps from '../../components/ProgressSteps';

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
            
            {/* Conteúdo da transcrição aprimorado */}
            <div className={enhancedStyles.transcriptContainer}>
              <div className={enhancedStyles.transcriptHeader}>
                <h2>Transcrição Completa do Vídeo</h2>
                <p className={enhancedStyles.transcriptSubheader}>
                  Prefere assistir ao vídeo? <Link href="/cf1" className={enhancedStyles.videoLink}>Clique aqui para voltar</Link>
                </p>
              </div>
              
              <div className={enhancedStyles.transcriptContent}>
                <h1 className={enhancedStyles.mainTitle}>COPY CASH: A Tecnologia Revolucionária Que Está Transformando Pessoas Comuns Em Geradores De Riqueza</h1>
                
                {/* Imagem de alta qualidade de relógios de luxo */}
                <div className={enhancedStyles.imageContainer}>
                  <Image 
                    src="https://ik.imagekit.io/06mrofd72/Captura%20de%20Tela%202025-03-01%20a%CC%80s%2001.08.56.png?updatedAt=1740802160709" 
                    alt="Relógios de luxo"
                    width={700} 
                    height={400}
                    className={enhancedStyles.contentImage}
                    priority={true}
                  />
                  <p className={enhancedStyles.imageCaption}>Relógios de luxo totalizando R$75.000</p>
                </div>
                
                <p className={enhancedStyles.highlight}><strong>R$15.000... R$25.000... R$35.000... 75 mil reais em apenas três relógios.</strong></p>
                
                <p>Você já imaginou ter tanto dinheiro sobrando que poderia comprar relógios de luxo sem nem sentir falta do valor? E se eu te dissesse que isso é apenas uma pequena amostra do que é possível quando você tem a tecnologia certa trabalhando para você?</p>
                
                <div className={enhancedStyles.attentionBox}>
                  <h2 className={enhancedStyles.attentionTitle}>PARE AGORA E LEIA ESTA CARTA COM ATENÇÃO</h2>
                  <p>O que vou revelar aqui mudou completamente a minha vida e já transformou a realidade de centenas de pessoas comuns por todo o Brasil. Se você está:</p>
                </div>
                
                <ul className={enhancedStyles.checkList}>
                  <li><strong>Cansado de trabalhar o mês inteiro para mal conseguir pagar as contas</strong></li>
                  <li><strong>Frustrado por ver seu salário acabar antes do fim do mês</strong></li>
                  <li><strong>Endividado e sem conseguir enxergar uma saída</strong></li>
                  <li><strong>Adiando seus sonhos de viagem, carro novo ou casa própria</strong></li>
                  <li><strong>Sem tempo para família porque precisa fazer hora extra</strong></li>
                  <li><strong>Preocupado como vai pagar a faculdade dos seus filhos</strong></li>
                  <li><strong>Angustiado com a ideia de nunca conseguir se aposentar confortavelmente</strong></li>
                </ul>
                
                <p>Então você <span className={enhancedStyles.emphasisText}>PRECISA</span> conhecer o sistema que estou prestes a revelar.</p>
                
                <h2 className={enhancedStyles.sectionTitle}>A REALIDADE CRUEL DO BRASILEIRO COMUM</h2>
                
                {/* Ilustração representando a luta financeira */}
                <div className={enhancedStyles.imageContainer}>
                  <Image 
                    src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg" 
                    alt="Pessoa estressada com contas"
                    width={700} 
                    height={400}
                    className={enhancedStyles.contentImage}
                  />
                </div>
                
                <p>Vamos ser honestos. A vida financeira da maioria dos brasileiros é uma batalha constante:</p>
                
                <blockquote className={enhancedStyles.testimonial}>
                  <p><em>&ldquo;Mês passado tive que escolher entre pagar o cartão de crédito e comprar o material escolar do meu filho...&rdquo;</em></p>
                  
                  <p><em>&ldquo;Já são 3 anos sem conseguir tirar férias porque o dinheiro nunca sobra...&rdquo;</em></p>
                  
                  <p><em>&ldquo;Tenho 45 anos e ainda não consegui dar entrada na minha casa própria...&rdquo;</em></p>
                  
                  <p><em>&ldquo;Meu carro quebrou e não tenho dinheiro para o conserto, agora preciso pegar 3 ônibus para chegar ao trabalho...&rdquo;</em></p>
                </blockquote>
                
                <p>Essas são histórias REAIS que ouço todos os dias. E o mais triste? A maioria das pessoas aceita que essa é a vida &ldquo;normal&rdquo;. Trabalhar como um condenado, de segunda a sexta (às vezes até no fim de semana), apenas para sobreviver até o próximo pagamento.</p>
                
                <p className={enhancedStyles.highlight}><strong>É por isso que nunca conseguem sair desse ciclo vicioso.</strong></p>
                
                <div className={enhancedStyles.sectionDivider}></div>
                
                <h2 className={enhancedStyles.sectionTitle}>O ESTALO QUE MUDOU MINHA VIDA PARA SEMPRE</h2>
                
                {/* Imagem representando a transformação */}
                <div className={enhancedStyles.imageContainer}>
                  <Image 
                    src="https://ik.imagekit.io/06mrofd72/90034111_1789508614514112_3042280253397559448_n.jpg?updatedAt=1740803026175" 
                    alt="Transformação financeira"
                    width={700} 
                    height={400}
                    className={enhancedStyles.contentImage}
                  />
                </div>
                
                <p>Muito prazer, meu nome é <strong className={enhancedStyles.authorName}>William Akseni</strong>, e hoje sou reconhecido como o &ldquo;gerador de riqueza em dólar&rdquo; por ganhar quantias surpreendentes no mercado financeiro, mesmo morando no Brasil.</p>
                
                <p>Mas nem sempre foi assim...</p>
                
                {/* Componente de Timeline */}
                <Timeline />
                
                <div className={enhancedStyles.storyBox}>
                  <p>Há 7 anos, eu entregava botijões de gás de sol a sol, carregando peso o dia inteiro, suando a camisa para ganhar uma miséria no fim do mês. Meu celular era um modelo básico parcelado em 12 vezes, andava numa moto velha que vivia quebrando, e usava as roupas mais baratas que encontrava.</p>
                
                  <p>Enquanto isso, via meus amigos comemorando em restaurantes caros, trocando de carro, viajando para o exterior... e eu? Não podia nem sonhar com isso.</p>
                </div>
                
                <p className={enhancedStyles.highlight}><strong>Até que um dia, ouvi uma frase que mudou completamente minha mentalidade:</strong></p>
                
                <blockquote className={enhancedStyles.keyQuote}>
                  <p>&ldquo;Você nunca vai enriquecer apenas trocando seu tempo por dinheiro.&rdquo;</p>
                </blockquote>
                
                <p>Aquilo foi como um soco no estômago. Pela primeira vez, percebi que não importava o quanto eu me esforçasse como entregador de gás, nunca conseguiria a vida que realmente desejava. O sistema simplesmente não foi feito para isso.</p>
                
                <p>Foi quando comecei a buscar alternativas. Estudei durante noites inteiras. Testei dezenas de métodos. Investi em cursos que não me levaram a lugar nenhum. Gastei dinheiro que não tinha em promessas vazias...</p>
                
                <p>...até que descobri o mercado financeiro de Forex, que movimenta mais de 6 TRILHÕES de dólares diariamente.</p>
                
                <div className={enhancedStyles.sectionDivider}></div>
                
                <h2 className={enhancedStyles.sectionTitle}>A DESCOBERTA QUE TRANSFORMOU TUDO</h2>
                
                {/* Nova imagem para mercado financeiro */}
                <div className={enhancedStyles.imageContainer}>
                  <Image 
                    src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg" 
                    alt="Mercado financeiro em movimento"
                    width={700} 
                    height={400}
                    className={enhancedStyles.contentImage}
                  />
                </div>
                
                <p>No início, como todo iniciante, comecei a operar tentando adivinhar os movimentos do mercado. Às vezes ganhava, muitas vezes perdia.</p>
                
                <p>Sabia que precisava de algo melhor, mais consistente. Então investi TODO o dinheiro que tinha economizado em uma equipe de programadores e especialistas em mercado financeiro.</p>
                
                <p>Durante meses, trabalhamos incansavelmente, analisando MILHÕES de dados históricos, mapeando padrões, identificando sinais precisos de quando comprar e quando vender. <strong>Foi o equivalente a 15 anos de estudo condensados em alguns meses de trabalho intenso.</strong></p>
                
                <p>Até que finalmente criamos o algoritmo perfeito. Uma tecnologia capaz de:</p>
                
                <ul className={enhancedStyles.featureList}>
                  <li><strong>Analisar o mercado 24 horas por dia, 7 dias por semana</strong></li>
                  <li><strong>Identificar padrões imperceptíveis ao olho humano</strong></li>
                  <li><strong>Prever movimentos do mercado com precisão nunca vista</strong></li>
                  <li><strong>Gerar sinais de operação com taxa de acerto superior a 87%</strong></li>
                </ul>
                
                <p>É como se tivéssemos criado uma máquina de impressão de dinheiro particular!</p>
                
                {/* Componente de ProgressSteps */}
                <ProgressSteps />
                
                <div className={enhancedStyles.imageContainer}>
                  <Image 
                    src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg" 
                    alt="Pessoa celebrando sucesso financeiro"
                    width={700} 
                    height={400}
                    className={enhancedStyles.contentImage}
                  />
                </div>
                
                <h2 className={enhancedStyles.sectionTitle}>MAS SERÁ QUE ALGUÉM COMO EU CONSEGUE USAR ISSO?</h2>
                
                <p>Essa é a pergunta que muitos me fazem. Afinal, o mercado financeiro parece algo complicado, coisa de especialista, não é mesmo?</p>
                
                <p className={enhancedStyles.highlight}><strong>E é exatamente aí que entra a beleza do Copy Cash:</strong></p>
                
                <div className={enhancedStyles.storyBox}>
                  <p><strong>Você NÃO precisa entender NADA de mercado financeiro.</strong><br />
                  <strong>Você NÃO precisa estudar gráficos complicados.</strong><br />
                  <strong>Você NÃO precisa dedicar horas do seu dia.</strong><br />
                  <strong>Você NÃO precisa de experiência prévia.</strong></p>
                  
                  <p>Tudo que você precisa é de um celular com internet e 10 minutos do seu dia.</p>
                </div>
                
                <div className={enhancedStyles.imageContainer}>
                  <Image 
                    src="https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg" 
                    alt="Pessoa operando pelo celular"
                    width={700} 
                    height={400}
                    className={enhancedStyles.contentImage}
                  />
                </div>
                
                <h2 className={enhancedStyles.sectionTitle}>RESULTADOS REAIS DE USUÁRIOS DO SISTEMA</h2>
                
                <blockquote className={enhancedStyles.testimonial}>
                  <p><em>&ldquo;Comecei com apenas R$1.000 e em 3 semanas já estou com R$15.430. Consegui quitar duas dívidas que me tiravam o sono!&rdquo;</em> - Carlos S., 42 anos, Porto Alegre</p>
                </blockquote>
                
                <blockquote className={enhancedStyles.testimonial}>
                  <p><em>&ldquo;Sempre tive medo de mercado financeiro, achava que era coisa de rico. No primeiro dia usando o Copy Cash já fiz R$780 de lucro. Foi mais do que ganho em uma semana no meu trabalho!&rdquo;</em> - Márcia L., 37 anos, Belo Horizonte</p>
                </blockquote>
                
                <blockquote className={enhancedStyles.testimonial}>
                  <p><em>&ldquo;Graças ao William e ao Copy Cash consegui juntar dinheiro para a entrada do meu apartamento em apenas 2 meses. Algo que achei que demoraria anos!&rdquo;</em> - Roberto F., 29 anos, São Paulo</p>
                </blockquote>
                
                <div className={enhancedStyles.imageContainer}>
                  <Image 
                    src="https://ik.imagekit.io/06mrofd72/436426769_431909126087501_3516150520519896303_n.jpg?updatedAt=1740803199367" 
                    alt="Pessoa feliz com resultados financeiros"
                    width={700} 
                    height={400}
                    className={enhancedStyles.contentImage}
                  />
                </div>
                
                <h2 className={enhancedStyles.sectionTitle}>O QUE VOCÊ PRECISA PARA COMEÇAR?</h2>
                
                <p>Diferente de outros investimentos que exigem capital inicial altíssimo, para começar com o Copy Cash você precisa de:</p>
                
                <ul className={enhancedStyles.checkList}>
                  <li><strong>Um smartphone (Android ou iPhone)</strong></li>
                  <li><strong>Conexão à internet</strong></li>
                  <li><strong>Apenas R$250 para fazer suas primeiras operações (valor totalmente flexível)</strong></li>
                </ul>
                
                <p className={enhancedStyles.highlight}><strong>Isso é tudo. Nenhum conhecimento prévio necessário.</strong></p>
                
                <div className={enhancedStyles.attentionBox}>
                  <h2 className={enhancedStyles.attentionTitle}>VAGAS LIMITADAS</h2>
                  <p>Estamos abrindo apenas 100 vagas nesta fase para garantir os melhores resultados para todos os usuários. Na última vez que abrimos inscrições, todas as vagas se esgotaram em menos de 3 horas!</p>
                </div>
                
                <h2 className={enhancedStyles.sectionTitle}>O PACOTE COMPLETO DO COPY CASH</h2>
                
                <p>Você não vai receber apenas acesso aos sinais. Estamos oferecendo um pacote completo para garantir seu sucesso:</p>
                
                <div className={enhancedStyles.storyBox}>
                  <ul className={enhancedStyles.featureList}>
                    <li><strong>ACESSO VITALÍCIO À PLATAFORMA COPY CASH</strong> - Receba os sinais de alta precisão diretamente no seu celular, 24 horas por dia, 7 dias por semana. <em>(Valor real: R$5.997)</em></li>
                    
                    <li><strong>TREINAMENTO COMPLETO DE CONFIGURAÇÃO</strong> - Tutorial passo a passo para configurar sua conta na corretora e começar a operar em menos de 30 minutos, mesmo que nunca tenha feito isso antes. <em>(Valor real: R$997)</em></li>
                    
                    <li><strong>GERENCIADOR DE BANCA AUTOMATIZADO</strong> - Ferramenta exclusiva que calcula automaticamente quanto você deve investir em cada operação para maximizar seus lucros e minimizar riscos. <em>(Valor real: R$1.497)</em></li>
                    
                    <li><strong>SUPORTE PRIORITÁRIO 24/7</strong> - Acesso direto à nossa equipe de especialistas para tirar qualquer dúvida ou resolver qualquer problema que possa surgir. <em>(Valor real: R$1.997 por ano)</em></li>
                  </ul>
                </div>
                
                <h2 className={enhancedStyles.sectionTitle}>BÔNUS EXCLUSIVOS</h2>
                
                <div className={enhancedStyles.imageContainer}>
                  <Image 
                    src="https://images.pexels.com/photos/5980866/pexels-photo-5980866.jpeg" 
                    alt="Representação de bônus"
                    width={700} 
                    height={400}
                    className={enhancedStyles.contentImage}
                  />
                </div>
                
                <ul className={enhancedStyles.featureList}>
                  <li><strong>E-BOOK &ldquo;DO ZERO AO PRIMEIRO MILHÃO&rdquo;</strong> - Meu guia pessoal detalhando como fui de entregador de gás a milionário em menos de 3 anos. <em>(Valor real: R$197)</em></li>
                  
                  <li><strong>PLANILHA DE ACOMPANHAMENTO FINANCEIRO</strong> - Ferramenta desenvolvida por contadores profissionais para você acompanhar sua evolução patrimonial e planejar seus investimentos futuros. <em>(Valor real: R$297)</em></li>
                  
                  <li><strong>CURSO AVANÇADO DE COPY CASH</strong> - Para quem quiser ir além dos sinais e entender a fundo como nossa tecnologia funciona, maximizando ainda mais seus resultados. <em>(Valor real: R$1.997)</em></li>
                </ul>
                
                <p className={enhancedStyles.highlight}><strong>VALOR TOTAL DO PACOTE: R$13.776</strong></p>
                
                <p>Mas você não vai pagar nem perto disso! Por tempo limitado, você pode ter acesso a tudo por apenas:</p>
                
                <div className={enhancedStyles.sectionDivider}></div>
                
                <div className={transcriptStyles.ctaContainer}>
                  <Link href="https://clkdmg.site/checkouts/ab-order-bump-x?src=t4-orderbump" className={transcriptStyles.ctaButton}>
                    QUERO CONHECER O SISTEMA AGORA
                  </Link>
                  <p className={transcriptStyles.installmentText}>
                    12 X R$5,09
                  </p>
                </div>
                
                <div className={enhancedStyles.sectionDivider}></div>
                
                <p className={enhancedStyles.highlight}><strong>GARANTIA TOTAL DE SATISFAÇÃO OU SEU DINHEIRO DE VOLTA</strong></p>
                
                <p>Use o Copy Cash por 7 dias. Se seguir corretamente as instruções e não tiver resultados positivos, devolvo 100% do seu dinheiro, sem perguntas, sem complicação.</p>
                
                <h2 className={enhancedStyles.sectionTitle}>O MOMENTO DA DECISÃO CHEGOU</h2>
                
                <p>Daqui a 6 meses, onde você quer estar? Ainda na mesma situação financeira apertada? Ou contando os lucros das suas operações diárias, planejando sua próxima viagem internacional, escolhendo qual carro novo vai comprar?</p>
                
                <p>A escolha é sua, mas as consequências dessa escolha também serão.</p>
                
                <div className={transcriptStyles.ctaContainer}>
                  <Link href="https://clkdmg.site/checkouts/ab-order-bump-x?src=t4-orderbump" className={transcriptStyles.ctaButton}>
                    QUERO TRANSFORMAR MINHA VIDA FINANCEIRA AGORA
                  </Link>
                  <p className={transcriptStyles.installmentText}>
                    12 X R$5,09
                  </p>
                </div>
                
                <p className={enhancedStyles.signature}>William Akseni<br />Criador do Copy Cash</p>
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
