/* Знак Secretly — пузырь с отпечатком «S» — без подложки.
   Форма — маска /brand/mark.png (белый знак на прозрачном: важна только
   прозрачность), цвет — токен --logo-ink: белый в тёмной теме, чёрный в
   светлой. Размер слота задаёт className. Мастер и иконки из него —
   scripts/gen-assets.cjs. */
type Props = {
  className?: string
  /** Рядом уже написано «Secretly» — знак не озвучивать второй раз. */
  decorative?: boolean
}

export default function LogoMark({ className, decorative = false }: Props) {
  const cls = className ? `logo-mark ${className}` : 'logo-mark'
  return decorative
    ? <span className={cls} aria-hidden="true" />
    : <span className={cls} role="img" aria-label="Secretly" />
}
