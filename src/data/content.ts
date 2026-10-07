export type ServiceNeed = 'trial' | 'general' | 'group' | 'private' | 'sourcing'

export const serviceOptions: { id: ServiceNeed; label: string; whatsappIntro: string }[] = [
  { id: 'trial', label: 'Book a free trial', whatsappIntro: "Hello Bode, I'd like to book a free trial." },
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
  { title: 'Secondary school exams', exams: ['WAEC', 'NECO', 'GCE'] },
  { title: 'University entry (Nigeria)', exams: ['JAMB', 'Post-UTME', 'JUPEB'] },
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
    title: 'Understand it, don’t memorise it.',
    body: 'Every topic starts with why it works, so formulas make sense instead of being memorised and forgotten.',
  },
  {
    title: 'Practised the way the exam asks.',
    body: 'Past questions and exam technique are built into every class, so nothing on exam day feels new.',
  },
  {
    title: 'Live classes, real answers.',
    body: 'Ask questions as we go and get answers straight away, in a group or one-to-one.',
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

export const testimonials: { quote: string; attribution: string; detail?: string }[] = [
  {
    quote:
      'Before I met Bode I had almost lost confidence in my academic abilities, especially in Physics and Chemistry. His teaching completely changed my mindset and made me believe that I could actually excel academically. Today, I proudly say that I scored 337 in JAMB (UTME 2026) and I am confidently aspiring to study Pharmacy at the University of Lagos (UNILAG).',
    attribution: 'Okoli Chukwudumaga',
    detail: 'JAMB UTME 2026: 337',
  },
  {
    quote:
      'I remember a few years back when I didn’t know Chemistry, Physics and Mathematics, but my friend introduced me to Bode and I gave it a chance because I had nothing to lose. Now I got 320 in JAMB (UTME 2026) and I am pursuing admission at Obafemi Awolowo University (OAU) to study Mechanical Engineering.',
    attribution: 'Oluwola Daniel',
    detail: 'JAMB UTME 2026: 320',
  },
  {
    quote:
      'In 2017, I was fortunate to meet Bode while I was still in SS3. I only spent three months with him, literally three months, but they were very intense and helped me achieve a score of 303 in JAMB (UTME 2017). In 2024, I graduated with a BSc in Pure and Applied Physics.',
    attribution: 'Sikiru Razak Boluwatife',
    detail: 'JAMB UTME 2017: 303',
  },
  {
    quote:
      'Learning with Bode gave me the foundation to believe in my potential, embrace challenges, and pursue opportunities beyond what I imagined possible.',
    attribution: 'Fatima Dabiri',
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
      'Classes are live on Zoom. Once you join, you’re added to a class WhatsApp group where we share the schedule, links and updates. You’ll need a phone or laptop and a stable internet connection.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. Pick one subject, either your easiest or the one you struggle with most, and attend a class free before you commit.',
  },
  {
    question: 'What if a student misses a class?',
    answer: 'All classes are recorded for students to rewatch and gain clarity.',
  },
  {
    question: 'What is the difference between group classes and private tutoring?',
    answer:
      'Group classes follow a set programme alongside other students. Private tutoring is one to one and built around your child’s own gaps, exam and timetable.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Group classes start from ₦30,000 for a 4-subject combination per month. Private tutoring starts from ₦300,000 per month. The final price depends on your exam and subjects, and we confirm it before you pay.',
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
  { label: 'Frequently asked questions', href: '#faq' },
  { label: 'Make an enquiry', href: '#enquire' },
]
