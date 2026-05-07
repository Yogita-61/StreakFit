import { useMemo, useState } from 'react'

const exerciseImages = [
  {
    type: 'floor',
    keywords: ['pushup', 'push-up', 'plank', 'dip', 'thrust'],
    title: 'Floor strength',
    shirt: '#5b8def',
    accent: '#e8f0ff',
    pose: {
      body: 'M92 120 Q145 92 214 117 L209 139 Q148 123 96 143 Z',
      head: { cx: 74, cy: 115, r: 22 },
      leftArm: 'M107 127 L98 169',
      rightArm: 'M183 125 L194 169',
      leftLeg: 'M209 132 L238 166',
      rightLeg: 'M191 134 L224 171'
    }
  },
  {
    type: 'squat',
    keywords: ['squat', 'lunge', 'leg', 'calf', 'step', 'wall sit', 'deadlift'],
    title: 'Lower body',
    shirt: '#20b486',
    accent: '#e4f8ef',
    pose: {
      body: 'M119 89 Q158 70 198 91 L187 148 Q158 166 130 148 Z',
      head: { cx: 158, cy: 60, r: 25 },
      leftArm: 'M124 106 L88 124',
      rightArm: 'M193 106 L229 124',
      leftLeg: 'M137 148 L105 179 L135 183',
      rightLeg: 'M181 148 L209 179 L237 177'
    }
  },
  {
    type: 'cardio',
    keywords: ['jump', 'knee', 'running', 'rope', 'burpee', 'walk'],
    title: 'Cardio',
    shirt: '#ff8a4c',
    accent: '#fff0df',
    pose: {
      body: 'M123 85 Q160 63 197 85 L189 145 Q160 163 131 145 Z',
      head: { cx: 160, cy: 55, r: 24 },
      leftArm: 'M128 99 L95 70',
      rightArm: 'M191 99 L224 70',
      leftLeg: 'M139 145 L118 184',
      rightLeg: 'M181 145 L216 174'
    }
  },
  {
    type: 'upper',
    keywords: ['curl', 'row', 'pull', 'raise', 'fly', 'punch', 'circle', 'press'],
    title: 'Upper body',
    shirt: '#8d6bff',
    accent: '#f0eaff',
    pose: {
      body: 'M121 90 Q160 68 199 90 L190 150 Q160 170 130 150 Z',
      head: { cx: 160, cy: 60, r: 25 },
      leftArm: 'M126 108 Q92 88 88 55',
      rightArm: 'M194 108 Q228 88 232 55',
      leftLeg: 'M140 150 L124 190',
      rightLeg: 'M180 150 L196 190'
    }
  },
  {
    type: 'core',
    keywords: ['crunch', 'twist', 'bridge', 'kick', 'superman', 'stretch'],
    title: 'Core and mobility',
    shirt: '#f35d7f',
    accent: '#ffe7ee',
    pose: {
      body: 'M96 125 Q145 94 206 123 L199 146 Q147 128 102 151 Z',
      head: { cx: 80, cy: 120, r: 22 },
      leftArm: 'M112 132 L82 160',
      rightArm: 'M176 124 L210 103',
      leftLeg: 'M199 139 L235 126',
      rightLeg: 'M196 145 L229 173'
    }
  }
]

function getImageSlug(exerciseName) {
  return exerciseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function getImageConfig(exerciseName) {
  const name = exerciseName.toLowerCase()
  return exerciseImages.find(image =>
    image.keywords.some(keyword => name.includes(keyword))
  ) || {
    type: 'general',
    title: 'Fitness exercise',
    shirt: '#4ea7ff',
    accent: '#e6f4ff',
    pose: {
      body: 'M122 91 Q160 70 198 91 L188 150 Q160 170 131 150 Z',
      head: { cx: 160, cy: 60, r: 25 },
      leftArm: 'M127 108 L98 135',
      rightArm: 'M193 108 L222 135',
      leftLeg: 'M140 150 L124 190',
      rightLeg: 'M180 150 L196 190'
    }
  }
}

function WorkoutAnimation({ exerciseName, large = false }) {
  const image = getImageConfig(exerciseName)
  const { pose } = image
  const slug = getImageSlug(exerciseName)
  const imageSources = useMemo(() => [
    `/workouts/${slug}.jpg`,
    `/workouts/${slug}.png`,
    `/workouts/${slug}.webp`,
    `/workouts/${slug}.jpeg`,
    `/workouts/${slug}.gif`
  ], [slug])
  const [sourceIndex, setSourceIndex] = useState(0)
  const currentSource = imageSources[sourceIndex]
  const videoSource = `/workouts/${slug}.mp4`

  if (currentSource) {
    return (
      <div className={`exercise-image ${large ? 'large' : ''} exercise-photo`}>
        <img
          src={currentSource}
          alt={exerciseName}
          onError={() => setSourceIndex(prev => prev + 1)}
        />
      </div>
    )
  }

  if (sourceIndex === imageSources.length) {
    return (
      <div className={`exercise-image ${large ? 'large' : ''} exercise-photo`}>
        <video
          src={videoSource}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setSourceIndex(prev => prev + 1)}
        />
      </div>
    )
  }

  return (
    <div className={`exercise-image ${large ? 'large' : ''} exercise-${image.type}`}>
      <svg viewBox="0 0 320 220" role="img" aria-label={`${exerciseName} exercise image`}>
        <defs>
          <linearGradient id={`exercise-bg-${image.type}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={image.accent} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        <rect x="28" y="18" width="264" height="178" rx="24" fill={`url(#exercise-bg-${image.type})`} />
        <path d="M62 174 C105 155 219 154 260 174" stroke="#d7e2ee" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="62" cy="52" r="7" fill="#ffd166" />
        <circle cx="256" cy="62" r="5" fill="#51cf66" />
        <path d="M235 36 L240 47 L252 51 L240 56 L235 68 L230 56 L218 51 L230 47 Z" fill="#ff8a4c" opacity="0.8" />

        <g className="exercise-person">
          <path d={pose.leftLeg} stroke="#27364a" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d={pose.rightLeg} stroke="#27364a" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d={pose.leftArm} stroke="#f5bf9a" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d={pose.rightArm} stroke="#f5bf9a" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d={pose.body} fill={image.shirt} />
          <path d="M136 101 Q160 113 184 101" stroke="rgba(255,255,255,0.55)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx={pose.head.cx} cy={pose.head.cy} r={pose.head.r} fill="#f5bf9a" />
          <path d={`M${pose.head.cx - 23} ${pose.head.cy - 3} Q${pose.head.cx - 10} ${pose.head.cy - 30} ${pose.head.cx + 15} ${pose.head.cy - 23} Q${pose.head.cx + 26} ${pose.head.cy - 12} ${pose.head.cx + 22} ${pose.head.cy + 4} Q${pose.head.cx + 5} ${pose.head.cy - 7} ${pose.head.cx - 23} ${pose.head.cy - 3} Z`} fill="#26324a" />
          <circle cx={pose.head.cx - 8} cy={pose.head.cy + 3} r="3.8" fill="#172033" />
          <circle cx={pose.head.cx + 10} cy={pose.head.cy + 3} r="3.8" fill="#172033" />
          <path d={`M${pose.head.cx - 8} ${pose.head.cy + 13} Q${pose.head.cx + 1} ${pose.head.cy + 19} ${pose.head.cx + 11} ${pose.head.cy + 13}`} stroke="#b76262" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        <text x="160" y="205" textAnchor="middle" className="exercise-image-label">
          {image.title}
        </text>
      </svg>
    </div>
  )
}

export default WorkoutAnimation
