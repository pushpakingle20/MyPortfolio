// Splits text into letters so CSS can animate them one by one.
export default function SplitText({ text, as: Tag = 'span', className }) {
  return (
    <Tag className={className} aria-label={text}>
      {[...text].map((c, i) =>
        c === ' ' ? (
          <span key={i} className="sp" aria-hidden="true" />
        ) : (
          <span key={i} className={c === '.' ? 'ch dot' : 'ch'} aria-hidden="true" style={{ '--i': i }}>
            {c}
          </span>
        ),
      )}
    </Tag>
  )
}
