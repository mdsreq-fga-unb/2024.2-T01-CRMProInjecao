'use client';

import { BudgetDetailsView } from '@/sections/budget/view';

export default function BudgetDetailsPage({ params }: { params: { id: string } }) {
  return <BudgetDetailsView budgetId={params.id} />;
} 