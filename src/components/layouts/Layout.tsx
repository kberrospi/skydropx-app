import { FC } from "react"
import Head from "next/head"
import { Grid, Image, Link } from "@nextui-org/react"
import styles from '../../styles/Layout.module.css'
import NextLink from "next/link"

interface Props {
  title?: string
}

export const Layout: FC<Props> = ({ title= 'SkydropxApp', children }) => {
  return (
    <>
      <Head>
        <title> { title } </title>
        <link rel="icon" href="/favicon.png"></link>
        <meta name="author" content="Keivin Berrospi" />
        <meta name="description" content="Skydropx" />        
        <meta name="keywords" content="envíos, transportadoras, logística" />

      </Head>
        <Grid.Container  
          className={ styles.container }
        >
          <NextLink href={'/'} passHref >
            <Link>
              <Image 
                src='/skydropx-logo.svg'
                width={200}
                alt='Logo'
              />
            </Link>
          </NextLink>
        <Grid className={ styles.content } >
          { children }
        </Grid>
      </Grid.Container>
    </>
  )
}
