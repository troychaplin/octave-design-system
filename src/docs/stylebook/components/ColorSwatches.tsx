import config from '../../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const colors = config.tokens.color;
const gradients = config.tokens.gradient;

type SwatchEntry = {
    name: string;
    preview: string; // hex value or gradient string — set as the swatch background
    cssVar: string;
    displayValue?: string; // hex to show below; undefined for gradients
};

function parseColors(names?: string[]): SwatchEntry[] {
    const entries = Object.entries(colors).map(([name, value]) => {
        const hex = typeof value === 'string' ? value : value.value;
        return {
            name,
            preview: hex,
            cssVar: `--${prefix}--color-${name}`,
            displayValue: hex,
        };
    });

    if (!names) return entries;

    return names.reduce<SwatchEntry[]>((acc, n) => {
        const entry = entries.find((e) => e.name === n);
        if (entry) acc.push(entry);
        return acc;
    }, []);
}

function parseGradients(): SwatchEntry[] {
    return Object.entries(gradients).map(([name, def]) => ({
        name,
        preview: def.value,
        cssVar: `--${prefix}--gradient-${def.slug}`,
    }));
}

type ColorSwatchesProps = {
    gradient?: boolean;
    names?: string[];
    title?: string;
    description?: string;
};

export function ColorSwatches({ gradient, names, title, description }: ColorSwatchesProps) {
    const entries = gradient ? parseGradients() : parseColors(names);

    return (
        <section className="sb-section">
            {(title || description) && (
                <header className="sb-header">
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                </header>
            )}
            <div className="sb-grid">
                {entries.map((entry) => (
                    <div key={entry.name} className="sb-swatch">
                        <div className="sb-swatch__color" style={{ background: entry.preview }} />
                        <strong className="sb-swatch__name">{entry.name}</strong>
                        <code className="sb-swatch__var">{entry.cssVar}</code>
                        {entry.displayValue && (
                            <span className="sb-swatch__value">{entry.displayValue}</span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
