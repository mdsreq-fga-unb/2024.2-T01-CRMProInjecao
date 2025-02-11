import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Card, Typography, Stack, Box, Collapse } from '@mui/material';
import { IServiceHistory, ServiceHistoryType } from '@/types/service-history';
import { fDateTime } from '@/utils/format-time';
import { fCurrency } from '@/utils/format-number';
import { useState } from 'react';
import Iconify from '../iconify';

type Props = {
  history: IServiceHistory[];
};

export default function ServiceHistoryTimeline({ history }: Props) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getIconByType = (type: ServiceHistoryType) => {
    switch (type) {
      case ServiceHistoryType.BUDGET_CREATED:
      case ServiceHistoryType.SERVICE_ORDER_CREATED:
        return 'eva:file-add-fill';
      case ServiceHistoryType.BUDGET_UPDATED:
      case ServiceHistoryType.SERVICE_ORDER_UPDATED:
        return 'eva:edit-fill';
      case ServiceHistoryType.BUDGET_ACCEPTED:
      case ServiceHistoryType.SERVICE_ORDER_COMPLETED:
        return 'eva:checkmark-circle-2-fill';
      case ServiceHistoryType.BUDGET_CANCELED:
      case ServiceHistoryType.SERVICE_ORDER_CANCELED:
        return 'eva:close-circle-fill';
      default:
        return 'eva:activity-fill';
    }
  };

  const getColorByType = (type: ServiceHistoryType) => {
    switch (type) {
      case ServiceHistoryType.BUDGET_CREATED:
      case ServiceHistoryType.SERVICE_ORDER_CREATED:
        return 'info';
      case ServiceHistoryType.BUDGET_UPDATED:
      case ServiceHistoryType.SERVICE_ORDER_UPDATED:
        return 'warning';
      case ServiceHistoryType.BUDGET_ACCEPTED:
      case ServiceHistoryType.SERVICE_ORDER_COMPLETED:
        return 'success';
      case ServiceHistoryType.BUDGET_CANCELED:
      case ServiceHistoryType.SERVICE_ORDER_CANCELED:
        return 'error';
      default:
        return 'primary';
    }
  };

  const renderChanges = (item: IServiceHistory) => {
    if (!item.changes) return null;

    switch (item.type) {
      case ServiceHistoryType.BUDGET_CREATED:
      case ServiceHistoryType.SERVICE_ORDER_CREATED:
        return (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Valor Total: {fCurrency(item.changes.totalCost || 0)}
            </Typography>
            {item.changes.initialCost > 0 && (
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                Custo Inicial: {fCurrency(item.changes.initialCost)}
              </Typography>
            )}
            {item.changes.additionalCost > 0 && (
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                Custo Adicional: {fCurrency(item.changes.additionalCost)}
              </Typography>
            )}
          </Box>
        );

      case ServiceHistoryType.BUDGET_UPDATED:
      case ServiceHistoryType.SERVICE_ORDER_UPDATED: {
        const { before, after } = item.changes;
        const changes = [];

        // Comparar e adicionar mudanças relevantes
        if (before.initialCost !== after.initialCost) {
          changes.push({
            field: 'Custo Inicial',
            before: fCurrency(before.initialCost || 0),
            after: fCurrency(after.initialCost || 0)
          });
        }
        if (before.additionalCost !== after.additionalCost) {
          changes.push({
            field: 'Custo Adicional',
            before: fCurrency(before.additionalCost || 0),
            after: fCurrency(after.additionalCost || 0)
          });
        }
        if (before.description !== after.description) {
          changes.push({
            field: 'Descrição',
            before: before.description,
            after: after.description
          });
        }

        return changes.length > 0 ? (
          <Box
            sx={{
              mt: 1,
              p: 1,
              borderRadius: 1,
              bgcolor: 'background.neutral',
              cursor: 'pointer'
            }}
            onClick={() => toggleExpand(item.id)}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
              Ver alterações
              <Iconify
                icon={expandedItems[item.id] ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                sx={{ ml: 0.5 }}
              />
            </Typography>
            <Collapse in={expandedItems[item.id]}>
              <Stack spacing={1} sx={{ mt: 1 }}>
                {changes.map((change, index) => (
                  <Box key={index}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                      {change.field}:
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'error.main', display: 'block', textDecoration: 'line-through' }}
                    >
                      {change.before}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'success.main', display: 'block' }}>
                      {change.after}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Collapse>
          </Box>
        ) : null;
      }

      case ServiceHistoryType.BUDGET_ACCEPTED:
        return (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {item.serviceOrder ? 
                `Ordem de Serviço gerada: ${item.serviceOrder.type.name}` :
                'Orçamento aceito e ordens de serviço geradas'
              }
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Card sx={{ p: 1, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Histórico
      </Typography>

      <Timeline>
        {history.map((item, index) => (
          <TimelineItem key={item.id}>
            <TimelineSeparator>
              <TimelineDot color={getColorByType(item.type)}>
                <Iconify icon={getIconByType(item.type)} width={24} />
              </TimelineDot>
              {index < history.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Stack spacing={1}>
                <Typography variant="subtitle2">{item.description}</Typography>

                {(item.budget || item.serviceOrder) && (
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {item.budget && `Orçamento: ${item.budget.name}`}
                    {item.serviceOrder && `Ordem de Serviço: ${item.serviceOrder.type.name}`}
                  </Typography>
                )}

                {renderChanges(item)}

                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {fDateTime(item.createdAt)}
                </Typography>
              </Stack>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Card>
  );
} 