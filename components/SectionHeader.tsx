/**
 * ============================================================================
 * SECTION HEADER COMPONENT (components/SectionHeader.tsx)
 * ============================================================================
 * Clean light-theme section header with optional badge and description.
 */

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`space-y-2 mb-10 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          {badge}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className={`text-base text-gray-500 max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
