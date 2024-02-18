import { Layout } from '~/modules'
import { ContactForm } from '~/components'

export async function getStaticProps() {
  const meta = {
    title: 'Contact',
    image: '/images/contact.jpg',
    tagline: 'Email me. Like in the old days.',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

export default function Contact() {
  const description = `<strong>I love chatting</strong> with software engineers, tech founders, students, and creators. <strong>I'm a busy person</strong>, so I can't promise that I'll reply to your email right away, but I'll try my best to respond in a timely manner.`

  return (
    <Layout title='Contact' primaryColor='cyan'
      secondaryColor='green' >
      <p dangerouslySetInnerHTML={{ __html: description }} />

      <h2>Send an email</h2>

      <ContactForm />
    </Layout>
  )
}
