export const CodeDataPhp = `private function init_allowed_blocks(): void {
    add_filter(
        'allowed_block_types_all',
        [ $this, 'filter_allowed_blocks' ],
        10,
        2
    );
}`;

export const CodeDataReact = `export const Main = ({ children, hasPadding = true, className, ...rest }: MainProps) => {
    const rootClasses = ['octave-main', hasPadding && 'octave-main--padding', className]
        .filter(Boolean)
        .join(' ');

    return (
        <main className={rootClasses} {...rest}>
            <div className="alignfull has-global-padding is-layout-constrained entry-content">
                {children}
            </div>
        </main>
    );
};`;
