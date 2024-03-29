import { Item } from './Item';
import { Container } from './styles';
import { links } from '~/constants';

export const Footer = () => (
  <Container>
    {links.map((link, idx) => (
      <Item key={idx} {...link} />
    ))}
  </Container>
)
