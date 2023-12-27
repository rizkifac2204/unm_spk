// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // ...add more providers here
//   ],
// };

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: "",
      clientSecret: "",
    }),
    // ...add more providers here
  ],
});

export { handler as GET, handler as POST };
