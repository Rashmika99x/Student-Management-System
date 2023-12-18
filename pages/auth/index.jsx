// pages/index.tsx
import { useSession, signIn, signOut } from 'next-auth/react';
import Container from '@mui/material/Container';
import {SignInButton, WelcomeMessage} from './style'
import Typography from "@mui/material/Typography";


function Home() {
  const { data: session } = useSession();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Next.js + Material-UI + Styled Components Auth Example
      </Typography>
      {!session ? (
        <>
          <Typography variant="body1" paragraph>
            You are not signed in. Sign in with your Github account.
          </Typography>
          <SignInButton variant="contained" color="primary" onClick={() => signIn('github')}>
            Sign in with Github
          </SignInButton>
        </>
      ) : (
        <>
          <WelcomeMessage variant="h6" gutterBottom>
            Welcome, {session.user.name}!
          </WelcomeMessage>
          <SignInButton variant="outlined" color="primary" onClick={() => signOut()}>
            Sign out
          </SignInButton>
        </>
      )}
    </Container>
  );
}

export default Home;
