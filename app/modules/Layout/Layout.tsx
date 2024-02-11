import { useLocation } from 'react-router';
import { ReactElement } from 'react'
import { GradientTitle, styles, Main, Container, Content } from './styles';
import { ROUTES } from '~/constants';

type Props = {
  title: string;
  tagline?: string;
  primaryColor?: string;
  secondaryColor?: string;
  children: ReactElement;
}

export const Layout = ({ title, tagline, primaryColor, secondaryColor, children }: Props) => {
  const { pathname } = useLocation()
  const isHome = pathname === ROUTES.home

  return (
    <Main css={styles.main(primaryColor, isHome)}>
      <Content>
        <Container>
          {tagline ?
            <GradientTitle css={styles.title(primaryColor, secondaryColor)}>
              {tagline}
            </GradientTitle>
            :
            <h1>{title}</h1>
          }

          {children}
        </Container>
      </Content>
    </Main>
  )
}
