import { examGroups, subjects } from '../data/content'
import { useInView } from '../hooks/useInView'
import Container from './Container'
import SubjectIcon from './SubjectIcon'

function SubjectCard({ name, icon }: (typeof subjects)[number]) {
  const { elementRef, hasEnteredView } = useInView<HTMLLIElement>(0.5)
  return (
    <li
      ref={elementRef}
      className={`flex flex-col gap-3 border-t-[3px] border-navy pt-4 md:gap-4 md:pt-5 ${hasEnteredView ? 'in-view' : ''}`}
    >
      <SubjectIcon name={icon} />
      <p className="font-serif text-[22px] leading-[1.15] text-navy md:text-[26px]">{name}</p>
    </li>
  )
}

export default function WhatWeTeach() {
  return (
    <section id="teach" className="scroll-mt-24 bg-white">
      <Container className="py-16 md:py-[120px]">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-navy md:text-[50px] lg:col-span-4">
            Every major exam a science student sits.
          </h2>
          <div className="grid gap-9 md:grid-cols-3 md:gap-x-10 lg:col-span-8">
            {examGroups.map((group) => (
              <div key={group.title}>
                <h3 className="pb-3.5 text-sm font-semibold text-muted md:text-[15px]">{group.title}</h3>
                <ul className="border-b border-line">
                  {group.exams.map((exam) => (
                    <li key={exam} className="border-t border-line py-3 font-serif text-2xl text-navy md:py-4 md:text-[28px]">
                      {exam}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-[88px] lg:grid-cols-6 lg:gap-x-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.name} {...subject} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
