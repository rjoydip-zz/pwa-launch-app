import styled from "styled-components";
import { pkg, log, getDeviceName } from "../utils";
import { isMobile } from "react-device-detect";

const AppDetectInstallContainerStyle = styled.div.attrs(({
    theme
}: any) => ({
    role: "alert",
    className: `p-2 bg-${theme.textName} items-center text-${theme.textName} leading-none rounded-full flex lg:inline-flex`,
}))``

const StatusStyle = styled.span.attrs(({
    theme
}: any) => ({
    className: `flex rounded-full bg-${theme.bgName} uppercase px-2 py-1 text-xs font-bold mr-3`
}))``

const TextStyle = styled.span.attrs(({
    theme
}) => ({
    className: `font-semibold mr-2 text-left flex-auto text-${theme.bgName}`
}))``

const NameHighlite = styled.span.attrs(({ }) => ({
    className: "text-indigo-300"
}))``

const AppOpenOrInstall = ({ status, appName, deviceName }: { status: string, appName: string, deviceName: string }) => <span>{status === "Install" ? "Please install " : "Open "}<NameHighlite>{appName}</NameHighlite> on your <NameHighlite>{deviceName}</NameHighlite> device</span>

const AppDetectInstall = ({ }) => {
    const status = "Install";
    let deferredPrompt: any;
    const appName = (pkg.app.name).toLowerCase();
    const deviceName = getDeviceName();
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
    });

    window.addEventListener('appinstalled', () => {
        // Log install to analytics
        console.log('INSTALL: Success');
    });

    const openApp = ({ appId, scheme }: { appId: string; scheme: string }) => {
        return appId && scheme
            ? `intent://scan/#Intent;scheme=${scheme};package=${appId};end`
            : null
    }

    const installPWA = () => {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: { outcome: string; }) => {
            if (choiceResult.outcome === 'accepted') {
                log('User accepted the install prompt');
            } else {
                log('User dismissed the install prompt');
            }
        });
    }

    const _onClick = () => {
        isMobile ? openApp({
            appId: pkg.app.pkgName,
            scheme: pkg.app.urlScheme
        }) : !!deferredPrompt ? installPWA() : null
    }

    return (
        <button onClick={_onClick}>
            <AppDetectInstallContainerStyle>
                <StatusStyle>{status}</StatusStyle>
                <TextStyle>
                    <AppOpenOrInstall status={status} appName={appName} deviceName={deviceName} />
                </TextStyle>
            </AppDetectInstallContainerStyle>
        </button>
    )
}

export default AppDetectInstall