// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import { Card } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        py: { xs: 10, md: 10 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Box
      sx={{
        position: 'relative',
        flexGrow: 1,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to bottom, ${alpha(
            theme.palette.background.default,
            0.7
          )}, ${alpha(theme.palette.background.default, 0.9)})`,
          zIndex: 1,
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('https://t4.ftcdn.net/jpg/07/08/35/43/360_F_708354318_KkGtXKm5RLHqNCaLutAasnXTTyeSBkR8.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: 0,
        },
      }}
    >
      <Card
        sx={{
          position: 'relative',
          zIndex: 2,
          p: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
          },
          borderRadius: 2,
          maxWidth: 1000,
          textAlign: 'center',
          color: 'common.white',
          background: 'rgba(0, 0, 0, 0.15)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: { sm: '1.4rem', md: '2rem', lg: '2.5rem' },
            lineHeight: 1.2,

            mx: 'auto',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          CRM PRO INJEÇÃO
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            fontWeight: 'medium',
            fontSize: { xs: '1rem', md: '1.5rem', lg: '1.8rem' },
            lineHeight: 1.3,
            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Seja bem-vindo!
        </Typography>
      </Card>
    </Box>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {renderLogo}

      {upMd && renderSection}

      {renderContent}
    </Stack>
  );
}
