import { StyleClass } from '@/components/lib/styleclass/StyleClass';
import { classNames } from '@/components/lib/utils/Utils';
import { DocSearch } from '@docsearch/react';
import Link from 'next/link';
import pkg from 'package.json';
import { useEffect, useRef } from 'react';

export default function Topbar(props) {
    const versionsRef = useRef(null);
    const versions = [
        {
            name: `v${pkg.version.split('.')[0]}`,
            version: pkg.version,
            url: 'https://www.primereact.org'
        },
        {
            name: 'v9',
            version: '9.6.3',
            url: 'https://v9.primereact.org'
        }
    ];

    {
        /* doc https://docsearch.algolia.com/docs/api/#transformitems */
    }

    function handleDocSearchTransformItems(items) {
        const isLocalhost = process.env.NODE_ENV !== 'production';

        return items.map((item) => {
            if (isLocalhost) {
                const url = new URL(item.url);

                url.protocol = window.location.protocol;
                url.hostname = window.location.hostname;
                url.port = window.location.port;
                item.url = url.toString();
            }

            return item;
        });
    }

    const onMenuButtonClick = () => {
        props.onMenuButtonClick();
    };

    const onConfigButtonClick = () => {
        props.onConfigButtonClick();
    };

    const containerElement = useRef(null);
    const scrollListener = useRef();

    const bindScrollListener = () => {
        scrollListener.current = () => {
            if (containerElement && containerElement.current) {
                if (window.scrollY > 0) containerElement.current.classList.add('layout-topbar-sticky');
                else containerElement.current.classList.remove('layout-topbar-sticky');
            }
        };

        window.addEventListener('scroll', scrollListener.current);
    };

    const unbindScrollListener = () => {
        if (scrollListener.current) {
            window.removeEventListener('scroll', scrollListener.current);
            scrollListener.current = null;
        }
    };

    useEffect(() => {
        bindScrollListener();

        return function unbind() {
            unbindScrollListener();
        };
    }, []);

    const toggleDarkMode = () => {
        props.onDarkSwitchClick();
    };

    return (
        <div ref={containerElement} className="layout-topbar">
            <div className="layout-topbar-inner">
                <div className="layout-topbar-logo-container">
                    <Link href="/">
                        <a className="layout-topbar-logo" aria-label="PrimeReact logo">
                            <img src="/images/logo2.png" width={200} height={40} alt="logo"></img>
                        </a>
                    </Link>
                    <Link href="/" aria-label="PrimeReact logo">
                        <a className="layout-topbar-icon">
                            <svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_2642_813" className="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="35">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.68338 0.0430908H31.9051V34.0431H0.68338V0.0430908Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_2642_813)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M31.2729 13.0197L28.9408 17.0218L31.2682 21.0161C32.1174 22.4733 32.1174 24.2131 31.2683 25.6702C30.4192 27.1274 28.8984 27.9973 27.2002 27.9973H22.5453L20.3927 31.6915C19.5348 33.164 17.998 34.0431 16.2819 34.0431C14.5658 34.0431 13.029 33.164 12.1709 31.6915L10.0184 27.9973H5.35421C3.66835 27.9973 2.15858 27.1337 1.31562 25.6871C0.472664 24.2405 0.472664 22.5131 1.31562 21.0666L3.64767 17.0644L1.32019 13.0702C0.471109 11.613 0.471109 9.87311 1.32019 8.41596C2.16928 6.95878 3.69008 6.08884 5.38825 6.08884H10.0432L12.1958 2.39474C13.0537 0.922318 14.5907 0.0430908 16.3067 0.0430908C18.0228 0.0430908 19.5595 0.922227 20.4176 2.39474L22.5701 6.08884H27.2343C28.9202 6.08884 30.43 6.95252 31.2729 8.3991C32.1159 9.84573 32.1159 11.573 31.2729 13.0197ZM16.3067 1.06124C14.9622 1.0612 13.7581 1.74999 13.0858 2.90374L11.2299 6.08873H21.3835L19.5276 2.90374C18.8554 1.74999 17.6513 1.06124 16.3067 1.06124ZM22.4477 26.1286L22.3979 26.2141L22.3906 26.2266L22.2709 26.432L21.6348 27.5237L21.5253 27.7117L20.2034 29.9803L19.8048 30.6643L19.5241 31.146L19.5135 31.1484L19.5072 31.1592C18.835 32.313 17.6086 32.6453 16.2641 32.6453C14.9215 32.6453 13.7412 32.3149 13.0684 31.1641L13.0472 31.1588L12.3649 29.9878L12.1939 29.6945L4.83436 17.0644L6.16928 14.7736L6.16946 14.7744L8.52406 10.7356L8.52241 10.7353L8.78969 10.2767L8.79143 10.277L10.6394 7.10709L21.9773 7.10314L27.7542 17.0219L22.4477 26.1286ZM30.3783 25.1613C29.7149 26.2996 28.5268 26.9792 27.2002 26.9792H23.1386L28.3474 18.0401L30.3782 21.5253C31.0416 22.6636 31.0416 24.0229 30.3783 25.1613ZM2.20561 25.178C2.86282 26.3058 4.03984 26.9791 5.35421 26.9791H9.42501L4.24101 18.0826L2.20561 21.5756C1.54845 22.7035 1.54845 24.0502 2.20561 25.178ZM2.21024 12.5611C1.5469 11.4227 1.5469 10.0634 2.21024 8.92507C2.87353 7.78669 4.06159 7.10706 5.38826 7.10706H9.44987L4.24102 16.0462L2.21024 12.5611ZM27.2342 7.10706C28.5486 7.10706 29.7257 7.78039 30.3828 8.90826C31.04 10.036 31.04 11.3827 30.3828 12.5106L28.3474 16.0036L23.1634 7.10706H27.2342Z"
                                        fill="var(--primary-color)"
                                    />
                                </g>
                                <path d="M21.8341 18.6465L20.0833 18.2616L21.445 20.1862V26.1522L25.7586 22.3031L26.1137 15.7598L23.9739 16.5296L21.8341 18.6465Z" fill="var(--primary-color)" />
                                <path d="M10.9407 18.6465L12.6914 18.2616L11.3298 20.1862V26.1522L7.01621 22.3031L6.66113 15.7598L8.80091 16.5296L10.9407 18.6465Z" fill="var(--primary-color)" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.9133 20.5713L13.4695 18.2618L14.4421 18.8392H18.3327L19.3053 18.2618L20.8615 20.5713V29.2316L19.0428 32.6659H13.3769L11.9133 29.2316V20.5713Z"
                                    fill="var(--primary-color)"
                                />
                                <path d="M21.4451 29.8089L23.9739 27.3071V24.8052L21.4451 26.9221V29.8089Z" fill="var(--primary-color)" />
                                <path d="M11.3299 29.8089L8.80102 27.3071V24.8052L11.3299 26.9221V29.8089Z" fill="var(--primary-color)" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.9985 7.09967H13.8586L12.3024 10.7563L14.8313 18.0694H18.1382L20.4725 10.7563L18.9163 7.09967H16.7766V18.0694H15.9985V7.09967Z" fill="var(--primary-color)" />
                                <path d="M14.8314 18.0694L6.46675 14.9901L5.29959 10.1788L12.4971 10.7562L15.0259 18.0694H14.8314Z" fill="var(--primary-color)" />
                                <path d="M18.1383 18.0694L26.5029 14.9901L27.6701 10.1788L20.2781 10.7562L17.9438 18.0694H18.1383Z" fill="var(--primary-color)" />
                                <path d="M20.8617 10.1789L24.5916 9.794L22.2233 7.09967H19.5L20.8617 10.1789Z" fill="var(--primary-color)" />
                                <path d="M11.9134 10.1789L8.18341 9.794L10.5517 7.09967H13.2751L11.9134 10.1789Z" fill="var(--primary-color)" />
                            </svg>
                        </a>
                    </Link>
                </div>

                <ul className="flex list-none m-0 p-0 gap-2 align-items-center">
                    <li>
                        <DocSearch appId="SCRI13XXZO" apiKey="ea9e6c8a983c5646d6b9079921d4aed7" indexName="primereact" container="" debug={false} transformItems={handleDocSearchTransformItems} />
                    </li>
                    <li>
                        <a
                            href="https://github.com/primefaces/primereact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                        >
                            <i className="pi pi-github text-700"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://discord.gg/gzKFYnpmCY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                        >
                            <i className="pi pi-discord text-700"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/orgs/primefaces/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                        >
                            <i className="pi pi-comments text-700"></i>
                        </a>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                            onClick={toggleDarkMode}
                        >
                            <i className={classNames('pi text-700', { 'pi-moon': props.dark, 'pi-sun': !props.dark })}></i>
                        </button>
                    </li>
                    {props.showConfigurator && (
                        <li>
                            <button type="button" className="p-button flex-shrink-0 flex border-1 w-2rem h-2rem p-0 align-items-center justify-content-center transition-all transition-duration-300 min-w-0" onClick={onConfigButtonClick}>
                                <i className="pi pi-palette"></i>
                            </button>
                        </li>
                    )}

                    <li className="relative">
                        <StyleClass nodeRef={versionsRef} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                            <button
                                ref={versionsRef}
                                type="button"
                                style={{ maxWidth: '8rem' }}
                                className="px-link flex align-items-center surface-card h-2rem px-2 border-1 border-solid surface-border transition-all transition-duration-300 hover:border-primary"
                            >
                                <span className="text-900 block white-space-nowrap overflow-hidden">{versions && versions.length ? versions[0].version : ''}</span>
                                <span className="ml-2 pi pi-angle-down text-600"></span>
                            </button>
                        </StyleClass>
                        <div className="p-3 surface-overlay hidden absolute right-0 top-auto border-round shadow-2 origin-top w-8rem">
                            <ul className="list-none m-0 p-0">
                                {versions.map((version) => {
                                    return (
                                        <li role="none" key={version.version}>
                                            <a href={version.url} className="inline-flex p-2 border-round hover:surface-hover w-full">
                                                <span className="font-bold text-900">{version.name}</span>
                                                <span className="ml-2 text-700 white-space-nowrap block overflow-hidden text-overflow-ellipsis">({version.version})</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </li>
                    {props.showMenuButton && (
                        <li className="menu-button">
                            <button
                                type="button"
                                className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary menu-button"
                                onClick={onMenuButtonClick}
                                aria-haspopup
                                aria-label="Menu"
                            >
                                <i className="pi pi-bars text-700"></i>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
