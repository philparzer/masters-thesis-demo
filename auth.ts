import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
 
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
 
        


        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          console.log("email", email)
          console.log("password", password)
            console.log(email, password)


          const isValidEmail = email === process.env.PREVIEW_USERNAME;
          const passwordsMatch = password === process.env.PREVIEW_PASSWORD;

          console.log(passwordsMatch, isValidEmail)
          console.log(process.env.PREVIEW_USERNAME, process.env.PREVIEW_PASSWORD)



          console.log("preview password" , process.env.PREVIEW_PASSWORD)
        console.log("password entered" , password)
 
          if (passwordsMatch && isValidEmail) return { email, id: "1" };
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});