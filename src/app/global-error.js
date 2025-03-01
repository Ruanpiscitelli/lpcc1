'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Reportar o erro para o Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Algo deu errado!
          </h1>
          <p style={{ marginBottom: '2rem', maxWidth: '600px' }}>
            Desculpe pelo inconveniente. Nossa equipe foi notificada e está trabalhando para resolver o problema.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
} 