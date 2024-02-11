import { useState } from 'react'
import { Link, useLocation } from '@remix-run/react'
import { LayoutGroup } from 'framer-motion'
import { useKBar } from 'kbar'
import { Header, List, ButtonHeader, Icon, Nav, Aside, Logo } from './styles';
import { Item } from './Item'
import { pages, ROUTES } from '~/constants'

export const Navbar = () => {
  const { pathname } = useLocation()
  const { query } = useKBar()
  const [hovered, setHovered] = useState('')

  return (
    <LayoutGroup>
      <Header>
        <Logo as={Link} to={ROUTES.home}>
          m
        </Logo>

        <Nav>
          <List>
            {pages.map(page => (
              <Item
                key={page}
                page={page}
                pathname={pathname}
                hovered={hovered}
                setHovered={setHovered}
              />
            )
            )}
          </List>
        </Nav>

        <Aside>
          <ButtonHeader
            aria-label="Command"
            onClick={query.toggle}
          >
            <Icon className="ri-command-line" />
          </ButtonHeader>
        </Aside>
      </Header>
    </LayoutGroup>
  )
}
