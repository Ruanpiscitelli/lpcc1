'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/LandingPage.module.css';

export default function TermsPage() {
  return (
    <div className={styles.frame}>
      <div className={styles.body} style={{ padding: '60px 20px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.9)', padding: '30px', borderRadius: '8px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Termos e Condições</h1>
          
          <div style={{ color: '#333', lineHeight: '1.6' }}>
            <p>Última atualização: 26 de Fevereiro de 2025</p>
            
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>1. Termos</h2>
            <p>Ao acessar ao site Willtrader, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>
            
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>2. Uso de Licença</h2>
            <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Willtrader, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
            <ul style={{ marginLeft: '20px', marginTop: '10px', marginBottom: '10px' }}>
              <li>modificar ou copiar os materiais;</li>
              <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
              <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Willtrader;</li>
              <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
            </ul>
            <p>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Willtrader a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.</p>
            
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>3. Isenção de responsabilidade</h2>
            <p>Os materiais no site da Willtrader são fornecidos 'como estão'. Willtrader não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
            <p>Além disso, o Willtrader não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</p>
            
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>4. Limitações</h2>
            <p>Em nenhum caso o Willtrader ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Willtrader, mesmo que Willtrader ou um representante autorizado da Willtrader tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.</p>
            
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>5. Precisão dos materiais</h2>
            <p>Os materiais exibidos no site da Willtrader podem incluir erros técnicos, tipográficos ou fotográficos. Willtrader não garante que qualquer material em seu site seja preciso, completo ou atual. Willtrader pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Willtrader não se compromete a atualizar os materiais.</p>
            
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>6. Links</h2>
            <p>O Willtrader não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Willtrader do site. O uso de qualquer site vinculado é por conta e risco do usuário.</p>
            
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>7. Modificações</h2>
            <p>O Willtrader pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>
            
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>8. Lei aplicável</h2>
            <p>Estes termos e condições são regidos e interpretados de acordo com as leis do Willtrader e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
          </div>
          
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link href="/cf2" style={{ display: 'inline-block', padding: '10px 20px', background: '#d20000', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 