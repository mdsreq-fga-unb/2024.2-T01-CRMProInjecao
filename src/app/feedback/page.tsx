'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import FeedbackClientForm from '@/sections/feedback/feedback-client-form';
import { useGetFeedbackByToken } from '@/api/feedback';
import { LoadingScreen } from '@/components/loading-screen';

export default function FeedbackPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { feedbackData, loading } = useGetFeedbackByToken(token);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!feedbackData) {
    return (
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Link inválido ou expirado
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Avaliação de Serviço
      </Typography>

      <FeedbackClientForm
        client={feedbackData.client}
        serviceOrder={feedbackData.serviceOrder}
      />
    </Container>
  );
} 