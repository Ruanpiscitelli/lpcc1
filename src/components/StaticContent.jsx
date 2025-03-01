/**
 * StaticContent - Componente de Servidor (Server Component)
 * 
 * Este componente é renderizado no servidor e apenas o HTML resultante
 * é enviado ao cliente, sem JavaScript adicional, reduzindo o tamanho
 * do bundle e melhorando o desempenho.
 * 
 * Ideal para conteúdos estáticos que não precisam de interatividade no cliente.
 */

export default function StaticContent({ title, content, className = '' }) {
  return (
    <div className={`static-content ${className}`}>
      {title && <h2 className="static-content-title">{title}</h2>}
      
      {typeof content === 'string' ? (
        <div 
          className="static-content-body"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      ) : (
        <div className="static-content-body">
          {content}
        </div>
      )}
    </div>
  );
}

/**
 * Exemplo de uso:
 * 
 * // Em um arquivo de página ou layout
 * import StaticContent from '../components/StaticContent';
 * 
 * // Conteúdo estático como string HTML
 * const htmlContent = `
 *   <p>Este é um conteúdo <strong>estático</strong> que será renderizado no servidor.</p>
 *   <ul>
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *   </ul>
 * `;
 * 
 * // Na função de renderização
 * <StaticContent 
 *   title="Título da Seção" 
 *   content={htmlContent} 
 *   className="my-custom-class"
 * />
 * 
 * // Ou com conteúdo como JSX
 * <StaticContent 
 *   title="Outra Seção" 
 *   content={<p>Conteúdo como JSX também funciona!</p>} 
 * />
 */ 