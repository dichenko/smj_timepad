import "./globals.css"; import type { Metadata } from "next";
export const metadata:Metadata={title:"Регистрация на конференцию",description:"Регистрация участников"};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
