// src/theme/actions.ts

export const ACTION_VARIANTS = {
    // Main page submit / creation buttons
    primary: 'bg-slate-900 text-amber-400 hover:bg-slate-800 border-transparent focus:ring-slate-900 shadow-sm',

    // Neutral actions (Cancel, Back, Secondary actions)
    secondary: 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300 focus:ring-slate-900 shadow-sm',

    // Ghost / Table row inline actions
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent focus:ring-slate-900',

    // Destructive / Delete actions
    danger: 'bg-rose-600 text-white hover:bg-rose-700 border-transparent focus:ring-rose-600 shadow-sm',

    // Danger Ghost (e.g. Delete icon button in table row)
    dangerGhost: 'bg-transparent text-rose-600 hover:bg-rose-50 hover:text-rose-700 border-transparent focus:ring-rose-600',

    // Status Accent Badges / Quick Action toggles
    success: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 focus:ring-emerald-600',
    warning: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 focus:ring-amber-600',
} as const;

export const ACTION_SIZES = {
    xs: 'px-2.5 py-1 text-xs gap-1.5 rounded-md',
    sm: 'px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider font-mono gap-1.5 rounded-lg',
    md: 'px-4 py-2 text-sm font-medium gap-2 rounded-lg',
    lg: 'px-5 py-2.5 text-base font-medium gap-2 rounded-xl',
} as const;

export type ActionVariant = keyof typeof ACTION_VARIANTS;
export type ActionSize = keyof typeof ACTION_SIZES;
