'use client';

import { ServiceOrderDetailsView } from "@/sections/service-order/view";

export default function ServiceOrderDetailsPage({ params }: { params: { id: string } }) {
  return <ServiceOrderDetailsView serviceOrderId={params.id} />;
} 