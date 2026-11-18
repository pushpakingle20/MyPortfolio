export const profile = {
  name: 'Pushpak Ingle',
  email: 'Pushpakingle20@gmail.com',
  phone: '8793404190',
  phoneHref: '+918793404190',
  linkedin: 'https://www.linkedin.com/in/pushpak-ingle-65ba5a257',
  github: 'https://github.com/pushpakingle20',
  location: 'Nagpur, Maharashtra, India',
}

// icon names map to lucide-react icons in components/Icon.jsx
export const aboutItems = [
  {
    title: 'Engineering',
    icon: 'github',
    link: { label: 'View Github', href: profile.github, external: true },
    paras: [
      'I build full-stack web applications with MongoDB, Express.js, React.js and Node.js, and with Python and Flask. I plan REST APIs, build responsive interfaces and manage databases, taking each feature from the first CRUD screen through testing and debugging.',
    ],
  },
  {
    title: 'Experience',
    icon: 'briefcase',
    link: { label: 'View LinkedIn', href: profile.linkedin, external: true },
    paras: [
      'Python and Flask Intern at Anishree Technologies LLP (Jan 2026 – May 2026), where I improved a Society Maintenance Management System with resident management, payment tracking and complaint handling.',
      'MERN Stack Developer Intern at Upzinex (Feb 2026 – Mar 2026), where I built an E-commerce Store, Chat App, Spotify Clone, Movie Admin Dashboard and To-Do List.',
      'MERN Stack Developer Intern at Pandharkars Infotech Pvt. Ltd., where I enhanced full-stack applications and connected frontend and backend systems through REST APIs.',
    ],
  },
  {
    title: 'Skills',
    icon: 'layers',
    link: { label: 'View Projects', href: '#projects' },
    groups: [
      ['Frontend', ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI']],
      ['Backend', ['Node.js', 'Express.js', 'REST APIs', 'Flask']],
      ['Databases', ['MongoDB', 'MySQL', 'Oracle Database']],
      ['Languages', ['JavaScript', 'Python', 'SQL', 'Oracle PL/SQL']],
      ['Tools', ['Git', 'GitHub', 'VS Code', 'MS Office']],
    ],
  },
  {
    title: 'Electronics',
    icon: 'cpu',
    link: { label: 'Get in touch', href: '#contact' },
    paras: [
      'My engineering degree gave me hands-on time with Arduino and ESP32, IoT fundamentals and circuit design basics. It also gave me the habit of thinking in systems and tracing a problem from input to output, which carries straight into debugging software.',
    ],
  },
  {
    title: 'Education',
    icon: 'graduation',
    paras: [
      'B.Tech in Electronics Engineering, Yashwantrao Chavhan College of Engineering, Nagpur (2021 – 2026). Diploma in Electrical Engineering, Manav School of Engineering, Akola (2021).',
      'Certifications: Python and MERN Stack Developer, Seed Infotech (Feb 2025 – Mar 2026); Python and Flask Intern, Anishree Technologies LLP; MERN Stack Developer Internship, Upzinex.',
    ],
  },
]

// colors: [primary, secondary] used for the generated preview screens
// kind: key of PREVIEW_SCREENS in utils/preview.js (all cards use the same 16:10 preview size)
export const projects = [
  { name: 'Society Maintenance System', tags: ['Python', 'Full-stack'], desc: 'Resident and admin portal for profiles, maintenance payments and complaint tracking, built with Python and Flask.', colors: ['#5b2a86', '#c0392b'], kind: 'portal' },
  { name: 'Chat App', tags: ['MERN'], desc: 'Real-time messaging between users, with authentication and a responsive React interface.', colors: ['#0f766e', '#1d4ed8'], kind: 'chat' },
  { name: 'E-commerce Store', tags: ['MERN'], desc: 'Product browsing and cart management with user authentication and CRUD operations.', colors: ['#b45309', '#be185d'], kind: 'shop' },
  { name: 'Chatbot Profit & Loss', tags: ['Full-stack'], desc: 'A chatbot that collects income and expenses, then calculates revenue, expenses and net profit or loss.', colors: ['#374151', '#4d7c0f'], kind: 'bot' },
  { name: 'Spotify Clone', tags: ['MERN'], desc: 'A music-streaming interface with playlist features, backed by Node.js and MongoDB.', colors: ['#065f46', '#15803d'], kind: 'music' },
  { name: 'Movie Admin Dashboard', tags: ['MERN'], desc: 'An admin dashboard for managing movie content through REST APIs.', colors: ['#1e3a8a', '#7c3aed'], kind: 'dash' },
  { name: 'To-Do List', tags: ['MERN'], desc: 'Task management with create, update and delete flows, saved in MongoDB.', colors: ['#9a3412', '#ca8a04'], kind: 'todo' },
]

export const projectFilters = ['All', 'MERN', 'Python', 'Full-stack']

export const stats = [
  { value: 3, label: 'Internships' },
  { value: 7, label: 'Projects' },
  { value: 3, label: 'Certifications' },
]

export const techStack = ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Python', 'Flask', 'MySQL', 'Oracle', 'REST APIs', 'Git', 'Arduino', 'ESP32']
