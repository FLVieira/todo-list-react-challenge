import React from 'react';

import { App } from '@/core/components/App';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Lista de Tarefas',
	description: 'Minha lista de tarefas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				<App>
					{children}
				</App>
			</body>
		</html>
	);
}
