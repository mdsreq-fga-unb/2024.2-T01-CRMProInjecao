'use client';

import { m } from 'framer-motion';

// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// layouts
import CompactLayout from '@/layouts/compact';
// assets
import { SeverErrorIllustration } from '@/assets/illustrations';
// components
import { RouterLink } from '@/routes/components';
import { MotionContainer, varBounce } from '@/components/animate';

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Erro interno do servidor!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            O servidor encontrou um erro e não pôde completar sua solicitação.
            <br />
            Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com o
            administrador do sistema.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Ir ao Início
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
