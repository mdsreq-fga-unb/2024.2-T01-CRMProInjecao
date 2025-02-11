import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
  Card,
  Box,
  Tooltip,
} from '@mui/material';
import Iconify from '@/components/iconify';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function ServiceCreateDialog({ open, onClose }: Props) {
  const router = useRouter();

  const handleCreateBudget = () => {
    router.push(paths.dashboard.services.newBudget);
    onClose();
  };

  const handleCreateServiceOrder = () => {
    router.push(paths.dashboard.services.newOrder);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Criar Novo Serviço</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Stack spacing={3}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Escolha como deseja iniciar o serviço:
          </Typography>

          <Tooltip title="Ideal para serviços complexos ou que precisam de aprovação do cliente">
            <Card
              sx={{
                p: 3,
                cursor: 'pointer',
                '&:hover': { 
                  bgcolor: 'background.neutral',
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s',
                },
              }}
              onClick={handleCreateBudget}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ width: 48, height: 48 }}>
                  <Iconify icon="eva:file-text-fill" width={48} />
                </Box>
                <Box>
                  <Typography variant="subtitle1">Criar Orçamento</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Ideal para serviços que precisam de aprovação prévia do cliente
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Tooltip>

          <Card
            sx={{
              p: 3,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'background.neutral' },
            }}
            onClick={handleCreateServiceOrder}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 48, height: 48 }}>
                <Iconify icon="eva:settings-2-fill" width={48} />
              </Box>
              <Box>
                <Typography variant="subtitle1">Criar Ordem de Serviço</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Para serviços que podem ser iniciados imediatamente
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Stack>
      </DialogContent>
    </Dialog>
  );
} 