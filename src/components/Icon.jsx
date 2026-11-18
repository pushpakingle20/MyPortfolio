import { Briefcase, Cpu, Github, GraduationCap, Layers, Linkedin, Mail } from 'lucide-react'

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail, briefcase: Briefcase, cpu: Cpu, layers: Layers, graduation: GraduationCap }

export default function Icon({ name, size = 20 }) {
  const Comp = ICONS[name]
  return Comp ? <Comp size={size} strokeWidth={2} aria-hidden="true" /> : null
}
