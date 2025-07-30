import { DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

export function DragOverlayWrapper({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') return null;

  const portalContainer = document?.getElementById('drag-overlay-root') || document.body;

  return createPortal(<DragOverlay>{children}</DragOverlay>, portalContainer);
}
