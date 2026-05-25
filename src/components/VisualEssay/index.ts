/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — COMPONENT LIBRARY
 * ===================================================
 * 
 * A complete component system for creating cinematic, award-winning
 * visual essay experiences following the V2 template specification.
 * 
 * Usage:
 * ```tsx
 * import {
 *   VisualEssay,
 *   MovementInvocation,
 *   MovementAncestral,
 *   MovementCollision,
 *   MovementModern,
 *   MovementRevelation,
 *   NarrationBlock,
 *   VoiceEternal,
 *   IngredientOracle,
 *   FlavorWheel,
 * } from '@/components/VisualEssay';
 * ```
 * 
 * Also import the base CSS:
 * ```css
 * @import '@/components/VisualEssay/cinematic-base.css';
 * ```
 * 
 * Template Reference: /workflows/visual-essay-template-v2.txt
 */

// ===========================================
// CINEMATIC MOVEMENT COMPONENTS
// ===========================================

export {
  VisualEssay,
  MovementInvocation,
  MovementAncestral,
  MovementCollision,
  MovementModern,
  MovementRevelation,
  CollisionPanel,
  CollisionContrast,
  ScrollIndicator,
} from './CinematicMovement';

// ===========================================
// NARRATION SYSTEM COMPONENTS
// ===========================================

export {
  NarrationBlock,
  VoiceSeen,
  VoiceUnseen,
  VoiceEternal,
  PullQuote,
  SectionTitle,
  SectionDivider,
} from './NarrationSystem';

// ===========================================
// INTERACTION MODE COMPONENTS
// ===========================================

export {
  IngredientOracle,
  MigrationTrail,
  FlavorWheel,
  TimefoldSlider,
  WhisperingObject,
} from './InteractionModes';

// Re-export types
export type { OracleItem } from './InteractionModes';
export type { Route, MapConfig } from './InteractionModes';
export type { FlavorSegment } from './InteractionModes';
export type { Era } from './InteractionModes';
export type { WhisperingObjectConfig } from './InteractionModes';

// ===========================================
// SCROLL & ANIMATION HOOKS
// ===========================================

export {
  useCinematicScroll,
  useIntersectionReveal,
  useParallax,
  useScrollDirection,
  useSectionProgress,
  useMovementProgress,
  useSmoothScrollTo,
  useReducedMotion,
} from './useCinematicScroll';

// ===========================================
// DEFAULT EXPORT
// ===========================================

import * as Movements from './CinematicMovement';
import * as Narration from './NarrationSystem';
import * as Interactions from './InteractionModes';
import * as Hooks from './useCinematicScroll';

export default {
  ...Movements,
  ...Narration,
  ...Interactions,
  ...Hooks,
};










