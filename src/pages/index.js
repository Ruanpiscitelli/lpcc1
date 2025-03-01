import Head from 'next/head';
import OptimizedImage from '../components/OptimizedImage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sua Landing Page</title>
        <meta name="description" content="Descrição otimizada para SEO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Título Principal da Landing Page</h1>
            <p>Subtítulo ou descrição atrativa para engajar os visitantes.</p>
            
            {/* Imagem otimizada para LCP */}
            <OptimizedImage
              src="/images/hero-image.jpg" // Substitua pelo caminho da sua imagem
              alt="Descrição da imagem principal"
              width={1200}
              height={600}
              priority={true} // Importante para LCP
            />
            
            <div className="cta-container">
              <a href="#contato" className="btn">Entrar em contato</a>
            </div>
          </div>
        </section>
        
        {/* Outras seções da landing page */}
      </main>
    </div>
  );
} 