import type { Metadata } from "next";
import JourneyHero from "../../components/JourneyHero";

export const metadata: Metadata = { title: "Our Journey" };

const CHALLENGES = [
  "With learning econometrics comes the assumption we can simply use it immediately. In reality, the applied part is itself a subject to learn. Developing countries’ colleges evaluate skills differently from how real challenges do; this mystifies the students and inflates the difficulty of dealing with such real challenges.",
  "Many learners have mathematical and statistical lenses on these subjects. But the reality is much more theoretical and applied. Having a better understanding of, and even excelling in math and statistics is a great blessing but not necessary to learn these skills.",
  "Learning statistical and econometric skills needs patience. It also requires consistent efforts to read, observe, analyze and cumulatively link the different components of these subjects. Its modules are interlinked. That means as we enter this subject, we have to make a sequence of learning the methods in such a way that we can understand the application of different models along with a clarity of the methods and their limitations.",
  "Theory and application need to be balanced, and not only a balance of skills from different allied subjects like math and statistics but also consistent efforts to practice the applied part. This goes hand-in-hand with a deep understanding of the theory. A real challenge is that either these subjects are missing in many places, or they just start with theories in isolation from each other. They learn in a segmented fashion rather than as a narrative.",
  "Effective use of software knowledge inherently requires a better understanding of methods. Today, many are running after the software skills of different statistical packages. Such are the demands of working with these subjects. In the past 20 years, almost all the statistical packages developed have inbuilt functions to run statistical and econometric tools. Making precise calculations is much easier. But answers require logical explanations. For that, the theory of the methods is critical, and its synergy with the research question/problem needs to be understood first.",
  "Students need more independence in learning these methods and tools rather than making them dependent on instructors or institutions.",
];

const APPROACH = [
  "For every method taught the theory is first; application with software follows. Scholars can understand the need and limitations at the same time. The content is such that the balance between theory, application and software skills is delicate but deliberate.",
  "Second, we consistently pull out all the stops to reduce costs. Our fee would be less than any of the organisations with such courses. This casts a net as large as possible in this dimension.",
  "To build confidence among students, scholars and faculty members, we run everything serially and transparently and make all the changes as per the feasibility of suggestions. Now, we have long-run confidence that it will eventually help us to have goodwill among the scholarly community. For the past two years, we have conducted many offline workshops for educational institutes at almost no cost so that we can interact with more and more students and scholars to posit our ideas and efforts.",
  "Fourth, we explain the importance of theory during the applied part. With every demonstration, we always explain the answers to push the participants to understand the relevance of first having more knowledge about theoretical aspects before jumping into applications or conclusions.",
  "For better knowledge in beginners about the subject, we are trying to have more and more graphical methods in every explanation as required. Real examples are also provided. This helps to make the concepts more imaginable.",
  "At last, we encourage independence all the way. For that, we get scholars to accept hard work and find ways to solve real problems. This can include learning new or advanced methods. For that, we adopted teaching methods that avoid readymade answers or resources. Rather, we always make sure that they put equivalent efforts from their end to learn every aspect.",
];

const POEM = [
  [
    "Two roads diverged in a yellow wood,",
    "And sorry I could not travel both",
    "And be one traveller, long I stood",
    "And looked down one as far as I could",
    "To where it bent in the undergrowth;",
  ],
  [
    "Then took the other, as just as fair,",
    "And having perhaps the better claim,",
    "Because it was grassy and wanted wear;",
    "Though as for that the passing there",
    "Had worn them really about the same,",
  ],
  [
    "And both that morning equally lay",
    "In leaves no step had trodden black.",
    "Oh, I kept the first for another day!",
    "Yet knowing how way leads on to way,",
    "I doubted if I should ever come back.",
  ],
  [
    "I shall be telling this with a sigh",
    "Somewhere ages and ages hence:",
    "Two roads diverged in a wood, and I—",
    "I took the one less travelled by,",
    "And that has made all the difference.",
  ],
];

function Section({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 md:mt-16">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-zinc-700">{children}</div>
    </section>
  );
}

export default function OurJourneyPage() {
  return (
    <div className="flex-1 bg-[#fafafa]">
      <JourneyHero />
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Our Journey</h1>
        <p className="mt-4 leading-relaxed text-zinc-700">
          Our journey begins in 2011. After two years of theoretical training and three years of applied training in
          econometrics and empirical research methods from Panjab University and Jawaharlal Nehru University, we started
          an applied-skills program with a small group of researchers and economics students in Chandigarh. For the first
          two years, we had a small number of participants. But we learned the need for such courses. We also discovered
          the challenges in providing such highly demanding and empirical research-oriented courses.
        </p>

        <Section title="From 2016 to 2020">
          <p>
            We subsequently worked with scholars from different universities and colleges from Haryana, Panjab,
            Chandigarh and Himachal to understand their difficulties in learning or acquiring applied skills in
            statistics and econometrics. In these two years, we also got to work with two private universities in Punjab
            and two colleges in Chandigarh to train their Economics and Commerce students in these applied skills.
          </p>
          <p>
            From this 9-year teaching-learning journey, we found what’s needed to help scholars and students of
            economics and other allied streams in empirical research. In short, it’s making courses to not only help
            theoretical understanding but also provide practical training in these applied skills. At the same time,
            lower fees are essential so that a maximum number of students and scholars can access these courses. Our
            first challenge was standardizing content which fulfills the needs of as many students and research scholars
            in academic and corporate circles as possible. Simultaneously, building trust among students, scholars,
            working professionals and faculty members is critical to overcoming these challenges.
          </p>
          <p>
            Another unexpected challenge was marketing the fee structure and the need for these skills. Due to the
            numerous online educational platforms, it&apos;s tough to distinguish ourselves from others and display the
            effort going into making these applied courses.
          </p>
        </Section>

        <Section title="Major Challenges in Teaching and Learning Statistical and Econometric Tools">
          <ol className="space-y-4">
            {CHALLENGES.map((text, i) => (
              <li key={i} className="card flex gap-4 p-5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand">
                  {String.fromCharCode(97 + i)}
                </span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Our Approach">
          {APPROACH.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </Section>

        <Section title="A few events in our journey helped us to overcome all these challenges">
          <p>
            We organized a National workshop on NSSO UNIT LEVEL DATA EXTRACTION in February 2020, at Akal University
            (Bathinda, Punjab). This was our first successful event. Almost thirty participants from 8 different states
            joined this workshop. Faculty, along with research scholars, joined this workshop.
          </p>
          <p>
            Then, we realized that it&apos;s not a problem in one region. Across states, the situation is more or less the
            same. An alarming number of research scholars and students lack applied research skills. Either these courses
            are very expensive or otherwise inaccessible. One of the main reasons is the scarcity of experts training
            researchers and students in these applied skills.
          </p>
        </Section>

        <Section title="A Pandemic as an Opportunity (2020 onward)">
          <p>
            In August 2020, with the help of Prof. Shveta Singh IIT Delhi, Dr Navneet Kaur Manchanda (World Bank
            Consultant), Research Scholar Harmanender Singh (Panjab University) and Gaibul Preet (University of
            Hyderabad), we organised our First 5-Day Online NSSO UNIT LEVEL DATA EXTRACTION WORKSHOP. Almost 25 scholars
            from different universities joined this workshop. This was our first independent Online workshop. With this,
            we learned how to overcome the challenge of teaching applied skills online. Not only did we successfully
            conduct the workshop, but we also continuously provided individual support to all the participants during all
            the practical sessions to overcome errors.
          </p>
          <p>
            Just after the Online NSSO UNIT LEVEL DATA EXTRACTION WORKSHOP in September 2020, we started our
            four-month–long Statistical and Econometric training program for students and researchers. Twenty-four
            participants from eleven different states and twelve different institutes joined our program. It helped us to
            understand the challenges of online teaching-learning and improve our content and delivery. During this
            tenure, we registered STATS2ECONO as STATS2ECONO APPLIED RESEARCH Pvt. Ltd, to help participants with smooth
            transactions and issue certificates.
          </p>
          <p>
            Afterwards, we completed nine more online series of Statistical and Econometric Analysis courses of four
            months each (One offline as well), and twelve more NSSO ONLINE UNIT LEVEL DATA EXTRACTION WORKSHOPS (Two
            offline).
          </p>
        </Section>

        <Section title="A Few of Our Achievements in the past nine years">
          <p>
            We have trained more than 600 participants, including students, scholars, faculty members and working
            professionals from nearly 65 universities and 20 plus countries. It also includes many institutes of National
            Importance (Central universities/IITs etc.) and scholars from countries like Germany, Italy, France,
            Malaysia, Saudi Arabia, Canada, USA and the Netherlands.
          </p>
          <p>
            We successfully provided these courses with almost 50 to 70 per cent concession for scholars and students.
            For the coming times too, we will cover all the taxes on behalf of participants, which is approx. 30 to 40
            per cent of the fee.
          </p>
          <p>
            STATS2ECONO is now running 5 courses to fulfil our promise of covering as many applied skills in empirical
            research as possible. This is approx. 200 to 220 hours of training programs. In the coming years, we will add
            one more course to help beginners with mathematical and statistical skills.
          </p>
          <p>
            To help scholars from India, we completed 15 workshops to train scholars in big national surveys with skills
            like extraction, merging, append, reshaping, weight and many other required skills for these large data
            sets. We almost extracted more than 15 rounds from the past 30 years of data. We have also started guiding
            scholars to utilize other data sets like IHDS and DHS.
          </p>
          <p>
            Recently, STATS2ECONO also got an opportunity from a few universities to train their students and scholars
            offline. In the coming years, we expect more such opportunities from academic institutions. And also getting
            small consulting projects from organizations.
          </p>
        </Section>

        <Section title="Our Vision">
          <p>
            Every student or scholar who needs such skills in academic or corporate circles can learn such subjects
            easily and affordably. We know that we can&apos;t do it for everyone, but those who are a part of us at least
            have the maximum from our side. We also plan to have one small research center in Himachal Pradesh with
            accommodations for scholars so that we can train as many scholars for as little as possible. To walk along
            this journey with a great sense of accomplishment, we need all the support we can get.
          </p>
          <p>These lines by Robert Frost we found express our journey succinctly —</p>
        </Section>

        <blockquote className="card mt-6 space-y-5 p-6 text-center italic leading-relaxed text-zinc-700 sm:p-8">
          {POEM.map((stanza, i) => (
            <p key={i}>
              {stanza.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          ))}
        </blockquote>
      </article>
    </div>
  );
}
