import config from '../../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const fontSizes = config.tokens.fontSize;
const fontFamilies = config.tokens.fontFamily;
const baseStyles = config.baseStyles;

const SAMPLE_PARAGRAPH =
    'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow.';

type SectionProps = {
    title?: string;
    description?: string;
};

type FontSizeFilter = 'heading' | 'body' | 'all';

// fontSize tokens have two possible shapes:
//   { min, max }                                           — simple clamp
//   { value, fluid: { min, max }, cssOnly }                — explicit value + fluid range
// This normalizes both into a common { min, max } pair for display.
type FontSizeValue =
    | { min: string; max: string }
    | { value: string; fluid: { min: string; max: string }; cssOnly?: boolean };

function getFluidRange(size: FontSizeValue): { min: string; max: string } {
    return 'fluid' in size ? size.fluid : { min: size.min, max: size.max };
}

// Parse a font-size value (e.g. "1.5rem") into a number for sorting.
// For the simple {min, max} shape, use max as the representative size.
function sizeToNumber(size: FontSizeValue): number {
    const raw = 'value' in size ? size.value : size.max;
    return parseFloat(raw) || 0;
}

// Filter by token naming convention. Override per-usage with the `include`
// or `exclude` props if the convention doesn't fit a specific case.
function matchesFilter(name: string, filter: FontSizeFilter): boolean {
    if (filter === 'all') return true;
    const isHeading = name.startsWith('heading-');
    return filter === 'heading' ? isHeading : !isHeading;
}

function formatTokenName(name: string): string {
    return name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function SectionWrapper({
    title,
    description,
    children,
}: SectionProps & { children: React.ReactNode }) {
    return (
        <section className="sb-section">
            {(title || description) && (
                <header className="sb-header">
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                </header>
            )}
            <div className="sb-stack">{children}</div>
        </section>
    );
}

/* ---------- Base styles ---------- */

// Element rules from `baseStyles` in c2b.config.json. Only the typographic
// properties are modelled here; the same object also carries spacing and
// colour keys this page doesn't render.
type BaseStyleRule = {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string;
    lineHeight?: string;
    color?: string;
};

// Token categories whose values can be referenced by name from baseStyles.
type TokenCategory = 'fontFamily' | 'fontWeight' | 'lineHeight' | 'color';

const HEADING_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

// A baseStyles value is either a token name or a literal CSS value — c2b emits
// `font-weight: var(--octave--font-weight-light)` for "light" but a bare
// `font-weight: 600` for "600". Mirror that by checking the token map first.
function resolveValue(category: TokenCategory, value: string): string {
    const tokens = config.tokens[category] as Record<string, unknown>;
    if (!(value in tokens)) return value;
    const segment = category.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `var(--${prefix}--${segment}-${value})`;
}

// c2b emits the shared heading declarations in a `:where(h1, …, h6)` block, so
// the `heading` rule has to be merged under each element to match the output.
function getBaseStyleRule(element: string): BaseStyleRule {
    const rules = baseStyles as Record<string, BaseStyleRule>;
    const shared = element === 'body' ? undefined : rules.heading;
    return { ...shared, ...rules[element] };
}

function toSampleStyle(rule: BaseStyleRule): React.CSSProperties {
    return {
        fontFamily: rule.fontFamily ? resolveValue('fontFamily', rule.fontFamily) : undefined,
        fontSize: rule.fontSize ? `var(--${prefix}--font-size-${rule.fontSize})` : undefined,
        fontWeight: rule.fontWeight ? resolveValue('fontWeight', rule.fontWeight) : undefined,
        fontStyle: rule.fontStyle ?? 'normal',
        lineHeight: rule.lineHeight ? resolveValue('lineHeight', rule.lineHeight) : undefined,
        color: rule.color ? resolveValue('color', rule.color) : undefined,
    };
}

// The fluid min → max range behind a font-size token name, or null if the
// token named by baseStyles isn't in the fontSize scale.
function getRangeLabel(tokenName: string): string | null {
    const size = (fontSizes as Record<string, FontSizeValue>)[tokenName];
    if (!size) return null;
    const { min, max } = getFluidRange(size);
    return `${min} → ${max}`;
}

/**
 * Base styles — the typography c2b actually applies to `body` and `h1`–`h6`,
 * read from `baseStyles` in c2b.config.json. This is the applied scale, which
 * is a subset of the font-size tokens shown by `FontSizeTokens`.
 */
export function BaseStyles({ title, description }: SectionProps) {
    const elements = [...HEADING_ELEMENTS, 'body'];

    return (
        <SectionWrapper title={title} description={description}>
            {elements.map((element) => {
                const rule = getBaseStyleRule(element);
                const range = rule.fontSize ? getRangeLabel(rule.fontSize) : null;

                return (
                    <div key={element} className="sb-stack__item">
                        <p className="sb-stack__sample" style={toSampleStyle(rule)}>
                            {element === 'body' ? SAMPLE_PARAGRAPH : `Heading ${element.slice(1)}`}
                        </p>
                        <code className="sb-stack__meta">
                            {element}
                            {rule.fontSize && (
                                <>
                                    {' · '}
                                    var(--{prefix}--font-size-{rule.fontSize})
                                </>
                            )}
                            {range && ` · ${range}`}
                            {rule.fontWeight && ` · ${rule.fontWeight}`}
                        </code>
                    </div>
                );
            })}
        </SectionWrapper>
    );
}

/* ---------- Font size tokens ---------- */

type FontSizesProps = SectionProps & {
    /** Filter by token naming convention. Default `'all'`. */
    filter?: FontSizeFilter;
    /** Explicit list of token names to include. Overrides `filter`. */
    include?: string[];
    /** Explicit list of token names to exclude. Applied after filter/include. */
    exclude?: string[];
};

export function FontSizeTokens({
    filter = 'all',
    include,
    exclude,
    title,
    description,
}: FontSizesProps) {
    const entries = (Object.entries(fontSizes) as [string, FontSizeValue][])
        .filter(([name]) => {
            if (include) return include.includes(name);
            if (!matchesFilter(name, filter)) return false;
            if (exclude?.includes(name)) return false;
            return true;
        })
        .sort(([, a], [, b]) => sizeToNumber(b) - sizeToNumber(a));

    return (
        <section className="sb-section">
            {(title || description) && (
                <header className="sb-header">
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                </header>
            )}
            <table className="sb-token-table">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Variable</th>
                        <th>Range</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(([name, size]) => {
                        const { min, max } = getFluidRange(size);
                        return (
                            <tr key={name}>
                                <td>{formatTokenName(name)}</td>
                                <td>
                                    <code>
                                        --{prefix}--font-size-{name}
                                    </code>
                                </td>
                                <td>
                                    {min} → {max}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}

export function FontFamilies({ title, description }: SectionProps) {
    return (
        <SectionWrapper title={title} description={description}>
            {Object.entries(fontFamilies).map(([name, def]) => {
                const family = typeof def === 'string' ? def : def.value;
                return (
                    <div key={name} className="sb-stack__item">
                        <p
                            className="sb-stack__sample"
                            style={{ fontFamily: family, fontSize: '1.25rem', lineHeight: 1.4 }}
                        >
                            <strong>{name}</strong> — The quick brown fox jumps over the lazy dog
                        </p>
                        <code className="sb-stack__meta">
                            var(--{prefix}--font-family-{name}) · {family}
                        </code>
                    </div>
                );
            })}
        </SectionWrapper>
    );
}
