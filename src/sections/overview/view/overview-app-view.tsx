'use client';

import Container from '@mui/material/Container';
import { Button, Grid } from '@mui/material';
import SeoIllustration from '@/assets/illustrations/seo-illustration';
import AppWelcome from '../app-welcome';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
      }}
      maxWidth="xl"
      className="selector2"
    >
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <AppWelcome
            title={`Bem vindo de volta 👋 \n Admin`}
            description="Cheque agora as últimas atualizações e novidades."
            img={<SeoIllustration />}
            action={
              <Button href="/dashboard/clients" variant="contained" color="primary">
                Ver agora
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}
