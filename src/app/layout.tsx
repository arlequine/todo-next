import './globals.css';
import { TaskProvider } from './context/TaskContext';
import Image from 'next/image';
import logo from './assets/img/arlequin-logo.svg'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="relative p-4">
          <div className="w-full flex justify-start">
          <Image src={logo} alt="Logo" layout="responsive" width={500} height={500} className="w-full max-w-lg" />
          </div>
          <div className="flex flex-col items-center">
            <TaskProvider>
              {children}
            </TaskProvider>
          </div>
        </div>
      </body>
    </html>
  );
}