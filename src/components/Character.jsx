const characterStyles = {
  Underweight: {
    shirt: '#5b8def',
    accent: '#dbe8ff',
    pose: 'gain'
  },
  Normal: {
    shirt: '#20b486',
    accent: '#ddf8ed',
    pose: 'balance'
  },
  Overweight: {
    shirt: '#ff9f43',
    accent: '#fff0df',
    pose: 'energy'
  },
  Obese: {
    shirt: '#f35d7f',
    accent: '#ffe6ec',
    pose: 'start'
  }
}

function Character({ category }) {
  const style = characterStyles[category] || {
    shirt: '#5b8def',
    accent: '#e6f4ff',
    pose: 'start'
  }

  const getMessage = () => {
    switch(category) {
      case 'Underweight':
        return 'Build Muscle & Gain Strength'
      case 'Normal':
        return 'Maintain Your Fitness Level'
      case 'Overweight':
        return 'Burn Fat & Get Fit'
      case 'Obese':
        return 'Start Strong, One Step at a Time'
      default:
        return 'Start Your Fitness Journey'
    }
  }

  return (
    <div className="character-container">
      <div className={`character-wrapper pose-${style.pose}`}>
        <svg viewBox="0 0 240 300" className="character-svg cute-user" role="img" aria-label="Cute fitness avatar">
          <defs>
            <linearGradient id={`avatar-bg-${style.pose}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={style.accent} />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          <circle cx="120" cy="130" r="104" fill={`url(#avatar-bg-${style.pose})`} />
          <ellipse className="avatar-shadow" cx="120" cy="244" rx="58" ry="11" fill="#cad6e3" />

          <g className="avatar-bounce">
            <path className="avatar-leg-left" d="M102 176 L90 232" stroke="#26324a" strokeWidth="18" strokeLinecap="round" />
            <path className="avatar-leg-right" d="M138 176 L152 232" stroke="#26324a" strokeWidth="18" strokeLinecap="round" />
            <path d="M81 238 L105 238" stroke="#172033" strokeWidth="10" strokeLinecap="round" />
            <path d="M145 238 L169 238" stroke="#172033" strokeWidth="10" strokeLinecap="round" />

            <path d="M79 116 Q120 85 161 116 L151 181 Q120 203 89 181 Z" fill={style.shirt} />
            <path d="M99 126 Q120 138 141 126" stroke="rgba(255,255,255,0.55)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="120" cy="156" r="9" fill="rgba(255,255,255,0.25)" />

            <path className="avatar-arm-left" d="M85 126 Q52 128 43 96" stroke="#f5bf9a" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path className="avatar-arm-right" d="M155 126 Q188 128 197 96" stroke="#f5bf9a" strokeWidth="16" strokeLinecap="round" fill="none" />
            <circle cx="42" cy="94" r="10" fill="#f5bf9a" />
            <circle cx="198" cy="94" r="10" fill="#f5bf9a" />

            <circle cx="120" cy="76" r="42" fill="#f5bf9a" />
            <path d="M79 70 Q87 34 121 35 Q156 35 162 72 Q142 58 117 60 Q96 61 79 70 Z" fill="#26324a" />
            <circle cx="105" cy="78" r="5" fill="#172033" />
            <circle cx="135" cy="78" r="5" fill="#172033" />
            <circle cx="106" cy="76" r="1.8" fill="#ffffff" />
            <circle cx="136" cy="76" r="1.8" fill="#ffffff" />
            <path d="M105 94 Q120 105 136 94" stroke="#b76262" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="90" cy="90" r="6" fill="#f7a9a2" opacity="0.5" />
            <circle cx="150" cy="90" r="6" fill="#f7a9a2" opacity="0.5" />
          </g>
        </svg>
      </div>
      <div className="character-message">
        <h3>{getMessage()}</h3>
      </div>
    </div>
  )
}

export default Character
