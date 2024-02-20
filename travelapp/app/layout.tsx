"use client";
import { ReactNode } from "react";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import  getApolloClient  from "../app/lib/client";
import Page from "./page";
// import { AppProvider } from "./components/context";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const client = getApolloClient();
  return (
    <html lang="en"> 
      
      <body> 
      
        <ApolloProvider client={client}>
          {/* <AppProvider>  */}
          {/* <Page/> */}
          {children}
          {/* </AppProvider> */}
          </ApolloProvider>

      </body>
    </html>  

)
};