import { Link } from '@remix-run/react'
import { items } from '~/data'
import { parseISO, format } from 'date-fns'
import { Lottie } from '../Lottie'
import { Container, Section, Paragraph, ButtonsContainer, styles, Content, Description } from './styles'
import { getDuration, useBio } from './utils';
import { Dot } from './Dot'
import { ButtonPrimary } from '~/ui'
import { copyBioIcon, downloadIcon } from '~/assets'

export const Intro = () => {
  return (
    <Container>
      <Section>
        <img
          alt="Zeno"
          src="/images/ld.jpg"
          width="336"
          height="336"
          // placeholder="blur"
          // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
          // priority
        />
      </Section>

      <Section>
        <Paragraph css={styles.paragraph}>
          <strong>Hey, I'm Mansurov Nozim</strong>. I started working as a software developer back in 2022.
        </Paragraph>

        <Paragraph>
          I am a <strong>Web developer</strong> and specialize in developing web applications using React and Next. I'm originally from Syrdarya and now living in <strong>Tashkent.</strong>
        </Paragraph>

        <Paragraph>
          <strong>I love React</strong>, open source, and side projects.
          When I'm not working, I like playing playstation, reading books, watching movies, and <strong>cooking</strong>.
        </Paragraph>
      </Section>
    </Container>
  )
}

export const Bio = ({ description }: { description: string }) => {
  const {
    copyBio,
    downloadHeadShot,
    copyBioRef,
    downloadRef,
  } = useBio(description)

  return (
    <>
      <blockquote>
        <p>{description}</p>
      </blockquote>

      <ButtonsContainer>
        <ButtonPrimary
          as="button"
          css={styles.button}
          onClick={copyBio}
          onMouseEnter={() => copyBioRef.current?.play()}
          onMouseLeave={() => copyBioRef.current?.stop()}
        >
          {/* <Lottie
            mr
            lottieRef={copyBioRef}
            animationData={copyBioIcon}
          /> */}

          Copy Bio
        </ButtonPrimary>

        <Dot margin />

        <ButtonPrimary
          as="a"
          download
          role="button"
          href="/images/ld.jpg"
          css={styles.button}
          onClick={downloadHeadShot}
          onMouseEnter={() => downloadRef.current?.play()}
          onMouseLeave={() => downloadRef.current?.stop()}
        >
          {/* <Lottie
            mr
            lottieRef={downloadRef}
            animationData={downloadIcon}
          /> */}

          Download Headshot
        </ButtonPrimary>
      </ButtonsContainer>
    </>
  )
}

export const All = () => (items.map((item, idx) =>
(
  <Content key={idx}>
    <h3>{item.jobTitle}</h3>

    <Description>
      <Link to={item.companyUrl} target="_blank">
        {item.company}
      </Link>

      <Dot>
        {item.location}
      </Dot>
    </Description>

    <Description>
      <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>

      <span> – </span>

      <span>
        {item.endDate
          ? format(parseISO(item.endDate), 'LLL yyyy')
          : 'Present'}
      </span>

      <Dot />

      <span>{getDuration(item.startDate, item.endDate)}</span>
    </Description>
  </Content>
)))
