import type {Metadata} from 'next';
import { Prompt, Sarabun } from 'next/font/google';
import './globals.css'; // Global styles

const promptFont = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
});

const sarabunFont = Sarabun({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sarabun',
});

export const metadata: Metadata = {
  title: 'NotebookLM Workshop Companion | โดย ครูเด่น มาสเตอร์ฟา',
  description: 'แบบประกบทำเวิร์คช็อปจากศูนย์ระดับพรีเมียม วางโครงร่างสไลด์และถอดรหัสความคิดด้วย AI',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="th" className={`${promptFont.variable} ${sarabunFont.variable}`}>
      <body className="font-sarabun text-[#F5F5F0] bg-[#0F1A2C] antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
