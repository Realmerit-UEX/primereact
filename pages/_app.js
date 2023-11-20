<<<<<<< HEAD
import Layout from '@/components/layout/layout';
import PrimeReact from '@/components/lib/api/Api';
import '@docsearch/css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { useContext, useState } from 'react';
import { GTagManager } from '../components/analytics/analytics';
import { PrimeReactContext, PrimeReactProvider } from '../components/lib/api/PrimeReactContext';
import '../styles/demo/demo.scss';
import '../styles/layout/layout.scss';

function Main({ component: Component }) {
    const [dark, setDark] = useState(false);
    const [theme, setTheme] = useState('lara-light-cyan');
    const context = useContext(PrimeReactContext);

    const props = {
        dark: dark,
        theme: theme,
        onThemeChange: (newTheme, dark) => {
            if (context) {
                context.changeTheme(theme, newTheme, 'theme-link', () => {
                    setDark(dark);
                    setTheme(newTheme);
                });
            } else {
                PrimeReact.changeTheme(theme, newTheme, 'theme-link', () => {
                    setDark(dark);
                    setTheme(newTheme);
                });
            }
        }
    };

=======
import { GTagManager } from '@/components/analytics/analytics';
import AppContentContext from '@/components/layout/appcontentcontext';
import Layout from '@/components/layout/layout';
import { PrimeReactProvider } from '@/components/lib/api/PrimeReactContext';
import { switchTheme } from '@/components/utils/utils';
import '@docsearch/css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import '../styles/demo/demo.scss';
import '../styles/layout/layout.scss';

function AppContent({ component: Component, pageProps }) {
>>>>>>> upstream/master
    if (Component.getLayout) {
        return Component.getLayout(<Component {...pageProps} />);
    } else {
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    }
}

export default function MyApp({ Component, pageProps }) {
    const isProduction = process.env.NODE_ENV === 'production';
    const [darkMode, setDarkMode] = useState(false);
    const [theme, setTheme] = useState('lara-light-cyan');
    const [newsActive, setNewsActive] = useState(false);
    const [announcement, setAnnouncement] = useState(null);

    const appState = {
        darkMode: darkMode,
        theme: theme,
        newsActive: newsActive,
        announcement: announcement,
        changeTheme: (newTheme, dark) => {
            if (newTheme !== theme) {
                switchTheme(theme, newTheme, 'theme-link', () => {
                    setDarkMode(dark);
                    setTheme(newTheme);
                });
            }
        },
        showNews: (message) => {
            setNewsActive(true);
            setAnnouncement(message);
        },
        hideNews: () => {
            setNewsActive(false);
        }
    };

    const primereactConfig = {
        ripple: true
    };

    return (
        <AppContentContext.Provider value={appState}>
            <PrimeReactProvider value={primereactConfig}>
                {isProduction && <GTagManager />}
                <AppContent component={Component} pageProps={pageProps} />
            </PrimeReactProvider>
        </AppContentContext.Provider>
    );
}
