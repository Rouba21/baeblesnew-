interface DividerProps {
  symbol?: string;
}

export function Divider({ symbol = '✦' }: DividerProps) {
  return (
    <div className="baebles-divider">
      <span>{symbol}</span>
    </div>
  );
}
