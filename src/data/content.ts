export type ServiceNeed = 'general' | 'group' | 'private' | 'sourcing'

export const serviceOptions: { id: ServiceNeed; label: string; whatsappIntro: string }[] = [
  { id: 'general', label: 'General enquiry', whatsappIntro: "Hello Bode, I'd like to make an enquiry." },
  { id: 'group', label: 'Group classes quote', whatsappIntro: "Hello Bode, I'd like a quote for group classes." },
  { id: 'private', label: 'Private tutoring quote', whatsappIntro: "Hello Bode, I'd like a quote for private tutoring." },
  {
    id: 'sourcing',
    label: 'Find me a tutor',
    whatsappIntro: "Hello Bode, I'm looking for a tutor in a subject you don't list. Could you recommend someone?",
  },
]

export const examGroups = [
  { title: 'Secondary school leaving', exams: ['WAEC', 'NECO', 'GCE'] },
  { title: 'University entry in Nigeria', exams: ['JAMB', 'Post-UTME', 'JUPEB'] },
  { title: 'International', exams: ['IGCSE', 'A Levels', 'SAT'] },
]

export const examOptions = ['WAEC', 'NECO', 'GCE', 'JAMB', 'Post-UTME', 'JUPEB', 'SAT', 'A Levels', 'IGCSE', 'Other']

export type SubjectIconName = 'physics' | 'chemistry' | 'biology' | 'mathematics' | 'furtherMaths' | 'english'

export const subjects: { name: string; icon: SubjectIconName }[] = [
  { name: 'Physics', icon: 'physics' },
  { name: 'Chemistry', icon: 'chemistry' },
  { name: 'Biology', icon: 'biology' },
  { name: 'Mathematics', icon: 'mathematics' },
  { name: 'Further Mathematics', icon: 'furtherMaths' },
  { name: 'English Language', icon: 'english' },
]

export const principles = [
  {
    title: 'Explained from first principles',
    body: 'Every topic starts with why it works, so formulas make sense instead of being memorised and forgotten.',
  },
  {
    title: 'Practised the way the exam asks',
    body: 'Past questions and exam technique are built into every class, so students meet no surprises on the day.',
  },
  {
    title: 'Taught live, by a real person',
    body: 'Students ask questions as they go and get answers straight away, in a group or one to one.',
  },
]

export const steps = [
  {
    title: 'Send an enquiry',
    body: 'Fill in the form, or message or call Bode, with your exam, your subjects and any questions.',
  },
  {
    title: 'Talk it through',
    body: 'Bode learns where the student is now, then recommends group classes or private tutoring.',
  },
  {
    title: 'Get your quote',
    body: 'You receive a clear fee for the option that fits, so you know the cost before you commit.',
  },
  {
    title: 'Join your class',
    body: 'Class details are shared in your WhatsApp group, and you join live on Zoom.',
  },
]

export const testimonials = [
  {
    quote: '[Parent testimonial: one or two sentences on what changed for their child.]',
    attribution: '[Parent name], parent of a [WAEC] student',
  },
  {
    quote: '[Student testimonial: how the classes helped them understand a hard topic.]',
    attribution: '[Student name], [exam and year]',
  },
]

export const faqs = [
  {
    question: 'Which exams do you prepare students for?',
    answer: 'WAEC, NECO, GCE, JAMB, Post-UTME, JUPEB, SAT, A Levels and IGCSE.',
  },
  {
    question: 'Which subjects can my child study?',
    answer: 'Physics, Chemistry, Biology, Mathematics, Further Mathematics and English Language.',
  },
  {
    question: 'How do the online classes work?',
    answer:
      'Group classes run live on Zoom. The schedule and class details are shared in a WhatsApp group for your class, so you always know when and how to join.',
  },
  {
    question: 'What is the difference between group classes and private tutoring?',
    answer:
      'Group classes follow a set programme alongside other students. Private tutoring is one to one and built around your child’s own gaps, exam and timetable.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Fees depend on the programme and the number of subjects. Send an enquiry and we will reply with a quote.',
  },
  {
    question: 'What if you do not teach the subject I need?',
    answer:
      'Choose “Find me a tutor” on the enquiry form and tell us the subject and the exam. We will recommend a tutor who can help.',
  },
]

export const footerLinks = [
  { label: 'What we teach', href: '#teach' },
  { label: 'Group classes and private tutoring', href: '#classes' },
  { label: 'Your tutor', href: '#tutor' },
  { label: 'Find a tutor', href: '#find-a-tutor' },
  { label: 'Questions parents ask', href: '#faq' },
  { label: 'Make an enquiry', href: '#enquire' },
]
